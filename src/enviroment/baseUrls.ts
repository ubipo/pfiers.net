import { originName } from '.'
import { withHostname } from '@/url/transform'
import { EnvBaseUrls } from './envName'


const contentHostname = 'content.local'
const contentLocalOrigin = withHostname(new URL(document.location.href), contentHostname).origin
const contentOrigins: EnvBaseUrls = {
  dev: document.location.origin,
  localProd: contentLocalOrigin,
  prod: 'https://pfiers.net',
  prerender: `http://${contentHostname}:8080`,
}

export const contentBaseUrl = new URL(contentOrigins[originName])

export const distBaseUrl = new URL(window.__pfiers_dist_base_url)
