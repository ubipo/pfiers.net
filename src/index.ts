// Polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { createApp, ref, watch, createSSRApp } from 'vue'

import Main from './ui/components/Main.vue'
import createAppRouter from './router';
import { Content } from './content/types'
import { addToApp as addPredefinedToApp } from './ui/predefinedComponents'
import { getFromDomCache, setToDomCache } from './content/domCache'
import { infoString } from './enviroment'
import { Exception } from './util/exception';

// eslint-disable-next-line no-console
console.info(infoString())

// window.onunload = () => {} // cache fix

const main = async () => {
  const contentFromDomCache = getFromDomCache()
  const contentRef = ref<Content | null>(contentFromDomCache)
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

  const appElem = document.getElementById('app')
  if (appElem === null) throw new Exception("App mount point not found")
  const shouldHydrate = appElem.innerHTML !== '' && false
  if (shouldHydrate) console.info('Hydrating...')
  const mainProps = { contentRef, router }
  const app = shouldHydrate
    ? createSSRApp(Main, mainProps)
    : createApp(Main, mainProps)

  app.use(router)
  addPredefinedToApp(app)
  
  await router.isReady()
  app.mount(appElem, shouldHydrate)  
}

main()
