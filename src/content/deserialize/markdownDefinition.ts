import { toUrl } from "@/url"
import { isObject } from "@/util"
import { MarkdownDefinition } from "../types"
import DeserializationException from "./deserializationException"
import { addIffNotNull, makeNullOrFun, mustBeExGen, mustBeStringOrNotDefinedExGen, stringOrThrow } from "./util"


export function deserializeMarkdownDefinition(sMarkdownDefinition: any, populateCache: boolean = false): MarkdownDefinition {
  const mustBeStringOrNotDefinedEx = mustBeStringOrNotDefinedExGen('MarkdownDefinition')

  if (!isObject(sMarkdownDefinition)) {
    throw new DeserializationException("MarkdownDefinition must be an object")
  }

  const { url: sUrl, text: sText, cachedText: sCachedText } = sMarkdownDefinition as any

  const url = makeNullOrFun(
    sUrl,
    v => stringOrThrow(v, mustBeStringOrNotDefinedEx('url'))
  )
  const text = makeNullOrFun(
    sText,
    v => stringOrThrow(v, mustBeStringOrNotDefinedEx('text'))
  )
  const cachedText = populateCache ? makeNullOrFun(
    sCachedText,
    v => stringOrThrow(v, mustBeStringOrNotDefinedEx('text'))
  ) : null

  if ((url !== null) === (text !== null)) {
    throw new DeserializationException(
      "MarkdownDefinition must have only one of the \"url\" or \"text\" properties defined"
    )
  }

  return {
    text,
    url: url === null ? null : toUrl(url),
    cachedText
  }
}

export function serializeMarkdownDefinition(markdownDefinition: MarkdownDefinition, populateCache: boolean = false) {
  const { text, url, cachedText } = markdownDefinition
  const s = {}
  addIffNotNull("text", text, s)
  addIffNotNull("url", url, s)
  if (populateCache) addIffNotNull("cachedText", cachedText, s)
  return s
}
