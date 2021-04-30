// Polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { createApp, ref, watch } from 'vue'

import Main from './ui/components/Main.vue'
import { setWebpackPublicPath } from './enviroment/webpack'
import createAppRouter from './router';
import { Content } from './content/types'
import { addToApp as addPredefinedToApp } from './ui/predefinedComponents'
import { toUrl } from './url'
import { setToDomCache } from './content/domCache'
import { infoString, isProd } from './enviroment'
import { Exception } from './util/exception';

// eslint-disable-next-line no-console
console.info(infoString())

window.onunload = () => {} // cache fix

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
const appElem = document.getElementById('app')
if (appElem === null) throw new Exception("App mount point not found")
const shouldHydrate = appElem.innerHTML === ''
app.mount(appElem, shouldHydrate)
