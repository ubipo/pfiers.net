import Cup from "./Cup"
import { trim, trimStart } from "lodash"

export function toUrl(
  urlStr: string, cupProtocol: Cup = Cup.RELATIVE
) {
  return new URL(urlStr, `${cupProtocol}/`)
}

export function clone(url: URL | string) {
  const href = typeof url === 'string' ? url : url.href
  return toUrl(href)
}

export function joinPaths(...parts: string[]) {
  return '/' + parts.map(p => trim(p, '/')).filter(p => p !== '').join('/')
}
