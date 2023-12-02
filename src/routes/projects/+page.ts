import { getContentOrError } from '$lib/service/content/load';
import { get } from 'svelte/store';
import type { PageLoad } from './$types'
import { populateProjectPageSpecificMetadata } from '$lib/service/content/pageSpecificMetadata';


export const load: PageLoad = async ({ fetch, route: { id: routeId } }) => {
  const { contentStore, contentError } = await getContentOrError(fetch)
  if (contentStore == null) return { contentError }
  const projects = get(contentStore).projects
  await Promise.all(projects.map(async (project) => {
    populateProjectPageSpecificMetadata(routeId, fetch, project)
  }))
  return { projects }
}
