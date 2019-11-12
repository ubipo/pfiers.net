interface OriginDefinition {
  dev: string
  localProd: string
  prod: string
}

export const distOrigins: OriginDefinition = {
  dev: document.location.origin,
  localProd: 'http://dist.local:8000',
  prod: 'https://pieterfiers.net'
}

export const contentOrigins = {
  dev: document.location.origin,
  localProd: 'http://content.local:8000',
  prod: 'https://vc.pieterfiers.net'
}
