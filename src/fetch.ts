import { toStaticHostUrl } from './runtime-info/envInfo'

export default function staticHostFetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  if (typeof input === 'string') {
    input = toStaticHostUrl(input).href
  } else {
    input = new Request(toStaticHostUrl(input.url).href, input)
  }
  return fetch(input, init)
}
