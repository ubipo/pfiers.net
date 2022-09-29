import { getContentStoreSafe } from '$lib/service/content/load';
import { get } from 'svelte/store';
import type { PageLoad } from './$types'


export const load: PageLoad = async ({ fetch }) => {
  const { contentStore, contentError } = await getContentStoreSafe(fetch)
  if (contentStore == null) return { contentError }
  const projects = get(contentStore).projects
  return { projects }
}
