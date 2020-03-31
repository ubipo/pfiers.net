export interface Project {
  abrv?: string
  name: string
  urlSafeName: string
  short: string
  longMdUrl?: TaggedUrl
  siteUrl?: TaggedUrl
  gitUrl?: TaggedUrl
  imgUrl?: TaggedUrl
  technologies: Technology[]
}

export interface Technology {
  name: string
  urlSafeName: string
  short?: string
  longMdUrl?: TaggedUrl
  iconName: string
  wikiArticleName: string
  projects: Project[]
}

export interface SiteData {
  projects: Project[]
  technologies: Technology[]
}

export interface SiteDataState {
  data?: SiteData
  error?: string
  loading: boolean
}

// URL Class cannot be extended so this will have to do
export interface TaggedUrl extends URL {
  isDistUrl: boolean
  isContentUrl: boolean
}

export function tagUrl(url: URL, isDistUrl = false, isContentUrl = false) {
  const taggedUrl = (url as TaggedUrl)
  taggedUrl.isDistUrl = isDistUrl
  taggedUrl.isContentUrl = isContentUrl
  return taggedUrl
}

export function isTaggedUrl(object: any): object is TaggedUrl {
  return object instanceof URL && 'isDistUrl' in object && 'isContentUrl' in object;
}
