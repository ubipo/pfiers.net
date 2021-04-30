import { resolveCupUrl } from "@/url/resolve"


// eslint-disable-next-line @typescript-eslint/camelcase
declare var __webpack_public_path__: string

export function setWebpackPublicPath(path: URL) {
  // eslint-disable-next-line @typescript-eslint/camelcase
  __webpack_public_path__ = resolveCupUrl(path).href
}
