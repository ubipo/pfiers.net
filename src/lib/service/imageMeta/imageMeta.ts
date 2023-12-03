import type { getImageMetaOnServer } from "./imageMetaOnServer"
import type { FetchFn } from "../fetchFn"
import { Exception } from "../exception"
import { intOrThrow, isObject, optionalStringOrThrow, stringOrThrow } from "../parseUtil"
import { OUTSIDE_STATIC_DIR, type ImageMeta } from "./types"


let getImageMetaOnServerFn: typeof getImageMetaOnServer | undefined = undefined

function imageMetaFromJson(json: string): ImageMeta {
  const metaS = JSON.parse(json)
  if (!isObject(metaS)) throw new Exception(`ImageMeta: Expected object, got ${metaS}`)
  const width = intOrThrow(metaS.width, "imageMeta.width")
  const height = intOrThrow(metaS.height, "imageMeta.height")
  const format = stringOrThrow(metaS.format, "imageMeta.format")
  const placeholder = stringOrThrow(metaS.placeholder, "imageMeta.placeholder")
  const srcset = metaS.srcset == null
    ? undefined
    : (() => {
      if (!Array.isArray(metaS.srcset)) throw new Exception(`Expected array, got ${metaS.srcset}`)
      return metaS.srcset.map((item: unknown) => {
        if (!isObject(item)) throw new Exception(`SrcsetItem: Expected object, got ${item}`)
        const href = stringOrThrow(item.href, "srcsetItem.href")
        const mediaQuery = optionalStringOrThrow(item.mediaQuery, "srcsetItem.mediaQuery")
        const size = intOrThrow(item.size, "srcsetItem.size")
        return { href, mediaQuery, size }
      })
    })()
  return { width, height, format, placeholder, srcset }
}

export async function getImageHrefMetaFromApi(
  fetchFn: FetchFn,
  href: string,
): Promise<ImageMeta> {
  const encodedHref = encodeURIComponent(href)
  const url = `/api/image-meta/${encodedHref}`
  const contentRes = await fetchFn(url)
  if (!contentRes.ok) throw new Exception(`Failed to load image meta from API: ${contentRes.status} ${contentRes.statusText}`)
  const contentJson = await contentRes.text()
  return imageMetaFromJson(contentJson)
}

export async function getImageHrefMetaOnServer(
  href: string,
): Promise<ImageMeta> {
  const fn = getImageMetaOnServerFn == undefined
    ? await import('./imageMetaOnServer').then(m => m.getImageMetaOnServer)
    : getImageMetaOnServerFn
  getImageMetaOnServerFn = fn
  const metaAndPath = await fn(href)
  if (metaAndPath == OUTSIDE_STATIC_DIR) {
    throw new Exception(`Image path outside static dir: ${href}`)
  }
  const { meta } = metaAndPath
  return meta
}