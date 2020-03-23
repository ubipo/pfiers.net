import { originName } from '.'
import { toUrl, isRelative, withOrigin } from '@/util/url'
import { OriginDefinition } from './util'

const distOrigins: OriginDefinition = {
  dev: document.location.origin,
  localProd: 'http://dist.local:8000',
  prod: 'https://pfiers.net',
  prerender: document.location.origin,
}

export const distOrigin = new URL(distOrigins[originName])

export function toDistUrl(url: URL | string) {
  if (typeof url === 'string') url = toUrl(url)
  if (!isRelative(url)) return url
  return withOrigin(url, distOrigin)
}
