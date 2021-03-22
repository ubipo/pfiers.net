import { withHostname } from '@/url/transform'
import { originName } from '.'
import { OriginDefinition } from './util'


const distLocalOrigin = withHostname(new URL(document.location.href), "dist.local").origin
const distOrigins: OriginDefinition = {
  dev: document.location.origin,
  localProd: distLocalOrigin,
  prod: 'https://pfiers.net',
  prerender: document.location.origin, // To be replaced with prod origin in postprocess (using URL_ORIGIN_REMAP_QUERY_KEY)
}

export const distOrigin = distOrigins[originName]
