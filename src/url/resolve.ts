import { originName } from "@/enviroment";
import { contentOrigin } from "@/enviroment/content";
import { distOrigin } from "@/enviroment/dist";
import Cup from "./Cup";
import { isHttpUrl } from "./test";
import { withOrigin, withPathname } from "./transform";


const URL_ORIGIN_REMAP_QUERY_KEY = "pfiersOriginRemap"

export function resolveCupUrl(url: URL | string) {
  if (typeof url === 'string') url = new URL(url)
  const p = url.protocol;
  if (p === Cup.CONTENT) {
    const corrected = withOrigin(
      withPathname(url, `/content/${url.pathname}`), contentOrigin
    )
    if (originName === 'prerender') {
      corrected.searchParams.append(URL_ORIGIN_REMAP_QUERY_KEY, "content")
    }
    return corrected
  } else if (p === Cup.DIST) {
    /* We cannot add a query param like with content because webpack
    just appends the chunk path to __webpack_public_path__, creating
    broken url's. This is a problem when serving index from a different
    origin than the bundle. */
    return withOrigin(url, distOrigin);
  } else if (isHttpUrl(url)) {
    return url
  }
  throw new Error(`Unknown cup url protocol "${p}" (url: "${url.href}")`);
}
