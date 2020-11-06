import { isObject } from "@/util";
import { Home } from "../types";
import DeserializationException from "./deserializationException";
import { deserializeMarkdownDefinition, serializeMarkdownDefinition } from "./markdownDefinition";


export function deserializeHome(sHome: any, populateCache: boolean = false): Home {
  if (!isObject(sHome)) {
    throw new DeserializationException("Home must be an object")
  }

  const { long: longIn } = sHome as any

  let long;
  try {
    long = deserializeMarkdownDefinition(longIn, populateCache)
  } catch (error) {
    throw new DeserializationException(`deserializing property "long": ${error.message}`)
  }

  return { long }
}

export function serializeHome(home: Home, populateCache: boolean = false) {
  const { long } = home
  const sLong = serializeMarkdownDefinition(long, populateCache)
  return { long: sLong }
}
