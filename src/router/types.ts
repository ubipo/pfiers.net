import { Component } from 'vue';
import { RouteRecordRaw } from 'vue-router'


// export type DynamicMetaProp<T> = T | ((route: Route) => T)
// export interface RouteData {
//   title: DynamicMetaProp<string>
//   noTitlePostfix?: boolean
//   description: DynamicMetaProp<string>
//   canonicalUrl?: DynamicMetaProp<URL>
//   doNotIndex?: DynamicMetaProp<boolean>
// }

export interface SubroutesRecord {
  pathSegment: string
  name: string
  component: Component | (() => Promise<Component>)
  subroutes?: SubroutesRecord[]
  // meta: {
  //   beforeDataAccess?: (route: Route) => void
  //   data: RouteData
  //   parent?: CustomRouteConfig
  // }
}

// export interface CustomRootRouteConfig {
//   path: ''
//   meta: {
//     beforeDataAccess?: (route: Route) => void
//     data: RouteData
//   }
// }
