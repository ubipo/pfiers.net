import Vue from 'vue'
import Vuex, { StoreOptions, Store } from 'vuex'
import { siteData } from './site-data'
import { strictMode } from '../enviroment/runtime'
import {parse, stringify} from 'flatted';
import { isPrerender } from '@/enviroment';
import cloneDeepWith from "lodash/cloneDeepWith";
import isString from "lodash/isString";
import { Exception } from '@/util/exception';
import { DistUrl, ContentUrl } from './site-data/types';
import { toDistUrl } from '@/enviroment/dist';
import { toContentUrl } from '@/enviroment/content';
// @ts-ignore

Vue.use(Vuex)

export interface RootState {
  version: string
}

const storeOptions: StoreOptions<RootState> = {
  modules: {
    siteData
  },
  strict: strictMode
}

export const store = new Store<RootState>(storeOptions)

export function init() {
  const eInitialStoreState = document.getElementById('initial-store-state')
  if (eInitialStoreState != null) {
    const initialState = parse(eInitialStoreState.textContent || '', (_, val) => {
      if (isString(val)) {
        const withoutPrefix = val.slice(1)
        if (val.startsWith('s')) {
          return withoutPrefix
        } else if (val.startsWith('u')) {
          return new URL(withoutPrefix)
        } else if (val.startsWith('c')) {
          return toContentUrl(withoutPrefix)
        } else if (val.startsWith('d')) {
          return toDistUrl(withoutPrefix)
        } else {
          throw new Exception('Unknown string prefix while deserializing initial store state')
        }
      }
      return val
    })
    store.replaceState(initialState)
    return
  }

  store.dispatch('siteData/load').then(e => {
    if (isPrerender) {
      const script = document.createElement(`script`)
      script.type = 'application/json'
      script.id = 'initial-store-state'
      const state = cloneDeepWith(store.state, val => {
        if (isString(val)) {
          return `s${val}`
        } else if (val instanceof ContentUrl) {
          return `c${val.pathname + val.search + val.hash}`
        } else if (val instanceof DistUrl) {
          return `d${val.pathname + val.search + val.hash}`
        } else if (val instanceof URL) {
          return `u${val}`
        }
      })
      script.textContent = stringify(state)
      document.head.appendChild(script)
    }
  }).catch(err => {
    console.error(`Error loading site data: ${err}`)
  })
}
