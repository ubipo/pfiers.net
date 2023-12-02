import { getContentOrError } from '$lib/service/content/load';
import { error as httpError } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types'
import { populateTechnologyPageSpecificMetadata } from '$lib/service/content/pageSpecificMetadata';


export const load: PageLoad = async ({ params, fetch }) => {
  const { contentStore, contentError } = await getContentOrError(fetch)
  if (contentStore == null) return { contentError }
  const technology = get(contentStore).technologies.find(
    technology => technology.uriSafeName === params.technology
  )
  if (technology == null) throw httpError(404, 'Technology not found')
  populateTechnologyPageSpecificMetadata(params.technology, fetch, technology)
  return { technology }
}
