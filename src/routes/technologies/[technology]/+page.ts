import { getContentStoreSafe } from '$lib/service/content/load';
import { error as httpError } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types'


export const load: PageLoad = async ({ fetch, params }) => {
  const { contentStore, contentError: error } = await getContentStoreSafe(fetch)
  if (contentStore == null) return { error }
  const technology = get(contentStore).technologies.find(
    technology => technology.urlSafeName === params.technology
  )
  if (technology == null) throw httpError(404, 'Technology not found')
  return { technology }
}
