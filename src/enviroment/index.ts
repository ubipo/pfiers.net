import { EnvName } from './envName'
import { checkForOverride, OVERRIDES } from './runtime'


export declare const BUILD_INFO: {
  name: string
  version: string
  mode: string
}

declare global {
  interface Window {
    __prerenderSnapshot?: () => void
    __isPrerender?: () => boolean
    __pfiers_origin_name: string,
    __pfiers_dist_base_url: string
  }
}

export const name = BUILD_INFO.name
export const version = BUILD_INFO.version
const devModeBuild = BUILD_INFO.mode === 'development'
export const devMode = checkForOverride(OVERRIDES.devMode, devModeBuild)
export const strictMode = checkForOverride(OVERRIDES.strictMode, devMode)
const hasPrerenderWindow = window.__isPrerender !== undefined
export const isPrerender = checkForOverride(OVERRIDES.prerender, hasPrerenderWindow)
export const isProd = !isPrerender && !devMode
export const originName = window.__pfiers_origin_name as EnvName
export function infoString() {
  let info = `${name}@${version}`
  info += ` ${originName}`
  if (strictMode) info += ' strict'
  return info
}
