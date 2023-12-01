import { getContentOrError } from '$lib/service/content/load';
import { error as httpError } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types'


export const load: PageLoad = async ({ params, fetch }) => {
  const { contentStore, contentError: error } = await getContentOrError(fetch)
  if (contentStore == null) return { error }
  const technology = get(contentStore).technologies.find(
    technology => technology.uriSafeName === params.technology
  )
  if (technology == null) throw httpError(404, 'Technology not found')
  return { technology }
}
