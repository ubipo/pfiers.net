import { browser } from "$app/environment"
import type { marked } from "marked"
import type { getImageMetaOnServer } from "./imageMetaOnServer"
import { isObject } from "./parseUtil"


export interface ImageMeta {
  width: number
  height: number
  format: string
}

// Base64 encoded webp placeholder image
export type ImagePlaceholder = string

export interface ContentImageToken extends marked.Tokens.Image {
  meta?: ImageMeta,
  placeholder?: ImagePlaceholder
}

export function isImageWithMetaToken(token: marked.Token): token is ContentImageToken {
  if (token.type !== 'image') return false
  const contentImageToken = token as ContentImageToken
  return isObject(contentImageToken.meta) && typeof contentImageToken.placeholder === "string"
}

let getImageMetaOnServerFn: typeof getImageMetaOnServer | undefined = undefined

export async function getImageMeta(contentPath: string) {
  if (browser) return { meta: undefined, placeholder: undefined }

  const fn = getImageMetaOnServerFn == undefined
    ? await import('./imageMetaOnServer').then(m => m.getImageMetaOnServer)
    : getImageMetaOnServerFn
  return fn(contentPath)
}
