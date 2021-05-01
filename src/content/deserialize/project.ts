import { toUrl } from "@/url"
import { isObject } from "@/util"
import { BareProject, BaseProject, Project } from "../types"
import DeserializationException from "./deserializationException"
import { deserializeImageDefinition, serializeImageDefinition } from "./imageDefinition"
import { serializeMarkdownDefinition, deserializeMarkdownDefinition } from "./markdownDefinition"
import { addIffNotNull, asOptionalProcessedValue, makeNullOrFun, makeUrlSafe, mustBeExGen, mustBeStringOrNotDefinedExGen, stringOrThrow, urlOrNullGen } from "./util"


export function deserializeProject(sProject: any, existingProjects: BaseProject[], populateCache: boolean = false): BareProject {
  const mustBeEx = mustBeExGen('Project')
  const mustBeStringOrNotDefinedEx = mustBeStringOrNotDefinedExGen('Project')

  if (!isObject(sProject)) {
    throw new DeserializationException("Project must be an object")
  }

  const {
    name, description, abrv: sAbrv, short: sShort,
    technologies: sTechnologyNames, urlSafeName: sUrlSafeName, long: sLong,
    siteUrl: sSiteUrl, gitUrl: sGitUrl, img: sImg
  } = sProject as any

  if (typeof name !== "string") throw mustBeEx("name", "a string")
    
  if (existingProjects.some(project => project.name === name)) {
    throw new DeserializationException(
      `A project with the name "${name}" already exists`
    )
  }
  
  if (typeof description !== "string") throw mustBeEx("description", "a string")

  const abrv = makeNullOrFun(
    sAbrv,
    v => stringOrThrow(v, mustBeStringOrNotDefinedEx('abrv'))
  )
  const urlSafeName = asOptionalProcessedValue(
    sUrlSafeName,
    v => stringOrThrow(v, mustBeStringOrNotDefinedEx('urlSafeName')),
    () => makeUrlSafe(name)
  )

  let short;
  try {
    short = makeNullOrFun(sShort, v => deserializeMarkdownDefinition(v, populateCache))
  } catch (error) {
    throw new DeserializationException(`deserializing property "short": ${error.message}`)
  }
  let long;
  try {
    long = makeNullOrFun(sLong, v => deserializeMarkdownDefinition(v, populateCache))
  } catch (error) {
    throw new DeserializationException(`deserializing property "long": ${error.message}`)
  }

  let img;
  try {
    img = makeNullOrFun(sImg, d => deserializeImageDefinition(d))
  } catch (error) {
    throw new DeserializationException(`deserializing property "img": ${error.message}`)
  }

  const urlOrNull = urlOrNullGen('Project')
  const siteUrl = urlOrNull(sSiteUrl, 'siteUrl')
  const gitUrl = urlOrNull(sGitUrl, 'gitUrl')

  const technologyNames = (() => {
    if (sTechnologyNames === undefined) return []
    if (!Array.isArray(sTechnologyNames)) {
      throw mustBeEx("technologies", "either a list or not defined")
    }
    return sTechnologyNames
  })()

  // Temporary use technology names, to be replaced with actual technology objects in cyclic pass
  const technologies = technologyNames.map((tName: any, tI) => {
    if (typeof tName !== "string")
      throw mustBeEx(`technologies[${tI}]`, "a string")
    return tName
  })

  return {
    abrv, name, description, short, long, urlSafeName,
    siteUrl, gitUrl, img, technologies
  }
}

export function serializeProject(project: Project, populateCache: boolean = false) {
  const {
    name, abrv, gitUrl, img, siteUrl, technologies,
    urlSafeName, short, long, description
  } = project
  const sTechnologies = technologies.map(technology => technology.name)
  const s = { name, description, technologies: sTechnologies }
  addIffNotNull("urlSafeName", urlSafeName.orig, s)
  addIffNotNull("abrv", abrv, s)
  addIffNotNull("gitUrl", gitUrl, s)
  addIffNotNull("img", img, s, d => serializeImageDefinition(d))
  addIffNotNull("siteUrl", siteUrl, s)
  addIffNotNull("long", long, s, v => serializeMarkdownDefinition(v, populateCache))
  addIffNotNull("short", short, s, v => serializeMarkdownDefinition(v, populateCache))
  return s
}
