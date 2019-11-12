// Polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// @ts-ignore
import Main from './components/Main'
import { infoString } from './enviroment/content'
import { setWebpackPublicPath } from './enviroment/runtime'
import { toDistUrl } from './enviroment/dist'

// eslint-disable-next-line no-console
console.info(infoString())
setWebpackPublicPath(toDistUrl('/'))

window.onunload = () => {} // cache fix

const main = new Main()
main.$mount('#app')
