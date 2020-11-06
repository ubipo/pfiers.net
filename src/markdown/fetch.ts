import { MarkdownDefinition } from "@/content/types"
import { fetchCup } from "@/fetch"


export async function fetchMarkdownFromUrl(url: URL) {
  const res = await fetchCup(url.href)
  if (!res.ok) {
    throw new Error(`HTTP error fetching markdown from ${url.href}: ${res.statusText}`)
  }
  return await res.text()
}

export async function fetchMarkdown(markdownDefinition: MarkdownDefinition) {
  if (markdownDefinition.text !== null) {
    return markdownDefinition.text
  }

  if (markdownDefinition.cachedText !== null) {
    return markdownDefinition.cachedText
  } else {
    if (markdownDefinition.url === null) {
      throw Error("MarkdownDefinition doesn't have url defined")
    }
    const text = await fetchMarkdownFromUrl(markdownDefinition.url)
    markdownDefinition.cachedText = text
    return text
  }
}
