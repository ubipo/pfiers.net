import Vue from 'vue'
import Vuex, { StoreOptions, Store } from 'vuex'
import { RootState } from './types'
import { siteData } from './site-data'
import { strictMode } from './enviroment/runtime'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: {
    siteData
  },
  strict: strictMode
}

export default new Store<RootState>(store)
