// Polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// @ts-ignore
import Main from './components/Main'
import { infoString } from './enviroment/content'
import { setWebpackPublicPath } from './enviroment/runtime'
import { toDistUrl } from './enviroment/dist'
import { isPrerender } from './enviroment'
import * as store from './store'


// eslint-disable-next-line no-console
console.info(infoString())
setWebpackPublicPath(toDistUrl('/'))

window.onunload = () => {} // cache fix

// Init store
store.init().then(() => {
  console.log("Store init")
})


const main = new Main()
const shouldHydrate = !isPrerender
main.$mount('#app', shouldHydrate)
