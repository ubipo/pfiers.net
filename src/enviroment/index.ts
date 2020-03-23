import { isLocalDocument } from './util'

export declare const BUILD_INFO: {
  name: string
  version: string
  mode: string
}

export const name = BUILD_INFO.name
export const version = BUILD_INFO.version
export const devMode = BUILD_INFO.mode === 'development'
export const isPrerender = (window as any).__PRERENDER_INJECTED != undefined
export const isLocal = isLocalDocument()
export const originName = (() => {
  if (devMode)
    return 'dev'

  if (isLocal) {
    if (isPrerender) {
      return 'prerender'
    } else {
      return 'localProd'
    }
  }

  return 'prod'
})()
