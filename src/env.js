/**
 * Sets enviroment info and runtime __webpack_public_path__.
 * 
 * Using no features that need shimming by corejs to keep size down (like "new URL()").
 */

document.body.classList.add('js-enabled')

const distHostname = 'dist.local'
const docLoc = document.location
const isPrerender = window.__isPrerender !== undefined
const isDevMode = BUILD_INFO.mode === 'development'
const prodDistOrigin = document.documentElement.getAttribute('data-proddistorigin')
const isLocalProd = prodDistOrigin == null || prodDistOrigin === ''
const originName = 
  isPrerender ? 'prerender'
  : isDevMode ? 'dev'
  : isLocalProd ? 'localProd': 'prod'
const distBaseUrl = ({
  dev: document.location.origin,
  localProd: docLoc.protocol + '//' + distHostname + ':' + docLoc.port,
  prod: prodDistOrigin,
  prerender: docLoc.protocol + '//' + distHostname + ':8080'
})[originName]
window.__pfiers_dist_base_url = distBaseUrl
window.__pfiers_origin_name = originName
console.log("Setting webpack public path to: " + distBaseUrl)
window.__webpack_public_path__ = distBaseUrl
