import { writable, type Readable, type Writable } from "svelte/store"
import { Exception } from "$lib/service/exception"
import type { FetchFn } from "$lib/service/fetchFn"
import { parseMarkdown, type MarkdownDefinition } from "$lib/service/markdown/markdown"
import { parseProject, type Content, type ContentItem, type ContentItemDto, parseTechnology } from "./model"
import { arrayOrThrow, ContentParseException, objectOrThrow, toUriSafeName } from "./parseUtil"
import parseYaml from "$lib/service/yaml"
import type { FetchContentFile } from "./contentFile"
import { fetchContentFromApiJson } from "./api"
import { joinPath } from "../url"
import { CONTENT_DIR_SITE_RELATIVE_URL } from "$lib/service/siteUrlConsts"


const getContentFromBuildImports = true
let contentStore: null | Writable<Content> = null

export async function getContentOrError(fetchFn: FetchFn) {
  try {
    return { contentStore: await getContentStore(fetchFn) }
  } catch (contentError) {
    console.error(`Error loading site content: ${contentError}`)
    return { contentError }
  }
}

export type SafeContent<T> = Awaited<ReturnType<typeof getContentOrError>>

async function createFetchContentFileFn(fetchFn: FetchFn): Promise<FetchContentFile> {
  const fetchContentFile: FetchContentFile = async path => {
    const res = await fetchFn(path)
    if (!res.ok) {
      if (res.status === 404) return undefined
      throw new ContentFetchException(`File ${path}: ${res.status}`)
    }
    return await res.text()
  }

  return fetchContentFile
}

export async function getContentStore(fetchFn: FetchFn): Promise<Readable<Content>> {
  if (contentStore != null) return contentStore
  const fetchContentFileFn = await createFetchContentFileFn(fetchFn)
  const content = getContentFromBuildImports
    ? await fetchContentFromApiJson(fetchFn)
    : await fetchContent(fetchContentFileFn)
  contentStore = writable<Content>(content)
  return contentStore
}

export async function fetchContent(fetchFn: FetchContentFile): Promise<Content> {
  const [home, technologies] = await Promise.all([
    fetchHome(fetchFn),
    fetchContentItems(
      fetchFn,
      (...args) => parseTechnology(joinPath(CONTENT_DIR_SITE_RELATIVE_URL, "technologies/"), ...args),
      'technology', 'technologies'
    ),
  ])
  const projects = await fetchContentItems(
    fetchFn,
    (...args) => parseProject(joinPath(CONTENT_DIR_SITE_RELATIVE_URL, "projects"), technologies, ...args),
    'project', 'projects'
  )
  return { home, projects, technologies }
}

export class ContentFetchException extends Exception { }

export async function fetchHome(fetchFn: FetchContentFile): Promise<MarkdownDefinition> {
  const markdownSource = await fetchFn('home.md')
  if (markdownSource == null) throw new ContentFetchException('home.md not found')
  const sourceDirRelativePath = CONTENT_DIR_SITE_RELATIVE_URL
  const { definition: homeMarkdown } = await parseMarkdown(sourceDirRelativePath, markdownSource);
  if (homeMarkdown == null) throw new ContentParseException('home.md must have content')
  return homeMarkdown
}

type ParseDtoFn<D extends ContentItemDto, I extends ContentItem> = (
  inlineDto?: D,
  longDescriptionSource?: string
) => Promise<I>

async function fetchContentItem<D extends ContentItemDto, I extends ContentItem>(
  fetchFn: FetchContentFile,
  nameOrDto: string | D,
  parseDto: ParseDtoFn<D, I>,
  nameSingular: string,
  namePlural: string,
): Promise<I> {
  const [uriSafeName, inlineDto] = typeof nameOrDto === 'string'
    ? [toUriSafeName(nameOrDto), undefined]
    : [toUriSafeName(nameOrDto.name, nameOrDto.uriSafeName), nameOrDto]

  try {
    const markdownFile = `${namePlural}/${uriSafeName}.md`
    const markdownSource = await fetchFn(markdownFile)
    return await parseDto(inlineDto, markdownSource)
  } catch (e) {
    const messagePrefix = `${nameSingular} ${uriSafeName}: `
    if (e instanceof ContentParseException) {
      e.message = messagePrefix + e.message
      throw e
    } else if (e instanceof Error) {
      console.error(`Content parse error caused by: ${e.message}`)
      console.error(e.stack)
      throw new ContentParseException(messagePrefix + e.message, e)
    }
    throw e
  }
}

export async function fetchContentItems<D extends ContentItemDto, I extends ContentItem>(
  fetchFn: FetchContentFile,
  parseDto: ParseDtoFn<D, I>,
  nameSingular: string,
  namePlural: string,
) {
  const metadataPath = `${namePlural}/${namePlural}.yaml`
  const metadataYaml = await fetchFn(metadataPath)
  if (metadataYaml == null) {
    throw new ContentFetchException(`${namePlural} metadata file ${metadataPath} not found`)
  }
  const metadata = objectOrThrow(parseYaml(metadataYaml), `${namePlural} metadata`)
  const itemNames = arrayOrThrow(metadata[namePlural], `'${namePlural}' property in ${metadataPath}`)
  return await Promise.all(itemNames.map(projectName => {
    return fetchContentItem(fetchFn, projectName, parseDto, nameSingular, namePlural)
  }))
}
