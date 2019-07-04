import { ActionTree } from 'vuex'
import { SiteDataState } from './types'
import { RootState } from '../types'
import load from './load'

export const actions: ActionTree<SiteDataState, RootState> = {
  load({ commit }) {
    commit('loadStart')
    return new Promise<null>((resolve, reject) => {
      load().then(
        siteData => {
          commit('loadEnd', siteData)
          resolve(null)
        },
        err => {
          commit('loadError', err.message)
          reject(err)
        }
      )
    })
  }
}
