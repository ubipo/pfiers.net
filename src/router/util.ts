import { RouteLocationNormalized, RouteRecordNormalized, RouteRecordRaw } from "vue-router"
import { SiteRouteMeta, SiteRouteMetaData } from "."

export function getParentChain(route: RouteLocationNormalized) {
  let routeToWalk = route.matched[route.matched.length - 1] as RouteRecordRaw
  const parentChain: RouteRecordRaw[] = []
  while (routeToWalk != undefined) {
    parentChain.push(routeToWalk)
    const meta = routeToWalk.meta
    if (meta === undefined)
      throw Error(`Meta undefined for routeRecord: ${routeToWalk.path}`)
    routeToWalk = meta["base"] as RouteRecordRaw
  }
  return parentChain
}

// The terms "parent" and "child" already have a different meaning in vue-router
export function asSubRoutes(
  baseRecord: RouteRecordRaw,
  subrouteRecords: RouteRecordRaw[]
): RouteRecordRaw[] {
  subrouteRecords.forEach(r => {
    r.path = baseRecord.path + r.path
    const meta = r.meta || {}
    if (meta["base"] === undefined)
      meta["base"] = baseRecord
  })
  return [baseRecord, ...subrouteRecords]
}

export function getJsondLdBreadcrumbs(
  metadataChain: SiteRouteMetaData[],
  defaultUrl: URL
) {
  const breadCrumbItems = Array.from(metadataChain)
    .reverse()
    .map((pageMetadata, i) => {
      const url = pageMetadata.canonicalUrl || defaultUrl
      const title = pageMetadata.title
      return {
        '@type': 'ListItem',
        position: i + 1,
        name: title,
        item: url
      }
    })
  const jsonLdObj = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadCrumbItems
  }
  return JSON.stringify(jsonLdObj)
}

export function setDocDescription(description: string, doc: Document) {
  let eDescription = doc.querySelector('meta[name="description"]')
  if (eDescription == null) {
    eDescription = doc.createElement('meta')
    eDescription.setAttribute('name', 'description')
    document.head.append(eDescription)
  }
  eDescription.setAttribute('content', description)
}

export function setDocJsonLd(jsonLd: string, doc: Document) {
  let eJsonLd = doc.querySelector('script[type="application/ld+json"]')
  if (eJsonLd == null) {
    eJsonLd = doc.createElement('script')
    eJsonLd.setAttribute('type', 'application/ld+json')
    document.head.append(eJsonLd)
  }
  eJsonLd.innerHTML = jsonLd
}

export function setDocCanonicalUrl(canonicalUrl: URL, doc: Document) {
  let eCanonicalUrl = doc.querySelector('link[rel="canonical"]')
  if (canonicalUrl == undefined) {
    if (eCanonicalUrl != undefined) eCanonicalUrl.remove()
  } else {
    if (eCanonicalUrl == undefined) {
      eCanonicalUrl = doc.createElement('link')
      eCanonicalUrl.setAttribute('rel', 'canonical')
      document.head.append(eCanonicalUrl)
    }
    eCanonicalUrl.setAttribute('href', canonicalUrl.href)
  }
}

export function setDocRobots(robots: string, doc: Document) {
  let eRobots = doc.querySelector('meta[name="robots"]')
  if (eRobots == null) {
    eRobots = doc.createElement('meta')
    eRobots.setAttribute('name', 'robots')
    document.head.append(eRobots)
  }
  eRobots.setAttribute('content', robots)
}
