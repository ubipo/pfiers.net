import { RouteConfig, Route } from 'vue-router'

export type DynamicMetaProp<T> = T | ((route: Route) => T)
export interface RouteData {
  title: DynamicMetaProp<string>
  noTitlePostfix?: boolean
  description: DynamicMetaProp<string>
  canonicalUrl?: DynamicMetaProp<URL>
  doNotIndex?: DynamicMetaProp<boolean>
}
export interface CustomRouteConfig extends RouteConfig {
  meta: {
    beforeDataAccess?: (route: Route) => void
    data: RouteData
    parent?: CustomRouteConfig
  }
}
export interface CustomRootRouteConfig extends CustomRouteConfig {
  path: ''
  meta: {
    beforeDataAccess?: (route: Route) => void
    data: RouteData
  }
}
