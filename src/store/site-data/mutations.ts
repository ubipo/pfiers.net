import { MutationTree } from 'vuex'
import { SiteDataState, SiteData } from './types'

export const mutations: MutationTree<SiteDataState> = {
  loadStart(state) {
    state.loading = true
    state.error = undefined
    state.data = undefined
  },
  loadEnd(state, payload: SiteData) {
    state.loading = false
    state.error = undefined
    state.data = payload
  },
  loadError(state, payload) {
    state.loading = false
    state.error = payload
    state.data = undefined
  }
}
