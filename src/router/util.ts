import { Route } from 'vue-router'
import {
  CustomRootRouteConfig,
  CustomRouteConfig,
  RouteData,
  DynamicMetaProp
} from './types'

export function getDataVal<T>(data: DynamicMetaProp<T>, route: Route): T {
  return data instanceof Function ? data(route) : data
}

export function getParentChain(route: Route) {
  let routeToWalk = route.matched[route.matched.length - 1] as (
    | CustomRouteConfig
    | undefined)
  const parentChain: CustomRouteConfig[] = []
  while (routeToWalk != undefined) {
    parentChain.push(routeToWalk)
    routeToWalk = routeToWalk.meta.parent
  }
  return parentChain
}

export function asSubroute(
  path: string,
  root: CustomRootRouteConfig,
  subroutes: CustomRouteConfig[]
): CustomRouteConfig[] {
  const modRoot = Object.assign<{}, CustomRouteConfig>({}, root)
  modRoot.path = path
  const modSubroutes = subroutes.map(subroute => {
    const modSubroute = Object.assign({}, subroute)
    modSubroute.path = path + subroute.path
    if (modSubroute.meta.parent == undefined) modSubroute.meta.parent = modRoot
    return modSubroute
  })
  return [modRoot, ...modSubroutes]
}

export function nearestWithData(
  route: Route,
  parentChain: CustomRouteConfig[],
  key: keyof RouteData
) {
  const nearestByChildComponent = route.matched
    .slice()
    .reverse()
    .find(p => p.meta && p.meta.data && getDataVal(p.meta.data[key], route) != undefined)
  if (nearestByChildComponent != undefined) return nearestByChildComponent
  const nearestByPath = parentChain.find(
    p => getDataVal<any>(p.meta.data[key], route) != undefined
  )
  return nearestByPath
}

export function getJsondLdBreadcrumbs(
  parentChain: CustomRouteConfig[],
  route: Route,
  defaultUrl: URL
) {
  const breadCrumbItems = parentChain
    .slice()
    .reverse()
    .map((parent, i) => {
      const url = getDataVal(parent.meta.data.canonicalUrl || defaultUrl, route)
      const title = getDataVal(parent.meta.data.title, route)
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
  if (eCanonicalUrl == null) {
    eCanonicalUrl = doc.createElement('link')
    eCanonicalUrl.setAttribute('rel', 'canonical')
    document.head.append(eCanonicalUrl)
  }
  eCanonicalUrl.setAttribute('href', canonicalUrl.href)
}
