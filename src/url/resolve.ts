import { contentBaseUrl } from "@/enviroment/baseUrls";
import { toUrl } from ".";
import Cup from "./Cup";
import { isHttpUrl } from "./test";
import { withBase, withPathname } from "./transform";


export function resolveCupUrl(url: URL | string) {
  if (typeof url === 'string') url = new URL(url)
  const p = url.protocol
  if (p === Cup.CONTENT) {
    const corrected = withBase(withPathname(url, `/content/${url.pathname}`), contentBaseUrl, true)
    return corrected
  } else if (isHttpUrl(url)) {
    return url
  }
  throw new Error(`Unknown cup url protocol "${p}" (url: "${url.href}")`)
}
