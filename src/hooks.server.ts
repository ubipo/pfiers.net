import type { HandleServerError } from "@sveltejs/kit"


export const handleError: HandleServerError = function handleError({ error, event }) {
  if ((error as Error).message?.startsWith("Not found: ") && event.url.pathname.startsWith('/content')) {
    // Do not log 404s for content files
    return
  }
  console.error(error)
}
