import { writable, type Readable, type Writable } from "svelte/store"
import { Exception } from "$lib/service/exception"
import type { FetchFn } from "$lib/service/fetchFn"
import { getImageMeta, type ContentImageToken } from "./imageMeta"
import { parseMarkdown, parseMarkdownFrontMatter, type MarkdownDefinition, type TokenProcessors } from "$lib/service/markdown"
import { parseProject, type Content, type ContentItem, type ContentItemDto, parseTechnology } from "./model"
import { arrayOrThrow, ContentParseException, isObject, objectOrThrow, toUrlSafeName } from "./parseUtil"
import { urlFromString } from "$lib/service/url"
import parseYaml from "$lib/service/yaml"
import type { FetchContentFile } from "./contentFile"
import { fetchContentFromApiJson } from "./api"


let getContentFromBuildImports = true
let contentStore: null | Writable<Content> = null

export async function getContentStoreSafe(fetchFn: FetchFn) {
  try {
    return { contentStore: await getContentStore(fetchFn) }
  } catch (contentError) {
    console.error(`Error loading site content: ${contentError}`)
    return { contentError }
  }
}
export type SafeContent<T> = Awaited<ReturnType<typeof getContentStoreSafe>>

async function createFetchContentFile(fetchFn: FetchFn): Promise<FetchContentFile> {
  const fetchContentFile: FetchContentFile = async contentPath => {
    const res = await fetchFn(`content/${contentPath}`)
    if (!res.ok) {
      if (res.status === 404) return undefined
      throw new ContentFetchException(`File ${contentPath}: ${res.status}`)
    }
    return await res.text()
  }

  return fetchContentFile
}

export async function getContentStore(fetchFn: FetchFn): Promise<Readable<Content>> {
  if (contentStore != null) return contentStore
  const content = getContentFromBuildImports
    ? await fetchContentFromApiJson(fetchFn)
    : await fetchContent(await createFetchContentFile(fetchFn))
  contentStore = writable<Content>(content)
  return contentStore
}

export function getTokenProcessors(): TokenProcessors {
  return {
    image: async token => {
      const hrefUrl = urlFromString(token.href)
      if (hrefUrl.protocol === 'c:') {
        if (getContentFromBuildImports) {
          const { meta, placeholder } = await getImageMeta(hrefUrl.pathname)
          const contentImageToken = token as ContentImageToken
          contentImageToken.meta = meta
          contentImageToken.placeholder = placeholder
        }
        token.href = `/content/${hrefUrl.pathname}`
      }
    }
  }
}

export async function fetchContent(fetchFn: FetchContentFile): Promise<Content> {
  const tokenProcessors = getTokenProcessors()
  const [home, technologies] = await Promise.all([
    fetchHome(fetchFn, tokenProcessors),
    fetchContentItems(fetchFn, tokenProcessors, parseTechnology, 'technology', 'technologies'),
  ])
  const projects = await fetchContentItems(
    fetchFn, tokenProcessors, (...args) => parseProject(technologies, ...args),
    'project', 'projects'
  )
  return { home, projects, technologies }
}

export class ContentFetchException extends Exception { }

export async function fetchHome(
  fetchFn: FetchContentFile,
  tokenProcessors: TokenProcessors
): Promise<MarkdownDefinition> {
  const markdownSource = await fetchFn('home.md')
  if (markdownSource == null) throw new ContentFetchException('home.md not found')
  const { definition: homeMarkdown } = await parseMarkdown(markdownSource, tokenProcessors);
  if (homeMarkdown == null) throw new ContentParseException('home.md must have content')
  return homeMarkdown
}

type ParseDtoFn<D extends ContentItemDto, I extends ContentItem> = (
  tokenProcessors: TokenProcessors, inlineDto?: D, longDescriptionSource?: string
) => Promise<I>

async function fetchContentItem<D extends ContentItemDto, I extends ContentItem>(
  fetchFn: FetchContentFile,
  tokenProcessors: TokenProcessors,
  nameOrDto: string | D,
  parseDto: ParseDtoFn<D, I>,
  nameSingular: string,
  namePlural: string,
): Promise<I> {
  const [urlSafeName, inlineDto] = typeof nameOrDto === 'string'
    ? [toUrlSafeName(nameOrDto), undefined]
    : [toUrlSafeName(nameOrDto.name, nameOrDto.urlSafeName), nameOrDto]

  try {
    const markdownFile = `${namePlural}/${urlSafeName}.md`
    const markdownSource = await fetchFn(markdownFile)
    return await parseDto(tokenProcessors, inlineDto, markdownSource)
  } catch (e) {
    const messagePrefix = `${nameSingular} ${urlSafeName}: `
    if (e instanceof ContentParseException) {
      e.message = messagePrefix + e.message
      throw e
    } else if (e instanceof Error) {
      throw new ContentParseException(messagePrefix + e.message, e)
    }
    throw e
  }
}

export async function fetchContentItems<D extends ContentItemDto, I extends ContentItem>(
  fetchFn: FetchContentFile,
  tokenProcessors: TokenProcessors,
  parseDto: ParseDtoFn<D, I>,
  nameSingular: string,
  namePlural: string,
) {
  const metadataPath = `${namePlural}/${namePlural}.yaml`
  const metadataYaml = await fetchFn(metadataPath)
  if (metadataYaml == null) {
    throw new ContentFetchException(`${namePlural} metadata file ${metadataPath} not found`)
  }
  const metadata = objectOrThrow(parseYaml(metadataYaml), "Projects metadata")
  const itemNames = arrayOrThrow(metadata[namePlural], `'${namePlural}' property in ${metadataPath}`)
  return await Promise.all(itemNames.map(projectName => {
    return fetchContentItem(fetchFn, tokenProcessors, projectName, parseDto, nameSingular, namePlural)
  }))
}
