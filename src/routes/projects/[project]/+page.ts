import { getContentStoreSafe } from '$lib/service/content/load';
import { error as httpError } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types'


export const load: PageLoad = async ({ fetch, params }) => {
  const { contentStore, contentError } = await getContentStoreSafe(fetch)
  if (contentStore == null) return { contentError }
  const project = get(contentStore).projects.find(
    project => project.urlSafeName === params.project
  )
  if (project == null) throw httpError(404, 'Project not found')
  return { project }
}
