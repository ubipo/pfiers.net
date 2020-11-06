import YAML from "yaml";
import { Content } from "../types";
import { deserializeContent, serializeContent } from "./content";


export function YAMLToConent(yaml: string) {
  const sContent = YAML.parse(yaml)
  return deserializeContent(sContent)
}

export function contentToYAML(content: Content) {
  const sContent = serializeContent(content)
  return YAML.stringify(sContent)
}

export { deserializeContent, serializeContent }
