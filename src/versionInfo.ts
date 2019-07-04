import versionInfoRaw from '../version-info.txt'

const versionInfo = versionInfoRaw.split('/')
export const version = versionInfo[0]
export const buildMode = versionInfo[versionInfo.length - 1]
