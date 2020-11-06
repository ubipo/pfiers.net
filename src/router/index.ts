import { Content } from '@/content/types'
import { Ref } from 'vue'
import { createRouter, createWebHistory, RouteLocationNormalized, RouteMeta, RouteRecordRaw } from 'vue-router'
import { asSubRoutes } from './util'
import { SYNC_COMP, ASYNC_COMP } from '@/ui/predefinedComponents'
import setPageMetadata from './handleRouteChange'


const TITLE_POSTFIX = 'pfiers'
const DO_NOT_INDEX = true
const baseUrl = document.location.origin


export class SiteRouteMetaData {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly canonicalUrl: URL,
    readonly noTitlePostfix: boolean = false,
    readonly doNotIndex: boolean = false
  ) {}
}

export interface SiteRouteMeta extends RouteMeta {
  data: (route: RouteLocationNormalized, content?: Content) => SiteRouteMetaData
}

interface ContentRequiredProps {
  componentName: string,
  propsFn: (content: Content) => Record<string, any>,
  metadataUpdateFn: (content: Content) => void
}

function projectByPathParam(content: Content, param: string | string[]) {
  const n = Array.isArray(param) ? param[0] : param
  const technology = content.projects.find(
    p => p.urlSafeName.value === n
  ) || null
  return technology
}

function technologyByPathParam(content: Content, param: string | string[]) {
  const n = Array.isArray(param) ? param[0] : param
  const technology = content.technologies.find(
    p => p.urlSafeName.value === n
  ) || null
  return technology
}

