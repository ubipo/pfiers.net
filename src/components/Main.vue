<template>
  <div>
    <Nav> </Nav>
    <div class="main">
      <main class="main__content">
        <div v-if="sdlStatus.err !== null">
          <p class="error-title">An error occured while trying to load the site data: </p>
          <p class="error-msg">{{sdlStatus.err}}</p>
        </div>
        <p v-else-if="!sdlStatus.loaded">Loading...</p>
        <router-view v-else></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import VueRouter from 'vue-router';
  import Nav from  './Nav.vue';
  import Home from './Home.vue';
  import Projects from  './Projects.vue';
  import Technologies from  './Technologies.vue';
  import NotFound from './NotFound.vue';
  import ProjectDetail from './ProjectDetail.vue';
  import * as siteDataLoader from '../siteDataLoader';
import TechnologyDetail from './TechnologyDetail.vue';

  (Vue as any).use(VueRouter); // Because Vue.use() doesn't exist?

  let sdl = new siteDataLoader.SiteDataLoader();

  function siteDataSafeGetter() {
    if (sdl.data === null)
      throw new Error("This error shouldn't occure");
    
    return {
      siteData: sdl.data
    };
  }

  const routes = [
    {path: '/', component: Home},
    {path: '/projects', component: Projects, props: siteDataSafeGetter},
    {path: '/projects/:projectName', component: ProjectDetail, props: (route: any) => ({siteData: siteDataSafeGetter().siteData, projectName: route.params.projectName})},
    {path: '/technologies', component: Technologies, props: siteDataSafeGetter},
    {path: '/technologies/:technologyName', component: TechnologyDetail, props: (route: any) => ({siteData: siteDataSafeGetter().siteData, technologyName: route.params.technologyName})},
    {path: '*', component: NotFound}
  ]

  type SiteDataStatus = {
    loaded: boolean,
    err: null | string
  }

  const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior (to: any, from: any, savedPosition: any) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })

  @Component({
    router,
    components: {
      Nav
    }
  })
  export default class Main extends Vue {
    constructor() {
      super();

      sdl.load().then(() => {
        this.sdlStatus.loaded = true;
      }).catch(err => {
        console.error(err);
        this.sdlStatus.err = err;
      });
    }

    sdlStatus = {
      loaded: false,
      err: null
    };
  }
</script>

<style lang="scss">
  @import '../main.scss';
  @import '../style.scss';

  p {
    font-family: $text-font-stack;
    color: $text-color;
  }

  h1, h2, h3 {
    font-family: 'Quicksand', sans-serif;
    font-weight: 400;
    text-decoration: none;
    color: $text-color;
    outline: none;
  }

  .main {
    display: flex;
    justify-content: center;
  }

  .main__content {
    margin-top: 0.5rem;
    padding: 1rem;
    max-width: 60rem;
    width: 100%;
  }

  @media only screen and (min-width: 650px) {
    .main__content {
      margin-top: 2rem;
    }
  }

  figure {
    max-width: 100%;
    margin: 0;
  }

  img {
    max-width: 100%;
  }
</style>
