import { isObject } from "@/util";
import { Donate } from "../types";
import DeserializationException from "./deserializationException";
import { deserializeMarkdownDefinition, serializeMarkdownDefinition } from "./markdownDefinition";


export function deserializeDonate(sDonate: any, populateCache: boolean = false): Donate {
  if (!isObject(sDonate)) {
    throw new DeserializationException("Donate must be an object")
  }

  const { long: longIn } = sDonate as any

  let long;
  try {
    long = deserializeMarkdownDefinition(longIn, populateCache)
  } catch (error) {
    throw new DeserializationException(`deserializing property "long": ${error.message}`)
  }

  return { long }
}

export function serializeDonate(donate: Donate, populateCache: boolean = false) {
  const { long } = donate
  const sLong = serializeMarkdownDefinition(long, populateCache)
  return { long: sLong }
}
