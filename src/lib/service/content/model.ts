import { EMPTY_MARKDOWN_DEFINITION, parseMarkdown, type MarkdownDefinition, type TokenProcessors } from "$lib/service/markdown";
import { ContentParseException, objectOrThrow, optionalStrArrOrThrow, optionalStringOrThrow, optionalUrlOrThrow, stringOrThrow, toUrlSafeName } from "./parseUtil";
import { stringLooseEqual } from "$lib/service/stringUtil";
import { urlFromString } from "$lib/service/url";
import { getImageMeta, getImageUrlMeta, type ImageMeta } from "./imageMeta";


export interface Content<Cyclical = true> {
  home: MarkdownDefinition,
  projects: Project<Cyclical>[],
  technologies: Technology<Cyclical>[],
}
export type NonCyclicalContent = Content<false>

export interface ImageDefinitionSerialized {
  url: string,
  alt: string,
}

export interface ImageDefinition extends ImageDefinitionSerialized { }

export interface ContentImageDefinition extends ImageDefinition {
  meta: ImageMeta
}

export async function parseImageDefinition(
  serialized: ImageDefinitionSerialized
): Promise<ImageDefinition> {
  const s = objectOrThrow(serialized, 'Image definition')
  const alt = stringOrThrow(s.alt, 'Image alt text')
  const hrefUrl = urlFromString(stringOrThrow(s.url, 'Image URL'))
  return { ...await getImageUrlMeta(hrefUrl), alt }
}

export interface ContentItem {
  definedInline: boolean,
  name: string,
  urlSafeName: string,
}

export interface ContentItemDto {
  name: string,
  urlSafeName?: string,
}

export interface ProjectDto extends ContentItemDto {
  name: string,
  urlSafeName?: string,
  shortDescription: string,
  gitUrl?: string,
  siteUrl?: string,
  image?: ImageDefinitionSerialized,
  technologies?: string[],
  longDescription?: {
    markdown: string,
    html: string,
  },
}

export interface Project<Cyclical = true> extends ContentItem {
  shortDescription: MarkdownDefinition
  gitUrl?: URL
  siteUrl?: URL
  image?: ImageDefinition
  longDescription?: MarkdownDefinition
  technologies: (Cyclical extends true ? Technology<Cyclical> : number)[]
}

// TODO: Ugly hack
export const FILLER_PROJECT = {
  definedInline: true, name: "__filler__", urlSafeName: "__filler__",
  shortDescription: EMPTY_MARKDOWN_DEFINITION, technologies: [],
}
export function isFillerProject(project: Project): project is typeof FILLER_PROJECT {
  return project.name === FILLER_PROJECT.name
}

export async function dtoFromLongDescription(
  tokenProcessors: TokenProcessors,
  inlineDto?: ContentItemDto,
  longDescriptionSource?: string,
) {
  if (inlineDto != null) return { dto: inlineDto, longDescription: undefined }
  if (longDescriptionSource == null) {
    throw new ContentParseException(`Markdown file not found. Required when not defined inline.`)
  }
  const {
    frontMatter: frontMatterDto, definition: longDescription
  } = await parseMarkdown(longDescriptionSource, tokenProcessors)
  if (inlineDto != null && frontMatterDto != null) {
    throw new ContentParseException(`Cannot define project both inline and in front matter`)
  }
  return { dto: frontMatterDto, longDescription }
}

export async function parseProject(
  technologies: Technology[],
  tokenProcessors: TokenProcessors,
  inlineDto?: ContentItemDto,
  longDescriptionSource?: string,
): Promise<Project> {
  const { dto, longDescription } = await dtoFromLongDescription(tokenProcessors, inlineDto, longDescriptionSource)
  const s = objectOrThrow(dto as ProjectDto, 'definition')
  const name = stringOrThrow(s.name, 'name')
  if (name === "__filler__") return FILLER_PROJECT
  const technologyNames = optionalStrArrOrThrow(s.technologies, 'technologies') ?? []
  const projectTechnologies = technologyNames.map(technologyName => {
    const technology = technologies.find(t => stringLooseEqual(t.name, technologyName))
    if (technology == null) {
      throw new ContentParseException(`Project ${name}: Technology ${technologyName} not found`)
    }
    return technology
  })
  const { definition: shortDescription } = await parseMarkdown(
    stringOrThrow(s.shortDescription, 'shortDescription'),
    tokenProcessors
  )
  if (shortDescription == undefined) {
    throw new ContentParseException(`shortDescription is required`)
  }
  const project: Project = {
    definedInline: inlineDto != null,
    name,
    urlSafeName: toUrlSafeName(name, optionalStringOrThrow(s.urlSafeName, 'urlSafeName')),
    shortDescription,
    gitUrl: optionalUrlOrThrow(s.gitUrl, 'gitUrl'),
    siteUrl: optionalUrlOrThrow(s.siteUrl, 'siteUrl'),
    image: s.image ? await parseImageDefinition(s.image as ImageDefinitionSerialized) : undefined,
    longDescription,
    technologies: projectTechnologies
  }
  for (const technology of projectTechnologies) {
    technology.projects.push(project)
    technology.projects.sort((a, b) => a.name.localeCompare(b.name))
  }
  return project
}

export interface TechnologyDto extends ContentItemDto {
  name: string,
  urlSafeName?: string,
  url?: string,
  icon?: string,
  group: string
}

export interface Technology<Cyclical = true> extends ContentItem {
  name: string,
  shortDescription: MarkdownDefinition
  urlSafeName: string,
  url?: URL,
  icon: string,
  longDescription?: MarkdownDefinition
  projects: (Cyclical extends true ? Project<Cyclical> : number)[]
  group: string
}

export async function parseTechnology(
  tokenProcessors: TokenProcessors,
  inlineDto?: TechnologyDto,
  longDescriptionSource?: string,
): Promise<Technology> {
  const { dto, longDescription } = await dtoFromLongDescription(tokenProcessors, inlineDto, longDescriptionSource)
  const s = objectOrThrow(dto, 'definition')
  const name = stringOrThrow(s.name, 'name')
  const { definition: shortDescription } = await parseMarkdown(
    stringOrThrow(s.shortDescription, 'shortDescription'),
    tokenProcessors
  )
  const urlSafeName = toUrlSafeName(
    name,
    optionalStringOrThrow(s.urlSafeName, 'urlSafeName')
  )
  if (shortDescription == undefined) {
    throw new ContentParseException(`shortDescription is required`)
  }
  return {
    definedInline: inlineDto != null,
    name,
    shortDescription,
    urlSafeName,
    url: optionalUrlOrThrow(s.url, 'url'),
    icon: optionalStringOrThrow(s.icon, 'icon') ?? urlSafeName,
    longDescription,
    projects: [],
    group: stringOrThrow(s.group, 'group')
  }
}
