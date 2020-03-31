import { Project, Technology, SiteData } from '../types'
import DeserializationException from './deserializationException'
import {
  SerializedProject,
  SerializedTechnology
} from './validate/serialized-site-data-schema'
import { toUrl } from '@/util/url'
import { strictMode } from '@/enviroment/runtime'
import { toContentUrl } from '@/enviroment/content'

function makeUrlSafe(url: string): string {
  return encodeURIComponent(url.toLowerCase().replace(/ ?[ -] ?/g, '-'))
}

function falsyOrFunc<T, S>(param: T | undefined, func: (param: T) => S): S | undefined {
  if (!param) return
  return func(param)
}

function deserializeProjects(sProjects: SerializedProject[]) {
  const projectNames: string[] = []
  return sProjects.map<Project>(p => {
    if (projectNames.includes(p.name))
      throw new DeserializationException(
        `A project with the name "${p.name}" already exists`
      )
    projectNames.push(p.name)

    // Temporary mock technology object, to be replaced in cyclic pass
    const technologiesMock = p.technologies.map(technology => ({
      name: technology,
      urlSafeName: makeUrlSafe(technology),
      iconName: '',
      wikiArticleName: '',
      projects: []
    }))

    return {
      abrv: p.abrv,
      name: p.name,
      short: p.short,
      longMdUrl: falsyOrFunc(p.longMdUrl, toContentUrl),
      urlSafeName: p.urlSafeName === undefined ? makeUrlSafe(p.name) : p.urlSafeName,
      siteUrl: falsyOrFunc(p.siteUrl, toUrl),
      gitUrl: falsyOrFunc(p.gitUrl, toUrl),
      imgUrl: falsyOrFunc(p.imgUrl, toContentUrl),
      technologies: technologiesMock
    }
  })
}

function deserializeTechnologies(sTechnologies: SerializedTechnology[]) {
  const technologyNames: string[] = []
  return sTechnologies.map<Technology>(t => {
    if (technologyNames.includes(t.name))
      throw new DeserializationException(
        `A technology with the name "${t.name}" already exists`
      )
    technologyNames.push(t.name)

    const urlSafeName = t.urlSafeName == undefined ? makeUrlSafe(t.name) : t.urlSafeName
    const iconName = t.iconName == undefined ? urlSafeName : t.iconName
    const wikiArticleName = t.wikiArticleName == undefined ? t.name : t.wikiArticleName

    return {
      name: t.name,
      urlSafeName: urlSafeName,
      short: t.short,
      longMdUrl: falsyOrFunc(t.longMdUrl, toContentUrl),
      iconName: iconName,
      wikiArticleName: wikiArticleName,
      projects: []
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function deserialize(serializedSiteData: any): Promise<SiteData> {
  if (strictMode) {
    const imp = await import(
      /* webpackChunkName: "dev-validate-site-data" */ './validate'
    )
    const validateSerializedSiteData = imp.default
    const res = validateSerializedSiteData(serializedSiteData)
    if (res !== undefined)
      throw new DeserializationException(
        `serializedSiteData does not follow jschema: ${res}`
      )
  }

  let projects: Project[] = deserializeProjects(serializedSiteData.projects)
  let technologies: Technology[] = deserializeTechnologies(
    serializedSiteData.technologies
  )

  // Cyclic pass, makes references from projects to technologies and vice versa
  for (const project of projects) {
    for (let i = 0; i < project.technologies.length; i++) {
      const mockTechnology = project.technologies[i]
      let actualTechnology = technologies.find(val => val.name === mockTechnology.name)

      if (actualTechnology === undefined)
        throw new DeserializationException(
          `Technology "${mockTechnology.name}" of ${project.name} is not defined`
        )

      actualTechnology.projects.push(project)
      project.technologies.splice(i, 1, actualTechnology)
    }
  }

  return {
    projects,
    technologies
  }
}
