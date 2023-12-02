import { EMPTY_MARKDOWN_DEFINITION, parseMarkdown, type MarkdownDefinition } from "$lib/service/markdown/markdown";
import { ContentParseException, objectOrThrow, optionalStrArrOrThrow, optionalStringOrThrow, optionalHrefOrThrow, stringOrThrow, toUriSafeName } from "../parseUtil";
import { stringLooseEqual } from "$lib/service/stringUtil";
import { resolveHrefForSource } from "../url";


export interface Content<Cyclical = true> {
  home: MarkdownDefinition,
  projects: Project<Cyclical>[],
  technologies: Technology<Cyclical>[],
}
export type NonCyclicalContent = Content<false>

export interface ImageDefinitionSerialized {
  href: string,
  alt: string,
}

export type ImageDefinition = ImageDefinitionSerialized


export function parseImageDefinition(
  sourceDirRelativePath: string,
  serialized: ImageDefinitionSerialized,
): ImageDefinition {
  const s = objectOrThrow(serialized, 'Image definition')
  const alt = stringOrThrow(s.alt, 'Image alt text')
  const unresolvedHref = stringOrThrow(s.href, 'Image href')
  const href = resolveHrefForSource(sourceDirRelativePath, unresolvedHref)
  return { href, alt }
}

export interface ContentItem {
  definedInline: boolean,
  name: string,
  uriSafeName: string,
}

export interface ContentItemDto {
  name: string,
  uriSafeName?: string,
}

export interface ProjectDto extends ContentItemDto {
  name: string,
  uriSafeName?: string,
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
  gitUrl?: string
  siteUrl?: string
  image?: ImageDefinition
  longDescription?: MarkdownDefinition
  technologies: (Cyclical extends true ? Technology<Cyclical> : number)[]
}

// TODO: Ugly hack
export const FILLER_PROJECT = {
  definedInline: true, name: "__filler__", uriSafeName: "__filler__",
  shortDescription: EMPTY_MARKDOWN_DEFINITION, technologies: [],
}
export function isFillerProject(project: Project): project is typeof FILLER_PROJECT {
  return project.name === FILLER_PROJECT.name
}

export async function dtoFromLongDescription(
  sourceDirRelativePath: string,
  inlineDto?: ContentItemDto,
  longDescriptionSource?: string,
) {
  if (inlineDto != null) return { dto: inlineDto, longDescription: undefined }
  if (longDescriptionSource == null) {
    throw new ContentParseException(`Markdown file not found. Required when not defined inline.`)
  }
  const {
    frontMatter: frontMatterDto, definition: longDescription
  } = await parseMarkdown(sourceDirRelativePath, longDescriptionSource)
  if (inlineDto != null && frontMatterDto != null) {
    throw new ContentParseException(`Cannot define project both inline and in front matter`)
  }
  return { dto: frontMatterDto, longDescription }
}

export async function parseProject(
  sourceDirRelativePath: string,
  technologies: Technology[],
  inlineDto?: ContentItemDto,
  longDescriptionSource?: string,
): Promise<Project> {
  const { dto, longDescription } = await dtoFromLongDescription(
    sourceDirRelativePath, inlineDto, longDescriptionSource
  )
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
    sourceDirRelativePath,
    stringOrThrow(s.shortDescription, 'shortDescription'),
  )
  if (shortDescription == undefined) {
    throw new ContentParseException(`shortDescription is required`)
  }
  const project: Project = {
    definedInline: inlineDto != null,
    name,
    uriSafeName: toUriSafeName(name, optionalStringOrThrow(s.uriSafeName, 'uriSafeName')),
    shortDescription,
    gitUrl: optionalHrefOrThrow(s.gitUrl, 'gitUrl'),
    siteUrl: optionalHrefOrThrow(s.siteUrl, 'siteUrl'),
    image: s.image
      ? parseImageDefinition(sourceDirRelativePath, s.image as ImageDefinitionSerialized)
      : undefined,
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
  uriSafeName?: string,
  url?: string,
  icon?: string,
  group: string
}

export interface Technology<Cyclical = true> extends ContentItem {
  name: string,
  shortDescription: MarkdownDefinition
  uriSafeName: string,
  url?: string,
  icon: string,
  longDescription?: MarkdownDefinition
  projects: (Cyclical extends true ? Project<Cyclical> : number)[]
  group: string
}

export async function parseTechnology(
  sourceDirRelativePath: string,
  inlineDto?: ContentItemDto,
  longDescriptionSource?: string,
): Promise<Technology> {
  const { dto, longDescription } = await dtoFromLongDescription(
    sourceDirRelativePath, inlineDto, longDescriptionSource
  )
  const s = objectOrThrow(dto, 'definition')
  const name = stringOrThrow(s.name, 'name')
  const { definition: shortDescription } = await parseMarkdown(
    sourceDirRelativePath,
    stringOrThrow(s.shortDescription, 'shortDescription'),
  )
  const uriSafeName = toUriSafeName(
    name,
    optionalStringOrThrow(s.uriSafeName, 'uriSafeName')
  )
  if (shortDescription == undefined) {
    throw new ContentParseException(`shortDescription is required`)
  }
  return {
    definedInline: inlineDto != null,
    name,
    shortDescription,
    uriSafeName,
    url: optionalHrefOrThrow(s.url, 'url'),
    icon: optionalStringOrThrow(s.icon, 'icon') ?? uriSafeName,
    longDescription,
    projects: [],
    group: stringOrThrow(s.group, 'group')
  }
}
