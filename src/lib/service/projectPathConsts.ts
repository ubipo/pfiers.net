import path from 'node:path'


/** Relative to the project root directory */
export const STATIC_DIR_PROJECT_RELATIVE_PATH = 'static/';

/** Relative to the project root directory */
export const CONTENT_DIR_PROJECT_RELATIVE_PATH = path.join(
  STATIC_DIR_PROJECT_RELATIVE_PATH,
  'content/'
)
