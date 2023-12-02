import type { marked } from "marked";
import type { FetchFn } from "../fetchFn"
import type { MarkdownDefinition } from "../markdown/markdown";
import { populatePageSpecificTokenData } from "../pageSpecificMetadataStore";
import type { Project, Technology } from "./model";


export async function populateMarkdownPageSpecificMetadata(
  routeId: string,
  fetchFn: FetchFn,
  ...definitions: (MarkdownDefinition | undefined)[]
) {
  const tokensLists = definitions.map(d => d?.tokens).filter((d): d is marked.TokensList => d != null)
  await Promise.all(tokensLists.map(async (tokens) => {
    await populatePageSpecificTokenData(routeId, fetchFn, tokens)
  }))
}

export async function populateProjectPageSpecificMetadata(
  routeId: string,
  fetchFn: FetchFn,
  project: Project,
) {
  await populateMarkdownPageSpecificMetadata(
    routeId, fetchFn, project.shortDescription, project.longDescription
  )
}

export async function populateTechnologyPageSpecificMetadata(
  routeId: string,
  fetchFn: FetchFn,
  technology: Technology,
) {
  await populateMarkdownPageSpecificMetadata(
    routeId, fetchFn, technology.shortDescription, technology.longDescription
  )
}
