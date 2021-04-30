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
