<template>
  <div id="app" class="page-wrapper">
    <Nav />
    <div class="main">
      <main class="main__content">
        <div
          v-if="siteDataLoading || siteDataError != undefined"
          class="site-data-status"
        >
          <div v-if="siteDataError != undefined" class="error-msg">
            <p class="error-msg__title">
              An error occured while trying to load the site data:
            </p>
            <p class="error-msg__text">{{ siteDataError }}</p>
          </div>
          <div v-if="siteDataLoading" class="loading-msg">
            <p class="loading-msg__text">Loading site data...</p>
            <div class="loading-msg__spinner"><div></div></div>
          </div>
        </div>
        <router-view v-else></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Nav from './Nav.vue'
import router from '@/router'
import { namespace } from 'vuex-class'
import { store } from '@/store'
import { SiteData } from '@/store/site-data/types'

const ns = namespace('siteData')

@Component({
  router,
  store,
  components: {
    Nav
  }
})
export default class Main extends Vue {
  @ns.Getter('data') siteData!: SiteData | undefined
  @ns.Getter('error') siteDataError!: string | undefined
  @ns.Getter('loading') siteDataLoading!: boolean
  @ns.Action('load') loadSiteData!: () => Promise<null>

  public created() {
    // this.loadSiteData().catch(() => 0).then(e => {
    //   document.dispatchEvent(new Event('app-loaded'))
    // })
  }
  
  sdlStatus = {
    loaded: false,
    err: null
  }
}
</script>

<style lang="scss">
@import '../style/main.scss';
@import '../style/style.scss';
@import '../style/spinner.scss';

p {
  font-family: $text-font-stack;
  color: $text-color;
}

h1,
h2,
h3 {
  font-family: 'Quicksand', sans-serif;
  font-weight: 400;
  text-decoration: none;
  color: $text-color;
  outline: none;
}

.page-wrapper {
  height: 100%;
  display: flex;
  flex-flow: column;
}

.main {
  display: flex;
  justify-content: center;
  background-image: url('/content/bg.png');
  background-color: hsl(0, 0, 95%);
  background-size: 100vw;
  flex-grow: 1;
}

.main__content {
  margin: 1rem 0.5rem 2rem 0.5rem;
  width: 100%;
}

@media only screen and (min-width: 650px) {
  .main__content {
    margin: 4rem 14rem 10rem 14rem;
  }
}

figure {
  max-width: 100%;
  margin: 0;
}

img {
  max-width: 100%;
}

.site-data-status {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-msg__text {
  text-align: center;
}

.loading-msg__spinner {
  @include spinner('loading-msg__spinner--animation', $primary-color);
}
</style>
