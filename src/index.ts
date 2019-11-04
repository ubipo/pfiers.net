// Polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Main from './components/Main'
import { version, devMode, strictMode } from './runtime-info/buildInfo'

// eslint-disable-next-line no-console
console.info(
  `pieterfiers.net@${version} ${devMode ? 'dev' : ''} ${strictMode ? 'strict' : ''}`
)

window.onunload = () => {} // cache fix

const main = new Main()
main.$mount('#app')
