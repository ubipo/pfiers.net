import { browser } from "$app/environment"
import type { marked } from "marked"
import type { SrcSetImageToken } from "../markdown"
import type { SrcsetItem, SrcsetItemSize } from "../srcSet"
import type { getImageMetaOnServer } from "./imageMetaOnServer"
import { isObject } from "./parseUtil"


export interface ImageMeta {
  width: number
  height: number
  format: string
  placeholder: string
  srcset?: SrcsetItem[]
}

// Base64 encoded webp placeholder image
export type ImagePlaceholder = string

export interface ContentImageToken extends marked.Tokens.Image {
  meta?: ImageMeta,
}

export interface ContentSrcSetImageToken extends SrcSetImageToken {
  meta?: ImageMeta,
}

export function isImageWithMetaToken(token: marked.Token): token is ContentImageToken {
  if (token.type !== 'image') return false
  const contentImageToken = token as ContentImageToken
  return isObject(contentImageToken.meta)
}

let getImageMetaOnServerFn: typeof getImageMetaOnServer | undefined = undefined

export async function getImageUrlMeta(
  url: URL,
  sizes: SrcsetItemSize[] = [],
): Promise<{ meta: ImageMeta | undefined, url: string }> {
  if (url.protocol === 'c:') {
    const meta = await getImageMeta(url.pathname, sizes)
    if (meta == null) throw new Error(`Could not fetch image metadata for ${url}`)
    return { meta, url: `/content/${url.pathname}` }
  }
  return { meta: undefined, url: url.toString() }
}

export async function getImageMeta(
  contentPath: string,
  sizes: SrcsetItemSize[] = [],
) {
  if (browser) return undefined

  const fn = getImageMetaOnServerFn == undefined
    ? await import('./imageMetaOnServer').then(m => m.getImageMetaOnServer)
    : getImageMetaOnServerFn
  return fn(contentPath)
}
