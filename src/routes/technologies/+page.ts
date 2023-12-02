import { getContentOrError } from '$lib/service/content/load';
import { get } from 'svelte/store';
import type { PageLoad } from './$types'
import { populateTechnologyPageSpecificMetadata } from '$lib/service/content/pageSpecificMetadata';


export const load: PageLoad = async ({ fetch, route: { id: routeId } }) => {
  const { contentStore, contentError } = await getContentOrError(fetch)
  if (contentStore == null) return { contentError }
  const technologies = get(contentStore).technologies
  await Promise.all(technologies.map(async (technology) => {
    populateTechnologyPageSpecificMetadata(routeId, fetch, technology)
  }))
  return { technologies }
}
