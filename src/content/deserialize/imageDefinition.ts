import { toUrl } from "@/url"
import { isObject } from "@/util"
import { ImageDefinition } from "../types"
import DeserializationException from "./deserializationException"
import { addIffNotNull, makeNullOrFun, mustBeExGen, mustBeStringOrNotDefinedExGen, stringOrThrow } from "./util"


export function deserializeImageDefinition(sImageDefinition: any, populateCache: boolean = false): ImageDefinition {
  const mustBeEx = mustBeExGen('ImageDefinition')
  const mustBeStringOrNotDefinedEx = mustBeStringOrNotDefinedExGen('ImageDefinition')

  if (!isObject(sImageDefinition)) {
    throw new DeserializationException("ImageDefinition must be an object")
  }

  const { url, alt: sAlt } = sImageDefinition as any

  if (typeof url !== "string") throw mustBeEx("url", "a string")

  const alt = makeNullOrFun(
    sAlt,
    v => stringOrThrow(v, mustBeStringOrNotDefinedEx('alt'))
  )

  return {
    url: toUrl(url),
    alt
  }
}

export function serializeImageDefinition(markdownDefinition: ImageDefinition) {
  const { url, alt } = markdownDefinition
  const s = {}
  addIffNotNull("url", url, s)
  addIffNotNull("alt", alt, s)
  return s
}
