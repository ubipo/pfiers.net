<template>
  <div class="nav-cont">
    <div class="nav-cont__buffer"></div>
    <nav class="nav-cont__content">
      <ul class="navlist">
        <li class="navlist__item navlist__item--title" :class="{'navlist__item--active': subIsActiveExact('/')}">
          <router-link class="navlist__link navlist__link--title" to="/">
            <h1 class="navlist__heading">
              <span class="navlist__txt navlist__txt--full">Pieter Fiers</span>
              <span class="navlist__txt navlist__txt--abrv">PF</span>
            </h1>
          </router-link>
        </li>
        <li v-for="(page, index) in pages" :key="index" class="navlist__item" :class="{'navlist__item--active': subIsActive(`/${page.full}`)}">
          <router-link class="navlist__link" :to="`/${page.full}`">
            <span class="navlist__txt navlist__txt--full">{{ page.full | capitalize }}</span>
            <span class="navlist__txt navlist__txt--abrv">{{ page.abrv | capitalize }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="nav-cont__buffer"></div>
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

  pages: PageName[] = [
    { full: 'projects', abrv: 'proj' },
    { full: 'technologies', abrv: 'tech' }
  ]

  public subIsActive(input: string) {
    const paths = Array.isArray(input) ? input : [input];
    
    return paths.some(path => {
    	return this.$route.path.startsWith(path) // current path starts with this path string
    })
  }

  public subIsActiveExact(input: string) {
    const paths = Array.isArray(input) ? input : [input];
    
    return paths.some(path => {
      return this.$route.path === path // current path starts with this path string
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../style/style.scss';

.nav-cont {
  display: flex;
  justify-content: center;
}

.nav-cont__content {
  flex-grow: 1;
  width: 100%;
  max-width: 70rem;
}

// To cover box shadow on side
.nav-cont__buffer {
  flex-grow: 1;
  background-color: #fff;
  z-index: 10;
}


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
  // flex-grow: 0.3;
}

.navlist__item--active {
  flex-grow: 2;
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
    border-bottom: 3px solid $secondary-color;
  }
}

.router-link-exact-active,
.router-link-active:not(.navlist__link--title) {
  padding-bottom: 0.5rem !important;
  border-bottom: 5px solid $secondary-color !important;
  color: $secondary-color;

  h1 {
    color: $secondary-color; // Overrides general h1 color
  }
}

.navlist__txt--full {
  display: none;
}

.navlist__txt--abrv {
  display: inline;
}

@media only screen and (min-width: 650px) {
  .navlist__txt--full {
    display: inline;
  }

  .navlist__txt--abrv {
    display: none;
  }
}

.navlist__heading {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
}
</style>
