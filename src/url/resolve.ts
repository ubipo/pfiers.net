import { contentOrigin } from "@/enviroment/content";
import { distOrigin } from "@/enviroment/dist";
import Cup from "./Cup";
import { isHttpUrl } from "./test";
import { withOrigin, withPathname } from "./transform";


export function resolveCupUrl(url: URL) {
  const p = url.protocol;
  if (p === Cup.CONTENT) {
    return withOrigin(
      withPathname(url, `/content/${url.pathname}`), contentOrigin
    )
  } else if (p === Cup.DIST) {
    return withOrigin(url, distOrigin);
  } else if (isHttpUrl(url)) {
    return url
  }
  throw new Error(`Unknown cup url protocol "${p}" (url: "${url.href}")`);
}
