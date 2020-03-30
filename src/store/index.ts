import Vue from 'vue'
import Vuex, { StoreOptions, Store } from 'vuex'
import { siteData } from './site-data'
import { strictMode } from '../enviroment/runtime'
import {parse, stringify} from 'flatted';
import { isPrerender } from '@/enviroment';
import cloneDeepWith from "lodash/cloneDeepWith";
import isString from "lodash/isString";
import { Exception } from '@/util/exception';
import { isTaggedUrl } from './site-data/types';
import { toDistUrl } from '@/enviroment/dist';
import { toContentUrl } from '@/enviroment/content';
import { toUrl } from '@/util/url';
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

export async function init() {
  const eInitialStoreState = document.getElementById('initial-store-state')
  if (eInitialStoreState != null) {
    const initialState = parse(eInitialStoreState.textContent || '', (_, val) => {
      if (isString(val)) {
        const withoutPrefix = val.slice(1)
        if (val.startsWith('s')) {
          return withoutPrefix
        } else if (val.startsWith('u')) {
          return toUrl(withoutPrefix)
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

  try {
    await store.dispatch('siteData/load')
  } catch (err) {
    console.error(`Error loading site data: ${err}`)
    throw err
  }
  
  if (isPrerender) {
    const script = document.createElement(`script`)
    script.type = 'application/json'
    script.id = 'initial-store-state'
    const state = cloneDeepWith(store.state, val => {
      if (isString(val)) {
        return `s${val}`
      } else if (val instanceof URL) {
        const fullPath = val.pathname + val.search + val.hash
        if (isTaggedUrl(val)) {
          if (val.isContentUrl) {
            return `c${fullPath}`
          } else if (val.isDistUrl) {
            return `d${fullPath}`
          }
        }
        return `u${val.href}`
      }
    })
    script.textContent = stringify(state)
    document.head.appendChild(script)
  }
}
