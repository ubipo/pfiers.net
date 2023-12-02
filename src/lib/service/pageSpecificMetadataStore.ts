import { writable } from 'svelte/store';
import { generatePageSpecificTokenData, type PageSpecificTokenData } from './markdown/page';
import type { FetchFn } from './fetchFn';
import type { marked } from 'marked';
import merge from "lodash.merge"


type PagesSpecificTokenData = {
  [routeId: string]: PageSpecificTokenData
}

export const pageSpecificMetadataStore = writable<PagesSpecificTokenData>({});

export function addPageSpecificTokenData(
  routeId: string,
  newData: PageSpecificTokenData
) {
  pageSpecificMetadataStore.update(store => {
    const oldTokenData = store[routeId] || { }
    store[routeId] = merge(oldTokenData, newData)
    return store
  })
}

export async function populatePageSpecificTokenData(
  routeId: string,
  fetchFn: FetchFn,
  tokens: marked.TokensList,
) {
  const newTokenData = await generatePageSpecificTokenData(routeId, fetchFn, tokens)
  addPageSpecificTokenData(routeId, newTokenData)
}
