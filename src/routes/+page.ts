import { getContentOrError } from '$lib/service/content/load';
import { get } from 'svelte/store';
import type { PageLoad } from './$types'


export const load: PageLoad = async ({ fetch }) => {
  const { contentStore, contentError } = await getContentOrError(fetch)
  if (contentStore == null) return { contentError }
  const home = get(contentStore).home
  return { home }
}
