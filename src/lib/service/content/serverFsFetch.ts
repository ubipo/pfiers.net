import fs from 'node:fs/promises';
import path from 'node:path';
import { CONTENT_DIR_PROJECT_RELATIVE_PATH } from "$lib/service/projectPathConsts"


export async function serverFsFetch(contentPath: string) {
  const projectRelativePath = path.join(CONTENT_DIR_PROJECT_RELATIVE_PATH, contentPath)
  let content: string
  try {
    content = await fs.readFile(projectRelativePath, 'utf8')
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
      return undefined
    }
    throw e
  }
  return content
}
