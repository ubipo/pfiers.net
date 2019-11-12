import { checkForOverride, isLocalDocument } from './util'
import { distOrigins, contentOrigins } from './origins'
import { withOrigin, isRelative, toUrl } from '../url'

declare const BUILD_INFO: {
  version: string
  mode: string
}

export const version = BUILD_INFO.version
export const devMode = BUILD_INFO.mode === 'development'
export const strictMode = checkForOverride('strict-mode', devMode)

const isLocal = isLocalDocument()
const originName = devMode ? 'dev' : isLocal ? 'localProd' : 'prod'
export const distOrigin = new URL(distOrigins[originName])
export const contentOrigin = new URL(contentOrigins[originName])

export function toDistUrl(url: URL | string) {
  if (typeof url === 'string') url = toUrl(url)
  if (!isRelative(url)) return url
  return withOrigin(url, distOrigin)
}

export function toContentUrl(url: URL | string) {
  if (typeof url === 'string') url = toUrl(url)
  if (!isRelative(url)) return url
  url = withOrigin(url, contentOrigin)
  // Check for @ path indicating an asset (instead of relative link)
  if (url.pathname.startsWith('@', 1))
    // pathname starts with '/'
    url.pathname = `/content/${url.pathname.slice(2)}`
  return url
}

export function infoString() {
  let info = `pieterfiers.net@${version}`
  info += ` ${originName}`
  if (strictMode) info += ' strict'
  return info
}

// eslint-disable-next-line @typescript-eslint/camelcase
declare var __webpack_public_path__: string

export function setWebpackPublicPath(path: URL) {
  // eslint-disable-next-line @typescript-eslint/camelcase
  __webpack_public_path__ = path.href
}
