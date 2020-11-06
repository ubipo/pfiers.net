import { isLocalDocument } from './util'
import { checkForOverride, OVERRIDES } from './runtime'


export declare const BUILD_INFO: {
  name: string
  version: string
  mode: string
}

declare global {
  interface Window { __prerenderSnapshot?: () => void; __isPrerender?: () => boolean }
}

export const name = BUILD_INFO.name
export const version = BUILD_INFO.version
const devModeOrig = BUILD_INFO.mode === 'development'
export const devMode = checkForOverride(OVERRIDES.devMode, devModeOrig)
export const strictMode = checkForOverride(OVERRIDES.strictMode, devMode)
const prerenderOrig = window.__isPrerender !== undefined
export const isPrerender = checkForOverride(OVERRIDES.prerender, prerenderOrig)
export const isLocal = isLocalDocument()
export const isProd = !(isPrerender || devMode)
export const originName = (() => {
  if (isPrerender) return 'prerender'
  if (devMode) return 'dev'
  return isLocal ? 'localProd': 'prod'
})()
