import Cup from "./Cup"


export function toUrl(
  urlStr: string, cupProtocol: Cup = Cup.RELATIVE
) {
  return new URL(urlStr, `${cupProtocol}/`)
}

export function clone(url: URL | string) {
  const href = typeof url === 'string' ? url : url.href
  return toUrl(href)
}
