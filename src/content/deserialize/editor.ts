import { isObject } from "@/util";
import { Editor } from "../types";
import DeserializationException from "./deserializationException";
import { deserializeMarkdownDefinition, serializeMarkdownDefinition } from "./markdownDefinition";


export function deserializeEditor(sEditor: any, populateCache: boolean = false): Editor {
  if (!isObject(sEditor)) {
    throw new DeserializationException("Editor must be an object")
  }

  const { description: descriptionIn } = sEditor as any

  let description;
  try {
    description = deserializeMarkdownDefinition(descriptionIn, populateCache)
  } catch (error) {
    throw new DeserializationException(`deserializing property "description": ${error.message}`)
  }

  return { description }
}

export function serializeEditor(editor: Editor, populateCache: boolean = false) {
  const { description } = editor
  const sDescription = serializeMarkdownDefinition(description, populateCache)
  return { description: sDescription }
}
