import versionInfoRaw from '../version-info.txt'

const buildModeKey = 'buildMode'

const versionInfo = versionInfoRaw.split('/')
const version = versionInfo[0]
let buildMode = versionInfo[1]

const localSorageBuildMode = localStorage.getItem(buildModeKey)
if (localSorageBuildMode != undefined) {
  // eslint-disable-next-line no-console
  console.info('Overriding build mode from local storage!')
  buildMode = localSorageBuildMode
}

export { version, buildMode }
