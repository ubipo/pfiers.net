export function isHttpUrl(url: URL) {
  return ['http:', 'https:'].includes(url.protocol)
}

const REL_PROTOCOL = 'relative:'
export function toUrl(urlStr: string) {
  return new URL(urlStr, `${REL_PROTOCOL}/`)
}

export function isRelative(url: URL) {
  return url.protocol === REL_PROTOCOL
}

function clone(url: URL) {
  return new URL(url.href)
}

export function withOrigin(url: URL, originUrl: URL) {
  let transformed = clone(originUrl)
  transformed.pathname = url.pathname
  transformed.search = url.search
  transformed.hash = url.hash
  return transformed
}
