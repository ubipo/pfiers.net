export interface OptionalProcessedValue<T> {
  readonly value: T,
  readonly orig: T | null
}

export interface MarkdownDefinition {
  readonly url: URL | null
  readonly text: string | null
  cachedText: string | null
}

export interface BaseProject {
  readonly abrv: string | null
  readonly name: string
  readonly urlSafeName: OptionalProcessedValue<string>
  readonly description: string
  readonly short: MarkdownDefinition | null
  readonly long: MarkdownDefinition | null
  readonly siteUrl: URL | null
  readonly gitUrl: URL | null
  readonly imgUrl: URL | null
}

export interface BareProject extends BaseProject {
  readonly technologies: string[]
}

export interface Project extends BaseProject {
  readonly technologies: Technology[]
}

export interface Technology {
  readonly name: string
  readonly urlSafeName: OptionalProcessedValue<string>
  readonly description: string | null
  readonly short: MarkdownDefinition | null
  readonly long: MarkdownDefinition | null
  readonly iconName: OptionalProcessedValue<string>
  readonly wikiArticleName: OptionalProcessedValue<string> | null
  readonly projects: Project[]
  readonly siteUrl: URL | null
}

export interface Home {
  readonly long: MarkdownDefinition
}

export interface Editor {
  readonly description: MarkdownDefinition
}

export interface Content {
  readonly projects: Project[]
  readonly technologies: Technology[]
  readonly home: Home
  readonly editor: Editor
}
