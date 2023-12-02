import { getContentOrError } from '$lib/service/content/load';
import { get } from 'svelte/store';
import type { PageLoad } from './$types'
import { populatePageSpecificTokenData } from '$lib/service/pageSpecificMetadataStore';


export const load: PageLoad = async ({ fetch, route: { id: routeId } }) => {
  const { contentStore, contentError } = await getContentOrError(fetch)
  if (contentStore == null) return { contentError }
  const home = get(contentStore).home
  await populatePageSpecificTokenData(routeId, fetch, home.tokens)
  return { home }
}
