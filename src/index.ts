// Polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Main from './components/Main'
import { version, buildMode } from './versionInfo'

console.info(`piterfiers.net@${version} ${buildMode}`) // eslint-disable-line no-console

Object.assign({}, {})
const main = new Main()

window.addEventListener('load', () => {
  main.$mount('#app')
})
