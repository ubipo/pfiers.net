<template>
  <div>
    <Nav> </Nav>
    <div class="main">
      <main class="main__content">
        <div
          v-if="siteDataLoading || siteDataError !== undefined"
          class="site-data-status"
        >
          <div v-if="siteDataError !== undefined">
            <p class="error-title">
              An error occured while trying to load the site data:
            </p>
            <p class="error-msg">{{ siteDataError }}</p>
          </div>
          <div v-if="siteDataLoading">
            <p>Loading site data...</p>
            <svg xmlns="http://www.w3.org/2000/svg">
              <use href="/static/spinner.svg#spinner"></use>
            </svg>
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
import router from '../router'
import { namespace } from 'vuex-class'
import store from '../store'
import { SiteData } from '../site-data/types'

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
    this.loadSiteData().catch(() => 0)
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

svg {
  stroke: $primary-color;
}

.site-data-status {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
