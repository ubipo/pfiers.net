import { SiteData } from './types'
import deserialize from './deserialize'
import staticHostFetch from '../fetch'

export default function load(): Promise<SiteData> {
  const filename = 'site-data.json'
  const req = new Request(`/content/${filename}`)
  return new Promise((resolve, reject) => {
    staticHostFetch(req).then(res => {
      if (!res.ok) throw new Error(`HTTP error fetching ${filename}: ${res.statusText}`)
      res.json().then(serializedSiteData => {
        deserialize(serializedSiteData).then(resolve, reject)
      })
    }, reject)
  })
}
