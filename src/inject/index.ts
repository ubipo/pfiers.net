import { injectScript, supportsModule, injectUnsupportedBrowserWarning } from './util'
import { toDistUrl } from '@/enviroment/dist'
import { isPrerender } from '@/enviroment'

const botSigs = ['bot', 'crawl', 'spider']
const ua = window.navigator.userAgent
const isBot = botSigs.some(sig => ua.includes(sig))
const isModern = supportsModule()

let info = `inject ${isModern ? 'modern' : 'legacy'}`
if (isBot) info += ' bot'
if (isPrerender) info += ' prerender'
// eslint-disable-next-line no-console
console.info(info)

window.onload = function() {
  if (isModern) {
    injectScript(toDistUrl('/bundle/main.modern.bundle.js'))
  } else {
    injectScript(toDistUrl('/bundle/main.bundle.js'))
    if (!isBot) injectUnsupportedBrowserWarning()
  }
}
