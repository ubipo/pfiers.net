// Polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { createApp, ref, watch } from 'vue'

import Main from './ui/components/Main.vue'
import { infoString } from './enviroment/content'
import { setWebpackPublicPath } from './enviroment/runtime'
import createAppRouter from './router';
import { Content } from './content/types'
import { addToApp as addPredefinedToApp } from './ui/predefinedComponents'
import { toUrl } from './url'
import { setToDomCache } from './content/domCache'
import { isPrerender, isProd } from './enviroment'

// eslint-disable-next-line no-console
console.info(infoString())
setWebpackPublicPath(toUrl('d:/'))

window.onunload = () => {} // cache fix

// Init store
// store.init().then(() => {
//   console.log("Store init")
// })

const contentRef = ref<Content | null>(null)
watch(contentRef, content => {
  if (content !== null) {
    watch(content, _ => {
      setToDomCache(content)
    }, {
      deep: true,
      immediate: true
    })
  }
})
const router = createAppRouter(contentRef)
const app = createApp(Main, { contentRef, router })
app.use(router)
addPredefinedToApp(app)
const shouldHydrate = isProd
console.log("Hydrating")
app.mount('#app', shouldHydrate)

// const main = new main()
// const shouldHydrate = !isPrerender
// main.$mount('#app', shouldHydrate)
