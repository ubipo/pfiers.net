<template>
  <div>
    <Nav> </Nav>
    <div class="main">
      <main class="main__content">
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
    text-decoration: none;
    color: hsl(0, 0, 20);
    outline: none;
  }

  h2 {
    font-size: 3rem;
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

  .page-title {
    margin-top: 0;
  }

  figure {
    max-width: 100%;
    margin: 0;
  }

  img {
    max-width: 100%;
  }
</style>
