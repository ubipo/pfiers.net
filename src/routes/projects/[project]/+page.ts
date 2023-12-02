import { getContentOrError } from '$lib/service/content/load';
import { error as httpError } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types'
import { populateProjectPageSpecificMetadata } from '$lib/service/content/pageSpecificMetadata';


export const load: PageLoad = async ({ params, fetch }) => {
  const { contentStore, contentError } = await getContentOrError(fetch)
  if (contentStore == null) return { contentError }
  const project = get(contentStore).projects.find(
    project => project.uriSafeName === params.project
  )
  if (project == null) throw httpError(404, 'Project not found')
  populateProjectPageSpecificMetadata(params.project, fetch, project)
  return { project }
}
