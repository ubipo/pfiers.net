import { fetchCup } from "@/fetch"
import { toUrl } from "@/url"
import { YAMLToConent } from "./deserialize"


const DEFAULT_CONTENT_URL = toUrl('c:content.yaml')

export async function fetchContentFromYAML(url = DEFAULT_CONTENT_URL) {
  console.info(`Using content URL: ${url}`)
  const res = await fetchCup(url.href)
  if (!res.ok) {
    throw new Error(`HTTP error fetching site content from ${url.href}: ${res.statusText}`)
  }
  return YAMLToConent(await res.text())
}
