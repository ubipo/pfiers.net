import { MarkdownDefinition } from "@/content/types"
import { fetchCup } from "@/fetch"


export async function fetchMarkdownFromUrl(url: URL) {
  const res = await fetchCup(url.href)
  if (!res.ok) {
    throw new Error(`HTTP error fetching markdown from ${url.href}: ${res.statusText}`)
  }
  return await res.text()
}

export function fetchMarkdown(markdownDefinition: MarkdownDefinition) {
  if (markdownDefinition.text !== null) {
    return { markdown: markdownDefinition.text }
  }

  if (markdownDefinition.cachedText !== null) {
    return { markdown: markdownDefinition.cachedText }
  } else {
    const url = markdownDefinition.url
    if (url === null) {
      /* This should never happen.
      Yeah yeah, I know, unrepresentable state and stuff.
      Once I can rewrite everything in something better than
      TS/JS I'll make this actually unrepresentable.*/
      throw Error("MarkdownDefinition doesn't have url defined")
    }
    return {
      fetch: async () => {
        const text = await fetchMarkdownFromUrl(url)
        markdownDefinition.cachedText = text
        return text
      }
    }
  }
}
