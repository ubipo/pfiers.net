import type { RequestHandler } from './$types'
import { getImageHrefMetaOnServer } from '$lib/service/imageMeta/imageMeta';


export const GET: RequestHandler = async ({ params: { href } }) => {
  const meta = await getImageHrefMetaOnServer(href)
  const metaJson = JSON.stringify(meta)
  return new Response(metaJson, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
