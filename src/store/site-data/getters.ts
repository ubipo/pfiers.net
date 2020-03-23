import { GetterTree } from 'vuex'
import { SiteDataState, SiteData } from './types'
import { NoSiteDataException } from './exceptions'
import { RootState } from '..'

export const getters: GetterTree<SiteDataState, RootState> = {
  data(state): SiteData | undefined {
    return state.data
  },
  error(state): string | undefined {
    return state.error
  },
  loading(state): boolean {
    return state.loading
  },
  projectByUrlSafeName(state) {
    return (name: string) => {
      if (state.data === undefined) throw new NoSiteDataException()
      return state.data.projects.find(e => e.urlSafeName === name)
    }
  },
  technologyByUrlSafeName(state) {
    return (name: string) => {
      if (state.data === undefined) throw new NoSiteDataException()
      return state.data.technologies.find(e => e.urlSafeName === name)
    }
  }
}
