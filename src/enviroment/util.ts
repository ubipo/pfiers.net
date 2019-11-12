export function isLocalDocument() {
  const hostname = document.location.hostname
  return (
    ['0.0.0.0', '127.0.0.1', 'localhost'].includes(hostname) ||
    document.location.hostname.endsWith('local')
  )
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
