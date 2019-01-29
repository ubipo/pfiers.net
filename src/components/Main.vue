<template>
  <div>
    <Nav> </Nav>
    <div class="h-center">
      <main class="main">
        <router-view></router-view>
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

  (Vue as any).use(VueRouter); // Because Vue.use() doesn't exist?

  const routes = [
    { path: '/', component: Home },
    { path: '/projects', component: Projects },
    { path: '/technologies', component: Technologies },
    { path: '*', component: NotFound }
  ]

  const router = new VueRouter({
    routes,
    mode: 'history'
  })

  @Component({
    router,
    components: {
      Nav,
      Projects,
      Technologies
    }
  })
  export default class Main extends Vue {
    constructor() {
      super();
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400');

  p {
    font-family: 'Open Sans', sans-serif;
    color: hsl(0, 0, 20);
  }

  h1, h2, h3 {
    font-family: 'Quicksand', sans-serif;
    font-weight: 400;
    font-size: 2rem;
    text-decoration: none;
    color: hsl(0, 0, 20);
    outline: none;
  }

  .main {
    margin-top: 2rem;
    max-width: 60rem;
    width: 100%;
  }

  .h-center {
    display: flex;
    justify-content: center;
  }
</style>
