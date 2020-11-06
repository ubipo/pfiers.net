import { withHostname } from '@/url/transform'
import { originName } from '.'
import { OriginDefinition } from './util'


const contentLocalOrigin = withHostname(new URL(document.location.href), "dist.local").origin
const distOrigins: OriginDefinition = {
  dev: document.location.origin,
  localProd: contentLocalOrigin,
  prod: 'https://pfiers.net',
  prerender: contentLocalOrigin, // To be replaced with prod origin in postprocess
}

export const distOrigin = distOrigins[originName]

// export function toDistUrl(url: URL | string) {
//   if (typeof url === 'string') url = toUrl(url)
//   if (!isRelative(url)) return url
//   return tagUrl(withOrigin(url, distOrigin), true)
// }
