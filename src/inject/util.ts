import unsupportedBrowserWarning from './unsupportedBrowserWarning.html'

export function injectScript(src: URL) {
  const script = document.createElement('script')
  script.src = src.href
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(script)
}

export function supportsModule() {
  var script = document.createElement('script')
  return 'noModule' in script
}

export function injectUnsupportedBrowserWarning() {
  const eUnsupportedBrowserWarning = document.createElement('div')
  eUnsupportedBrowserWarning.innerHTML = unsupportedBrowserWarning
  const body = document.body
  body.insertBefore(eUnsupportedBrowserWarning, body.firstChild)
}
