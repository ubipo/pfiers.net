import { Content } from "@/content/types"
import { RouteLocationNormalized } from "vue-router"
import { SiteRouteMeta } from "."
import { getJsondLdBreadcrumbs, getParentChain as getBaseChain, setDocCanonicalUrl, setDocDescription, setDocJsonLd, setDocRobots } from "./util"


export default function setPageMetadata(
  route: RouteLocationNormalized, titlePostfix: string, content?: Content
  ) {
  const baseChain = getBaseChain(route)
  const dataChain = baseChain.map(
    record => (record.meta as SiteRouteMeta).data(route, content)
  )
  const mostSpecificData = dataChain[0]
 
  let pageTitle = mostSpecificData.title
  if (!mostSpecificData.noTitlePostfix) {
    pageTitle = mostSpecificData.title ? `${mostSpecificData.title} - ${titlePostfix}` : titlePostfix
  }
  document.title = pageTitle

  setDocDescription(mostSpecificData.description, document)
  setDocCanonicalUrl(mostSpecificData.canonicalUrl, document)
  const robots = mostSpecificData.doNotIndex ? 'noindex' : 'index, follow'
  setDocRobots(robots, document)

  const jsonLd = getJsondLdBreadcrumbs(
    dataChain,
    new URL(document.location.href)
  )
  setDocJsonLd(jsonLd, document)
}
