import { toUrl, isRelative, withOrigin } from '@/url'
import { originName, version } from '.'
import { strictMode } from './runtime'

const contentOrigins = {
  dev: document.location.origin,
  localProd: 'http://content.local:8000',
  prod: 'https://vc.pieterfiers.net'
}

export const contentOrigin = new URL(contentOrigins[originName])

export function toContentUrl(url: URL | string) {
  if (typeof url === 'string') url = toUrl(url)
  if (!isRelative(url)) return url
  url = withOrigin(url, contentOrigin)
  // Check for @ path indicating an asset (instead of relative link)
  if (url.pathname.startsWith('@', 1))
    // pathname starts with '/'
    url.pathname = `/content/${url.pathname.slice(2)}`
  return url
}

export function infoString() {
  let info = `pieterfiers.net@${version}`
  info += ` ${originName}`
  if (strictMode) info += ' strict'
  return info
}
