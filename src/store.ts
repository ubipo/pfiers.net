import Vue from 'vue'
import Vuex, { StoreOptions, Store } from 'vuex'
import { RootState } from './types'
import { siteData } from './site-data'
import { buildMode } from './versionInfo'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: {
    siteData
  },
  strict: buildMode === 'Development'
}

export default new Store<RootState>(store)
