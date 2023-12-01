import type { marked } from "marked"
import type { SrcSetImageToken } from "./markdown"
import type { SrcsetItem } from "../srcSet"
import type { getImageMetaOnServer } from "./imageMetaOnServer"
import { isObject } from "../content/parseUtil"
import { isUri, resolveHrefForSource } from "../url"
import { browser } from "$app/environment"
import { OUTSIDE_STATIC_DIR } from "./types"


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

export async function getImageHrefMeta(
  sourceDirRelativePath: string,
  href: string,
): Promise<{ meta: ImageMeta | undefined, href: string }> {
  if (isUri(href)) {
    return { meta: undefined, href }
  }
  if (browser) {
    return { meta: undefined, href }
  }
  href = resolveHrefForSource(sourceDirRelativePath, href)
  const fn = getImageMetaOnServerFn == undefined
    ? await import('./imageMetaOnServer').then(m => m.getImageMetaOnServer)
    : getImageMetaOnServerFn
  getImageMetaOnServerFn = fn
  const metaAndPath = await getImageMetaOnServerFn(href)
  if (metaAndPath == OUTSIDE_STATIC_DIR) {
    return { meta: undefined, href }
  }
  const { meta } = metaAndPath
  return { meta, href }
}
