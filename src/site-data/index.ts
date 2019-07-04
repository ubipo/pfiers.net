import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { SiteDataState } from './types'
import { RootState } from '../types'

/**
 * Start empty, populate with action later (although reactivity in
 * components doesn't work unless we explicitely assign undefined?)
 */
export const state: SiteDataState = {
  data: undefined,
  error: undefined,
  loading: false
}

const namespaced = true

export const siteData: Module<SiteDataState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
