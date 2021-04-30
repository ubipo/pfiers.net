import { toUrl } from "./url"
import { resolveCupUrl } from "./url/resolve"
import { withExtension } from "./url/transform"

const mimeTypes: Record<string, string> = {
  webp: 'image/webp'
}

export function responsiveImageData(url: URL | string) {
  const pUrl = toUrl(url)
  const alternativeFormats = pUrl.searchParams.getAll("altFormat")
  return {
    sources: alternativeFormats.map(format => ({
      mimeType: mimeTypes[format],
      srcSet: resolveCupUrl(withExtension(pUrl, format))
    })),
    src: resolveCupUrl(url)
  }
}
