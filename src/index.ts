// Polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { infoString, setWebpackPublicPath, toDistUrl } from './enviroment'
import Main from './components/Main'

// eslint-disable-next-line no-console
console.info(infoString())
setWebpackPublicPath(toDistUrl('/'))

window.onunload = () => {} // cache fix

const main = new Main()
main.$mount('#app')
