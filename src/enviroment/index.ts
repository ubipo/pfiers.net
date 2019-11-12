import { isLocalDocument } from './util'

export declare const BUILD_INFO: {
  version: string
  mode: string
}

export const version = BUILD_INFO.version
export const devMode = BUILD_INFO.mode === 'development'
const isLocal = isLocalDocument()
export const originName = devMode ? 'dev' : isLocal ? 'localProd' : 'prod'
