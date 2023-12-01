import { joinPath } from "./url"


/** Relative to site home page URL (e.g. `/static/` for `/` or
 * `/my-site/resources` for `/my-site/`) */
export const STATIC_DIR_SITE_RELATIVE_URL = '/'

export const CONTENT_DIR_SITE_RELATIVE_URL = joinPath(
  STATIC_DIR_SITE_RELATIVE_URL,
  'content/'
)
