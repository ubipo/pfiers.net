import { toUrl } from "@/url"
import { elvis, isObject } from "@/util"
import { Technology } from "../types"
import DeserializationException from "./deserializationException"
import { deserializeMarkdownDefinition, serializeMarkdownDefinition } from "./markdownDefinition"
import { addIffNotNull, asOptionalProcessedValue, makeNullOrFun, makeUrlSafe, mustBeExGen, mustBeStringOrNotDefinedExGen, stringOrThrow, urlOrNullGen } from "./util"


export function deserializeTechnology(sTechnology: any, existingTechnologies: Technology[], populateCache: boolean = false): Technology {
  const mustBeEx = mustBeExGen('Technology')
  const mustBeStringOrNotDefinedEx = mustBeStringOrNotDefinedExGen('Technology')

  if (!isObject(sTechnology)) {
    throw new DeserializationException("Technology must be an object")
  }

  const {
    name, sDescription, urlSafeName: sUrlSafeName, short: sShort, long: sLong,
    iconName: sIconName, wikiArticleName: sWikiArticleName, siteUrl: sSiteUrl
  } = sTechnology as any

  if (typeof name !== "string") throw mustBeEx("name", "a string")
    
  if (existingTechnologies.some(technology => technology.name === name)) {
    throw new DeserializationException(
      `A technology with the name "${name}" already exists`
    )
  }

  const description = makeNullOrFun(
    sDescription,
    v => stringOrThrow(v, mustBeStringOrNotDefinedEx('description'))
  )
  const urlSafeName = asOptionalProcessedValue(
    sUrlSafeName,
    v => stringOrThrow(v, mustBeStringOrNotDefinedEx('urlSafeName')),
    () => makeUrlSafe(name)
  )
  const iconName = asOptionalProcessedValue(
    sIconName,
    v => stringOrThrow(v, mustBeStringOrNotDefinedEx('iconName')),
    () => urlSafeName.value
  )
  const wikiArticleName = elvis(
    sWikiArticleName,
    wikiNameNn => asOptionalProcessedValue(
      wikiNameNn,
      v => stringOrThrow(v, mustBeEx(
        "wikiArticleName", "either a string, null, or not defined"
      )),
      () => name
    )
  )

  let short;
  try {
    short = makeNullOrFun(sShort, v => deserializeMarkdownDefinition(v, populateCache))
  } catch (error) {
    throw new DeserializationException(`deserializing property "short": ${error.message}`)
  }
  let long;
  try {
    long = makeNullOrFun(sLong, v => deserializeMarkdownDefinition(v, populateCache))
  } catch (error) {
    throw new DeserializationException(`deserializing property "long": ${error.message}`)
  }

  const urlOrNull = urlOrNullGen('Technology')
  const siteUrl = urlOrNull(sSiteUrl, 'siteUrl')

  return {
    name, description, urlSafeName, short, long, iconName,
    wikiArticleName: wikiArticleName, projects: [], siteUrl
  }
}

export function serializeTechnology(technology: Technology, populateCache: boolean = false) {
  const {
    name, description, urlSafeName, iconName,
    wikiArticleName, short, long, siteUrl
  } = technology
  const s = { name }
  addIffNotNull("description", description, s)
  addIffNotNull("iconName", iconName.orig, s)
  addIffNotNull("urlSafeName", urlSafeName.orig, s)
  addIffNotNull("wikiArticleName", wikiArticleName, s, v => v.orig)
  addIffNotNull("short", short, s, v => serializeMarkdownDefinition(v, populateCache))
  addIffNotNull("long", long, s, v => serializeMarkdownDefinition(v, populateCache))
  addIffNotNull("siteUrl", siteUrl, s)
  return s
}
