import { Project, Technology, SiteData } from '../types'
import DeserializationException from './deserializationException'
import {
  SerializedProject,
  SerializedTechnology
} from './validate/serialized-site-data-schema'
import validateSerializedSiteData from './validate'

function makeUrlSafe(url: string): string {
  return encodeURIComponent(url.toLowerCase().replace(/ ?[ -] ?/g, '-'))
}

function toContentUrl(urlString: string | undefined) {
  if (urlString === undefined) return undefined

  if (urlString.substr(0, 2) === '@/')
    urlString = `${document.location.origin}/content/${urlString.slice(2)}`

  return new URL(urlString)
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
      urlSafeName: '',
      projects: []
    }))

    return {
      abrv: p.abrv,
      name: p.name,
      short: p.short,
      longMdUrl: toContentUrl(p.longMdUrl),
      urlSafeName: p.urlSafeName === undefined ? makeUrlSafe(p.name) : p.urlSafeName,
      gitUrl: p.gitUrl === undefined ? undefined : new URL(p.gitUrl),
      imgUrl: toContentUrl(p.imgUrl),
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

    const urlSafeName = t.urlSafeName === undefined ? makeUrlSafe(t.name) : t.urlSafeName
    const iconName = t.iconName === undefined ? urlSafeName : t.iconName

    return {
      name: t.name,
      urlSafeName: urlSafeName,
      short: t.short,
      longMdUrl: toContentUrl(t.longMdUrl),
      iconUrl: toContentUrl(`@/tech-icons/${iconName}.svg`),
      projects: []
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function deserialize(serializedSiteData: any): Promise<SiteData> {
  const res = await validateSerializedSiteData(serializedSiteData)
  if (res !== undefined)
    throw new DeserializationException(
      `serializedSiteData does not follow jschema: ${res}`
    )

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
