import { resolveCupUrl } from "@/url/resolve"


export enum OVERRIDES {
  strictMode = 'strict-mode',
  devMode = 'dev-mode',
  prerender = 'prerender'
}

export function checkForOverride(name: string, val: boolean) {
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
  __webpack_public_path__ = resolveCupUrl(path).href
}
