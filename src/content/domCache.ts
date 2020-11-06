import { Content } from "./types";
import { escape, unescape } from "./escape";
import { deserializeContent, serializeContent } from "./deserialize";


const ELEM_ID = "__content-dom-cache"

export function getFromDomCache() {
  const cacheElem = getDomCacheElem()
  if (cacheElem === null) return null
  const domStr = cacheElem.textContent
  if (domStr === null) throw Error("Empty dom cache")
  const json = unescape(domStr)
  const SContent = JSON.parse(json)
  const content = deserializeContent(SContent, [], [], true)
  return content
}

export function setToDomCache(content: Content) {
  const cacheElem = getDomCacheElem() || createDomCacheElem()
  const sContent = serializeContent(content, true)
  const json = JSON.stringify(sContent)
  const domStr = escape(json)
  cacheElem.textContent = domStr
}

function createDomCacheElem() {
  const cacheElem = document.createElement('script')
  cacheElem.type = 'application/json'
  cacheElem.id = ELEM_ID
  document.head.appendChild(cacheElem)
  return cacheElem
}

function getDomCacheElem() {
  return document.getElementById(ELEM_ID)
}
