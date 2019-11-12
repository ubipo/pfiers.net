import { toDistUrl } from '../enviroment'
import { injectScript, supportsModule, injectUnsupportedBrowserWarning } from './util'

const botSigs = ['bot', 'crawl', 'spider']
const ua = window.navigator.userAgent
const isBot = botSigs.some(sig => ua.includes(sig))
const isModern = supportsModule()

let info = `inject ${isModern ? 'modern' : 'legacy'}`
if (isBot) info += ' bot'
// eslint-disable-next-line no-console
console.info(info)

window.onload = function() {
  if (isModern) {
    injectScript(toDistUrl('/dist/main.modern.bundle.js'))
  } else {
    injectScript(toDistUrl('/dist/main.bundle.js'))
    if (!isBot) injectUnsupportedBrowserWarning()
  }
}
