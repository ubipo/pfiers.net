import { SiteData } from './types'
import deserialize from './deserialize'
import { toContentUrl } from '@/enviroment'
import { toUrl } from '@/url'

const siteDataUrl = toContentUrl(toUrl('@/site-data.json'))
export default function load(): Promise<SiteData> {
  const req = new Request(siteDataUrl.href)
  return new Promise((resolve, reject) => {
    fetch(req).then(res => {
      if (!res.ok) throw new Error(`HTTP error fetching site data: ${res.statusText}`)
      res.json().then(serializedSiteData => {
        deserialize(serializedSiteData).then(resolve, reject)
      })
    }, reject)
  })
}
