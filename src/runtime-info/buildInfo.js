function checkForOverride(name, val) {
  const localSorageVal = localStorage.getItem(name)
  if (localSorageVal != undefined) {
    // eslint-disable-next-line no-console
    console.info(`Overriding ${name} from local storage!`)
    val = localSorageVal === 'true'
  }
  return val
}

if (!document.hasOwnProperty('buildInfo')) {
  console.error('Build info not present!')
}
const buildInfo = document['buildInfo']

const version = buildInfo.version
const buildMode = buildInfo.buildMode
const devMode = checkForOverride('dev-mode', buildMode === 'development')
const browserRegexps = buildInfo.browserRegexps

let strictMode = checkForOverride('strict-mode', devMode)

export { version, devMode, strictMode, browserRegexps }