function createRoutes(): RouteRecordRaw[] {
  const projectRoutes = asSubRoutes(
    {
      path: '/projects',
      component: SYNC_COMP.contentRequired.component,
      props: route => (<ContentRequiredProps> {
        componentName: ASYNC_COMP.projects.name,
        propsFn: content => ({ projects: content.projects }),
        metadataUpdateFn: content => setPageMetadata(route, TITLE_POSTFIX, content)
      }),
      meta: <SiteRouteMeta> {
        data: _ => ({
          title: 'Projects',
          description: 'An overview of the projects I liked working on the most.',
          canonicalUrl: new URL(baseUrl + '/projects')
        })
      }
    },
    [
      {
        path: '/:projectName',
        component: SYNC_COMP.contentRequired.component,
        props: route => (<ContentRequiredProps> {
          componentName: SYNC_COMP.dynamicVc.name,
          propsFn: content =>  {
            const project = projectByPathParam(content, route.params.projectName)
            const res = project === null
            ? { component: SYNC_COMP.notFound.name, props: {} }
            : { component: ASYNC_COMP.projectDetail.name, props: { project } }
            return res
          },
          metadataUpdateFn: content => setPageMetadata(route, TITLE_POSTFIX, content)
        }),
        meta: <SiteRouteMeta> {
          data: (route, content) => {
            const urlSafeName = route.params.projectName
            const canonicalUrl = new URL(`${baseUrl}/projects/${urlSafeName}`)
            if (content === undefined) return new SiteRouteMetaData(
              "Unknown project",
              "Unknown project",
              canonicalUrl
            )
            const project = projectByPathParam(content, urlSafeName)
            if (project === null) return new SiteRouteMetaData(
              "Not found",
              "Project could not be found",
              canonicalUrl,
              false,
              DO_NOT_INDEX
            )
            return new SiteRouteMetaData(
              project.name,
              project.description,
              canonicalUrl
            )
          }
        }
      }
    ]
  )
  const technologyRoutes = asSubRoutes(
    {
      path: '/technologies',
      component: SYNC_COMP.contentRequired.component,
      props: route => (<ContentRequiredProps> {
        componentName: ASYNC_COMP.technologies.name,
        propsFn: content => ({ technologies: content.technologies }),
        metadataUpdateFn: content => setPageMetadata(route, TITLE_POSTFIX, content)
      }),
      meta: <SiteRouteMeta> {
        data: _ => ({
          title: 'Technologies',
          description: 'Programming languages, frameworks and everything in between I like using.',
          canonicalUrl: new URL(baseUrl + '/technologies')
        })
      }
    },
    [
      {
        path: '/:technologyName',
        component: SYNC_COMP.contentRequired.component,
        props: route => (<ContentRequiredProps> {
          componentName: SYNC_COMP.dynamicVc.name,
          propsFn: content => {
            const technology = technologyByPathParam(content, route.params.technologyName)
            return technology === null
              ? { component: SYNC_COMP.notFound.name, props: {} }
              : { component: ASYNC_COMP.technologyDetail.name, props: { technology } }
          },
          metadataUpdateFn: content => setPageMetadata(route, TITLE_POSTFIX, content)
        }),
        meta: <SiteRouteMeta> {
          data: (route, content) => {
            const urlSafeName = route.params.technologyName
            const canonicalUrl = new URL(`${baseUrl}/technologies/${urlSafeName}`)
            if (content === undefined) return new SiteRouteMetaData(
              "Unknown technology",
              "Unknown technology",
              canonicalUrl
            )
            const technology = technologyByPathParam(content, urlSafeName)
            if (technology === null) return new SiteRouteMetaData(
              "Not found",
              "Technology could not be found",
              canonicalUrl,
              false,
              DO_NOT_INDEX
            )
            const description = technology.description === null ? technology.name : technology.description
            return new SiteRouteMetaData(
              technology.name,
              description,
              canonicalUrl
            )
          }
        }
      }
    ]
  )

  return [
    ...asSubRoutes(
      {
        path: '',
        component: SYNC_COMP.contentRequired.component,
        props: route => (<ContentRequiredProps> {
          componentName: ASYNC_COMP.home.name,
          propsFn: content => ({ home: content.home }),
          metadataUpdateFn: content => setPageMetadata(route, TITLE_POSTFIX, content)
        }),
        meta: <SiteRouteMeta> {
          data: (_) => ({
            title: 'Pieter Fiers',
            noTitlePostfix: true,
            description:
              "Pieter Fiers's portfolio. All my favorite projects, technologies and more.",
            canonicalUrl: new URL(baseUrl)
          })
        }
      },
      [
        {
          path: '/edit',
          component: SYNC_COMP.contentRequired.component,
          props: _ => (<ContentRequiredProps> {
            componentName: ASYNC_COMP.contentEditor.name,
            propsFn: content => ({ content }),
            metadataUpdateFn: _ => {}
          }),
          meta: <SiteRouteMeta> {
            data: _ => new SiteRouteMetaData(
              'Content editor',
              "Edit the content on this site!",
              new URL(`${baseUrl}/edit`)
            )
          }
        },
        ...projectRoutes,
        ...technologyRoutes
      ]
    ),
    {
      path: '/:pathMatch(.*)*',
      component: SYNC_COMP.notFound.component,
      meta: <SiteRouteMeta> {
        data: route => new SiteRouteMetaData(
          'Not Found',
          'Page could not be found.',
          new URL(route.fullPath),
          false,
          DO_NOT_INDEX
        )
      }
    }
  ]
}

export default function createAppRouter(contentRef: Ref<Content | null>) {
  const router = createRouter({
    routes: createRoutes(),
    history: createWebHistory(),
    // mode: 'history',
    // scrollBehavior: (to, from, savedPosition) =>
    //   savedPosition ? savedPosition : { x: 0, y: 0 }
  })
  
  router.afterEach(to => {
    const content = contentRef.value
    /* setPageMetadata will also get called by
    ContentRequired.vue if it's a content-dependent
    page */
    if (content === null) setPageMetadata(to, TITLE_POSTFIX)
    else setPageMetadata(to, TITLE_POSTFIX, content)
  })
  
  return router
}
