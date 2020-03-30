import { tagUrl } from "@/store/site-data/types"

export function isHttpUrl(url: URL) {
  return ['http:', 'https:'].includes(url.protocol)
}

const REL_PROTOCOL = 'relative:'
export function toUrl(urlStr: string) {
  return tagUrl(new URL(urlStr, `${REL_PROTOCOL}/`))
}

export function isRelative(url: URL) {
  return url.protocol === REL_PROTOCOL
}

export function clone(url: URL | string) {
  const href = typeof url === "string" ? url : url.href
  return tagUrl(new URL(href))
}

export function withOrigin(url: URL, origin: string) {
  let transformed = clone(origin)
  transformed.pathname = url.pathname
  transformed.search = url.search
  transformed.hash = url.hash
  return transformed
}

export function withHostname(url: URL, hostname: string) {
  let transformed = clone(url)
  transformed.hostname = hostname
  return transformed
}
