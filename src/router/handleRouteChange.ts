import { Route } from 'vue-router'
import {
  getDataVal,
  nearestWithData,
  getParentChain,
  setDocDescription,
  getJsondLdBreadcrumbs,
  setDocJsonLd,
  setDocCanonicalUrl,
  setDocRobots
} from './util'

export default function handleRouteChange(route: Route, titlePostfix: string) {
  const parentChain = getParentChain(route)
  for (const parent of parentChain) {
    if (typeof parent.meta.beforeDataAccess === 'function')
      parent.meta.beforeDataAccess(route)
  }

  const nearestWithTitle = nearestWithData(route, parentChain, 'title')
  if (nearestWithTitle == undefined)
    throw new Error('There must be a route with a title as per CustomRouteConfig')
  const title = getDataVal(nearestWithTitle.meta.data.title, route)
  let pageTitle = title
  if (!route.meta.data?.noTitlePostfix)
    pageTitle = title ? `${title} - ${titlePostfix}` : titlePostfix
  document.title = pageTitle

  const nearestWithDescription = nearestWithData(route, parentChain, 'description')
  if (nearestWithDescription == undefined)
    throw new Error('There must be a route with a description as per CustomRouteConfig')
  const description = getDataVal(nearestWithDescription.meta.data.description, route)
  setDocDescription(description, document)

  const canonicalUrl = getDataVal(route.meta.data.canonicalUrl, route)
  setDocCanonicalUrl(canonicalUrl, document)

  const doNotIndex = getDataVal(route.meta.data.doNotIndex, route)
  const robots = doNotIndex ? 'noindex' : 'index, follow'
  setDocRobots(robots, document)

  const jsonLd = getJsondLdBreadcrumbs(
    parentChain,
    route,
    new URL(document.location.href)
  )
  setDocJsonLd(jsonLd, document)
}
