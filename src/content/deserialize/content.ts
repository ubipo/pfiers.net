import { isObject } from "@/util";
import { cloneDeep } from "lodash";
import { BareProject, BaseProject, Content, Donate, Editor, Home, Project, Technology } from "../types";
import DeserializationException from "./deserializationException";
import { deserializeDonate, serializeDonate } from "./donate";
import { deserializeEditor, serializeEditor } from "./editor";
import { deserializeHome, serializeHome } from "./home";
import { deserializeProject, serializeProject } from "./project";
import { deserializeTechnology, serializeTechnology } from "./technology";


export function deserializeContent(
  sContent: any,
  existingProjects: BaseProject[] = [],
  existingTechnologies: Technology[] = [],
  populateCache: boolean = false
): Content {
  const mustBeEx = (prop: string, what: string) => new DeserializationException(
      `SiteData property "${prop}" must be ${what}`
    )

  if (!isObject(sContent)) {
    throw new DeserializationException("Content must be an object")
  }

  const {
    projects: sProjects, technologies: sTechnologies,
    home: sHome, editor: sEditor, donate: sDonate
  } = sContent as any

  let home: Home;
  try {
    home = deserializeHome(sHome, populateCache)
  } catch (error) {
    throw new DeserializationException(`deserializing property "home": ${error.message}`)
  }

  let editor: Editor;
  try {
    editor = deserializeEditor(sEditor, populateCache)
  } catch (error) {
    throw new DeserializationException(`deserializing property "editor": ${error.message}`)
  }

  let donate: Donate;
  try {
    donate = deserializeDonate(sDonate, populateCache)
  } catch (error) {
    throw new DeserializationException(`deserializing property "donate": ${error.message}`)
  }

  if (!Array.isArray(sProjects)) {
    throw mustBeEx("projects", "a list")
  }

  if (!Array.isArray(sTechnologies)) {
    throw mustBeEx("technologies", "a list")
  }

  const baseProjects: BareProject[] = []
  sProjects.forEach((sProject, projectI) => {
    let project;
    try {
      project = deserializeProject(
        sProject,
        (baseProjects as BaseProject[]).concat(existingProjects),
        populateCache
      )
    } catch (error) {
      throw new DeserializationException(`deserializing projects[${projectI}]: ${error.message}`)
    }
    baseProjects.push(project)
  });

  const technologies: Technology[] = []
  sTechnologies.forEach((sTechnology, technologyI) => {
    let technology;
    try {
      technology = deserializeTechnology(
        sTechnology,
        existingTechnologies.concat(technologies),
        populateCache
      )
    } catch (error) {
      throw new DeserializationException(`deserializing technologies[${technologyI}]: ${error.message}`)
    }
    technologies.push(technology)
  });

  // Cyclic pass, makes references from projects to technologies and vice versa
  const projects = baseProjects.map(baseProject => {
    const project = (cloneDeep(baseProject) as unknown) as Project
    (project as any).technologies = baseProject.technologies.map(technologyName => {
      const technology = technologies.find(t => t.name === technologyName)
      if (technology === undefined) {
        throw new DeserializationException(
          `Technology "${technologyName}" of ${baseProject.name} is not defined`
        )
      }
      technology.projects.push(project)
      return technology
    });
    return project
  })

  return {
    projects,
    technologies,
    home,
    editor,
    donate
  }
}

export function serializeContent(content: Content, populateCache: boolean = false) {
  const {
    home, editor, donate, projects, technologies
  } = content
  const sHome = serializeHome(home, populateCache)
  const sEditor = serializeEditor(editor, populateCache)
  const sDonate = serializeDonate(donate, populateCache)
  const sProjects = projects.map(sP => serializeProject(sP, populateCache))
  const sTechnologies = technologies.map(sT => serializeTechnology(sT, populateCache))
  return { editor: sEditor, donate: sDonate, home: sHome, projects: sProjects, technologies: sTechnologies }
}
