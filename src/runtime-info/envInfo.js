const isLocal = ['0.0.0.0', '127.0.0.1', 'localhost'].includes(document.location.hostname)
const isTestLocal = document.location.hostname === 'testlocal.pieterfiers.net'
const staticHost = isLocal ? document.location.host : 'vc.pieterfiers.net'
const staticHostProtocol = isTestLocal ? 'http' : 'https:'
const staticHostPort = isTestLocal ? 8000 : 443

/**
 * 
 * @param {URL | string} url 
 * 
 * @returns {URL}
 */
function toStaticHostUrl(url) {
  const urlObj = new URL(url, document.location)

  if ((!isLocal || isTestLocal) && ['http:', 'https:'].includes(urlObj.protocol)) {
    urlObj.host = staticHost
    urlObj.protocol = staticHostProtocol
    urlObj.port = staticHostPort
  }

  return urlObj
}

export { isLocal, staticHost, staticHostProtocol, staticHostPort, toStaticHostUrl }