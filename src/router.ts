import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'
import Home from './components/Home.vue'
import Projects from './components/Projects.vue'
import Technologies from './components/Technologies.vue'
import NotFound from './components/NotFound.vue'
import ProjectDetail from './components/ProjectDetail.vue'
import TechnologyDetail from './components/TechnologyDetail.vue'
import store from './store'

Vue.use(VueRouter)

type dynamicMetaField = string | ((route: Route) => string)
interface CustomRouteConfig extends RouteConfig {
  meta?: {
    title?: dynamicMetaField
    description?: dynamicMetaField
  }
}

const titlePostfix = 'Pieter Fiers'

const routes: CustomRouteConfig[] = [
  {
    path: '/',
    component: Home,
    meta: {
      title: 'Home',
      description: "Pieter Fiers's portfolio."
    }
  },
  {
    path: '/projects',
    component: Projects,
    meta: {
      title: 'Projects',
      description: "Pieter Fiers's portfolio."
    }
  },
  {
    path: '/projects/:projectName',
    component: ProjectDetail,
    props: route => ({
      project: store.getters['siteData/projectByUrlSafeName'](route.params.projectName)
    }),
    meta: {
      title: route => {
        return route.params.projectName
      },
      description: "Pieter Fiers's portfolio."
    }
  },
  {
    path: '/technologies',
    component: Technologies,
    meta: {
      title: 'Technologies'
    }
  },
  {
    path: '/technologies/:technologyName',
    component: TechnologyDetail,
    props: route => ({
      technology: store.getters['siteData/technologyByUrlSafeName'](
        route.params.technologyName
      )
    }),
    meta: {
      title: route => {
        return route.params.technologyName
      },
      description: "Pieter Fiers's portfolio."
    }
  },
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title)
  const nearestWithDescription = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.description)

  let title = titlePostfix // Default
  if (nearestWithTitle !== undefined) {
    let pageTitle = nearestWithTitle.meta.title
    if (pageTitle instanceof Function) pageTitle = pageTitle(to)
    title = `${pageTitle} | ${titlePostfix}`
  }
  document.title = title

  if (nearestWithDescription !== undefined) {
    let eDescription = document.querySelector('meta[name="description"]')
    if (eDescription == null) {
      eDescription = document.createElement('meta')
      eDescription.setAttribute('name', 'description')
      document.head.append(eDescription)
    }
    eDescription.setAttribute('content', nearestWithDescription.meta.description)
  }

  next()
})

export default router
