import { devMode } from '.'

function checkForOverride(name: string, val: boolean) {
  const localSorageVal = localStorage.getItem(name)
  if (localSorageVal != undefined) {
    // eslint-disable-next-line no-console
    console.info(`Overriding ${name} from local storage!`)
    val = localSorageVal === 'true'
  }
  return val
}

// eslint-disable-next-line @typescript-eslint/camelcase
declare var __webpack_public_path__: string

export function setWebpackPublicPath(path: URL) {
  // eslint-disable-next-line @typescript-eslint/camelcase
  __webpack_public_path__ = path.href
}

export const strictMode = checkForOverride('strict-mode', devMode)
