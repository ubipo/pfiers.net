<template>
  <div>
    <div></div>
    <nav>
      <ul class="navlist">
        <li class="navlist__item navlist__item--title">
          <router-link class="navlist__link navlist__link--title" to="/">
            <h1 class="navlist__heading">
              <span v-if="windowWidth > 650">Pieter Fiers</span><span v-else>PF</span>
            </h1>
          </router-link>
        </li>
        <li v-for="(page, index) in pages" :key="index" class="navlist__item">
          <router-link class="navlist__link" :to="`/${page.full}`">
            <span v-if="windowWidth > 650">
              {{ page.full | capitalize }}
            </span>
            <span v-else>
              {{ page.abrv | capitalize }}
            </span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

interface PageName {
  full: string
  abrv: string
}

@Component({
  filters: {
    capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
  }
})
export default class Nav extends Vue {
  constructor() {
    super()
  }

  windowWidth: number = window.innerWidth

  pages: PageName[] = [
    { full: 'projects', abrv: 'proj' },
    { full: 'technologies', abrv: 'tech' }
  ]

  public mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/style.scss';

.navlist {
  margin: 0;
  padding: 0;
  display: flex;
  box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, 0.4);
  position: relative;
}

.navlist__item {
  flex-grow: 1;
  text-align: center;
  list-style: none;
}

.navlist__item--title {
  flex-grow: 0.3;
}

.navlist__link {
  display: block;
  font-family: $title-font-stack;
  font-weight: 500;
  font-size: 2rem;
  text-decoration: none;
  width: 100%;
  height: 100%;
  color: $text-color;
  outline: none;

  padding-bottom: calc(0.5rem + 3px);
  padding-top: 1rem;
  border-bottom: 3px solid $primary-color;

  &:focus,
  &:hover {
    padding-bottom: 0.5rem;
    border-bottom: 5px solid $secondary-color;
  }
}

.router-link-exact-active,
.router-link-active:not(.navlist__link--title) {
  padding-bottom: 0.5rem;
  border-bottom: 5px solid $secondary-color;
}

.navlist__heading {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
}
</style>
