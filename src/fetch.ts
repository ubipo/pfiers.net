import { resolveCupUrl } from "./url/resolve";


function transformedRequestInfo(input: RequestInfo | URL, transform: (url: URL) => URL): Request {
  const req = input instanceof Request ? input : new Request(input.toString())

  const {
    cache, credentials, headers, integrity, method,
    mode, redirect, referrer, referrerPolicy, url, body
  } = req;

  const modifiedUrl = transform(new URL(url))

  return new Request(modifiedUrl.toString(), {
    cache, credentials, headers, integrity, method,
    mode, redirect, referrer, referrerPolicy, body
  })
}

export async function fetchCup(input: RequestInfo | URL, init?: RequestInit) {
  const transInfo = transformedRequestInfo(input, resolveCupUrl)
  return fetch(transInfo, init)
}
