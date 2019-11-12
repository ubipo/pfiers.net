export function isLocalDocument() {
  const hostname = document.location.hostname
  return (
    ['0.0.0.0', '127.0.0.1', 'localhost'].includes(hostname) ||
    document.location.hostname.endsWith('local')
  )
}

export interface OriginDefinition {
  dev: string
  localProd: string
  prod: string
}
