import { App, defineAsyncComponent } from 'vue'
import NotFound from '@/ui/components/NotFound.vue'
import DynamicVc from '@/ui/components/util/DynamicVc.vue'
import ContentRequired from '@/ui/components/util/ContentRequired.vue'
import ResponsiveImage from '@/ui/components/util/ResponsiveImage.vue'


export const SYNC_COMP = {
  notFound: {
    name: 'not-found',
    component: NotFound
  },
  dynamicVc: {
    name: 'dynamic-vc',
    component: DynamicVc
  },
  responsiveImage: {
    name: 'ResponsiveImage',
    component: ResponsiveImage
  },
  contentRequired: {
    name: 'content-required',
    component: ContentRequired
  }
}

export const ASYNC_COMP = {
  home: {
    name: 'home',
    component: async () => {
      // const delay = 5000
      // console.log(`Delaying import of home chunk ${delay}...`)
      // await new Promise(resolve => window.setTimeout(resolve, delay))
      // console.log(`Loading home chunk...`)
      return await import(/* webpackChunkName: "vue-home" */ '@/ui/components/Home.vue')
    },
  },
  contentEditor: {
    name: 'contentEditor',
    component: () => import(/* webpackChunkName: "vue-content-editor" */ '@/ui/components/ContentEditor.vue'),
  },
  donate: {
    name: 'donate',
    component: () => import(/* webpackChunkName: "vue-donate" */ '@/ui/components/Donate.vue'),
  },
  projects: {
    name: 'projects',
    component: () => import(/* webpackChunkName: "vue-projects" */ '@/ui/components/project/Projects.vue'),
  },
  projectDetail: {
    name: 'project-detail',
    component: () => import(/* webpackChunkName: "vue-project-detail" */ '@/ui/components/project/ProjectDetail.vue'),
  },
  technologies: {
    name: 'technologies',
    component: () => import(/* webpackChunkName: "vue-technologies" */ '@/ui/components/technology/Technologies.vue'),
  },
  technologyDetail: {
    name: 'technology-detail',
    component: () => import(/* webpackChunkName: "vue-technology-detail" */ '@/ui/components/technology/TechnologyDetail.vue'),
  }
}

export function addToApp(app: App) {
  for (const componentDef of Object.values(SYNC_COMP)) {
    app.component(componentDef.name, componentDef.component)
  }
  for (const componentDef of Object.values(ASYNC_COMP)) {
    app.component(componentDef.name, defineAsyncComponent(componentDef.component as any))
  }
}
