import { contentToJson } from '$lib/service/content/api';
import { serverFsFetch } from '$lib/service/content/serverFsFetch';
import { fetchContent } from '$lib/service/content/load';
import type { Content } from '$lib/service/content/model';
import type { RequestHandler } from './$types'


export const GET: RequestHandler = async () => {
  let content: Content
  try {
    content = await fetchContent(serverFsFetch)
  } catch (e) {
    console.error(`Error loading site content:`)
    if (e instanceof Error) {
      console.error(e.stack)
    } else {
      console.error(e)
    }
    return new Response(`Error loading site content: ${e}`, {
      status: 500,
    })
  }
  const contentJson = contentToJson(content)
  return new Response(contentJson, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
 