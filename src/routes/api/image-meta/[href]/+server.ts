import type { RequestHandler } from './$types'
import { getImageHrefMetaOnServer } from '$lib/service/markdown/imageMeta';


export const GET: RequestHandler = async ({ params }) => {
  console.log('params', params)
  const encodedHref = params.href
  const href = decodeURIComponent(encodedHref)
  const meta = await getImageHrefMetaOnServer(href)
  const metaJson = JSON.stringify(meta)
  return new Response(metaJson, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
