import { contentToJson } from '$lib/service/content/api';
import { dynamicImportContentFile } from '$lib/service/content/contentDynamicImport';
import { fetchContent } from '$lib/service/content/load';
import type { RequestHandler } from './$types'


export const GET: RequestHandler = async () => {
  const content = await fetchContent(dynamicImportContentFile)
  const contentJson = contentToJson(content)
  return new Response(contentJson, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
 