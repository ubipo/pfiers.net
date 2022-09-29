import { Exception } from "../exception"
import type { FetchFn } from "../fetchFn"
import type { Content, NonCyclicalContent, Project, Technology } from "./model"
import { isObject } from "./parseUtil"


function makeContentCyclical(content: NonCyclicalContent): Content {
  const { projects, technologies, home } = content
  for (const project of projects) {
    (project as unknown as Project).technologies = project.technologies.map(
      technologyIndex => technologies[technologyIndex] as unknown as Technology
    )
  }
  for (const technology of technologies) {
    (technology as unknown as Technology).projects = technology.projects.map(
      projectIndex => projects[projectIndex] as unknown as Project
    )
  }
  return {
    home,
    projects: projects as unknown as Project[],
    technologies: technologies as unknown as Technology[],
  }
}

export function makeContentNonCyclical(content: Content): NonCyclicalContent {
  const { projects, technologies, home } = content
  for (const project of projects) {
    (project as unknown as Project<false>).technologies = project.technologies.map(
      technology => technologies.indexOf(technology)
    )
  }
  for (const technology of technologies) {
    (technology as unknown as Technology<false>).projects = technology.projects.map(
      project => projects.indexOf(project)
    )
  }
  return {
    home,
    projects: projects as unknown as Project<false>[],
    technologies: technologies as unknown as Technology<false>[],
  }
}

export function contentToJson(content: Content) {
  return JSON.stringify(makeContentNonCyclical(content), function(key, value) {
    const objValue = this[key]
    if (typeof objValue === 'string' || objValue instanceof String) return `s${objValue}`
    if (objValue instanceof URL) return `u${objValue}`
    return objValue
  })
}

export function contentFromJson(json: string) {
  const nonCyclicalContent = JSON.parse(json, (_key, value) => {
    if (typeof value === 'string') {
      if (value.startsWith('s')) return value.slice(1)
      if (value.startsWith('u')) return new URL(value.slice(1))
    }
    return value
  })
  if (!isObject(nonCyclicalContent) || !Array.isArray(nonCyclicalContent.projects)) {
    throw new Exception(`Failed to load content from JSON: invalid format ${json}`)
  }
  return makeContentCyclical(nonCyclicalContent as unknown as NonCyclicalContent)
}

export async function fetchContentFromApiJson(fetchFn: FetchFn) {
  const contentRes = await fetchFn('/api/content')
  if (!contentRes.ok) throw new Exception(`Failed to load content from API: ${contentRes.status} ${contentRes.statusText}`)
  const contentJson = await contentRes.text()
  return contentFromJson(contentJson)
}
