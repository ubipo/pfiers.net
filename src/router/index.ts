import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { asSubroute } from './util'
import { CustomRouteConfig } from './types'
import handleRouteChange from './handleRouteChange'

Vue.use(VueRouter)

const baseUrl = document.location.origin

const routes: CustomRouteConfig[] = [
  ...asSubroute(
    '',
    {
      path: '',
      component: () =>
        import(/* webpackChunkName: "vue-home" */ '../components/Home.vue'),
      meta: {
        data: {
          title: 'Pieter Fiers',
          description:
            "Pieter Fiers's portfolio. All my favorite projects, technologies and more.",
          canonicalUrl: new URL(baseUrl)
        }
      }
    },
    [
      ...asSubroute(
        '/projects',
        {
          path: '',
          component: () =>
            import(/* webpackChunkName: "vue-projects" */ '../components/Projects.vue'),
          meta: {
            data: {
              title: 'Projects',
              description: 'An overview of the projects I liked working on the most.',
              canonicalUrl: new URL(baseUrl + '/projects')
            }
          }
        },
        [
          {
            path: '/:projectName',
            component: () =>
              import(
                /* webpackChunkName: "vue-project-detail" */ '../components/ProjectDetail.vue'
              ),
            props: route => ({
              project: store.getters['siteData/projectByUrlSafeName'](
                route.params.projectName
              )
            }),
            meta: {
              beforeDataAccess: route => {
                route.meta.project = store.getters['siteData/projectByUrlSafeName'](
                  route.params.projectName
                )
              },
              data: {
                title: route => route.meta.project.name,
                description: route => route.meta.project.short,
                canonicalUrl: route =>
                  new URL(baseUrl + '/projects/' + route.params.projectName)
              }
            }
          }
        ]
      ),
      ...asSubroute(
        '/technologies',
        {
          path: '',
          component: () =>
            import(
              /* webpackChunkName: "vue-technologies" */ '../components/Technologies.vue'
            ),
          meta: {
            data: {
              title: 'Technologies',
              description:
                'Programming languages, frameworks and everything in between I like using.',
              canonicalUrl: new URL(baseUrl + '/technologies')
            }
          }
        },
        [
          {
            path: '/:technologyName',
            component: () =>
              import(
                /* webpackChunkName: "vue-technology-detail" */ '../components/TechnologyDetail.vue'
              ),
            props: route => ({
              technology: store.getters['siteData/technologyByUrlSafeName'](
                route.params.technologyName
              )
            }),
            meta: {
              beforeDataAccess: route => {
                route.meta.technology = store.getters['siteData/technologyByUrlSafeName'](
                  route.params.technologyName
                )
              },
              data: {
                title: route => route.meta.technology.name,
                description: route => route.meta.technology.short,
                canonicalUrl: route =>
                  new URL(baseUrl + '/technologies/' + route.params.technologyName)
              }
            }
          }
        ]
      )
    ]
  ),
  {
    path: '*',
    component: () =>
      import(/* webpackChunkName: "vue-not-found" */ '../components/NotFound.vue'),
    meta: {
      data: {
        title: 'Not Found',
        description: 'This page could not be found.',
        canonicalUrl: undefined,
        doNotIndex: true
      }
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) =>
    savedPosition ? savedPosition : { x: 0, y: 0 }
})

router.afterEach(to => {
  if (store.getters['siteData/data'] != undefined) {
    handleRouteChange(to)
  } else {
    store.watch(
      (state, getters) => getters['siteData/data'],
      newValue => {
        if (newValue != undefined) handleRouteChange(router.currentRoute)
      }
    )
  }
})

export default router
