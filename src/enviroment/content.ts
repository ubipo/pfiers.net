import { withHostname } from '@/url/transform'
import { originName } from '.'
import { OriginDefinition } from './util'


const contentLocalOrigin = withHostname(new URL(document.location.href), "content.local").origin
const contentOrigins: OriginDefinition = {
  dev: document.location.origin,
  localProd: contentLocalOrigin,
  prod: 'https://pfiers.net',
  prerender: document.location.origin, // To be replaced with prod origin in postprocess (using URL_ORIGIN_REMAP_QUERY_KEY)
}

export const contentOrigin = contentOrigins[originName]
