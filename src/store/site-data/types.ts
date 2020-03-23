export interface Project {
  abrv?: string
  name: string
  urlSafeName: string
  short: string
  longMdUrl?: URL
  siteUrl?: URL
  gitUrl?: URL
  imgUrl?: URL
  technologies: Technology[]
}

export interface Technology {
  name: string
  urlSafeName: string
  short?: string
  longMdUrl?: URL
  iconUrl?: URL
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

export class ContentUrl extends URL {
  constructor(url: URL) {
    super(url.href)
  }
}

export class DistUrl extends URL {
  constructor(url: URL) {
    super(url.href)
  }
}
