<template>
  <div>
    <div></div>
    <nav>
      <ul class="navlist">
        <li class="navlist__item navlist__item--title">
          <router-link class="navlist__link" to="/">
            <h1 class="navlist__link--title">
              <span v-if="windowWidth > 650">Pieter Fiers</span><span v-else>PF</span>>
            </h1>
          </router-link>
        </li>
        <li class="navlist__item" v-for="(page, index) in pages" v-bind:key="index">
          <router-link class="navlist__link" v-bind:to="page.full">
            <span v-if="windowWidth > 650">
              {{page.full | capitalize }}
            </span>
            <span v-else>
              {{page.abrv | capitalize }}
            </span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  type PageName = {
    full: string,
    abrv: string
  }

  @Component({
    filters: {
      capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
    }
  })
  export default class Nav extends Vue {
    constructor() {
      super();
    }

    windowWidth: number = window.innerWidth;

    pages: Array<PageName> = [
      {full: "technologies", abrv: "tech"},
      {full: "projects", abrv: "proj"}
    ]

    public mounted() {
      console.log("heeye");
      window.onresize = () => {
        this.windowWidth = window.innerWidth;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navlist {
    margin: 0;
    padding: 0;
    display: flex;
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
    font-family: 'Quicksand', sans-serif;
    font-weight: 500;
    font-size: 2rem;
    text-decoration: none;
    width: 100%;
    height: 100%;
    color: hsl(0, 0, 20);
    outline: none;

    padding-bottom: calc(0.5rem + 3px);
    padding-top: 2rem;
    border-bottom: 3px solid hsl(120, 80, 35);

    &:focus, &:hover {
      padding-bottom: 0.5rem;
      border-bottom: 5px solid hsl(190, 80, 30);
    }
  }

  .navlist__link--title {
    margin: 0;
    font-weight: 700;
  }

</style>
