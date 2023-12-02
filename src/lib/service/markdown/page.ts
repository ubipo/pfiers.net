import type { marked } from "marked";
import type { FetchFn } from "../fetchFn";
import { processTokens, type TokenProcessors } from "./tokenProcessing";
import { resolveHrefForRoute } from "../url";
import type { ImageMeta } from "./types";
import { getImageHrefMeta } from "./imageMeta";


export interface LinkPageSpecificData {
  pageRelativeHref: string
}

export interface ImagePageSpecificData {
  pageRelativeHref: string
  meta: ImageMeta
}

export interface PageSpecificTokenData {
  link?: Record<string, LinkPageSpecificData>
  image?: Record<string, ImagePageSpecificData>
}

/**
 * Some tokens require data that is either/both page-specific and/or requires
 * the loading of extra data. This function generates a map from the token
 * type to a map of that token type's primary key to the page specific data
 * for a specific token (i.e. instance of a token type).
 * This doesn't modify the tokens, so that they can be reused for other pages.
 * 
 * - For `link` tokens, the primary key is the `href` attribute. The page-specific
 * data is the href resolved relative to the page.
 * - For `image` tokens, the primary key is the `href` attribute. The page-specific
 * data is again the resolved href, but also an ImageMeta object, which stores
 * the image's width, height, format, placeholder, and srcset.
 */
export async function generatePageSpecificTokenData(
  routeId: string,
  fetchFn: FetchFn,
  tokens: marked.TokensList,
) {
  const tokenData: PageSpecificTokenData = { }
  if (routeId === "/") {
    console.log("routeId is /")
    console.log("tokens:", tokens.slice(-1)[0].tokens)
  }
  const processors: TokenProcessors = {
    image: async token => {
      if (routeId === "/") console.log("image token:", token)
      const rootRelativeHref = token.href
      const pageRelativeHref = resolveHrefForRoute(routeId, rootRelativeHref)
      const meta = await getImageHrefMeta(fetchFn, rootRelativeHref)
      tokenData.image = tokenData.image || { }
      tokenData.image[rootRelativeHref] = { pageRelativeHref, meta }
    },
    link: async token => {
      const rootRelativeHref = token.href
      const pageRelativeHref = resolveHrefForRoute(routeId, rootRelativeHref)
      tokenData.link = tokenData.link || { }
      tokenData.link[rootRelativeHref] = { pageRelativeHref }
    }
  }
  await processTokens(tokens, processors)
  return tokenData
}
