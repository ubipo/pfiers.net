<template>
  <div>
    <div></div>
    <nav>
      <ul class="navlist">
        <li class="navlist__item navlist__item--title">
          <router-link class="navlist__link" to="/"><h1 class="navlist__link--title">Pieter Fiers ></h1></router-link>
        </li>
        <li class="navlist__item" v-for="page in pages" v-bind:key="page">
          <router-link class="navlist__link" v-bind:to="page">{{page | capitalize }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    filters: {
      capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
    }
  })
  export default class Nav extends Vue {
    constructor() {
      super();
    }

    pages: Array<string> = [
      "technologies",
      "projects",
      "personal"
    ]
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
    padding-top: 1rem;
    border-bottom: 3px solid hsl(120, 80, 20);

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
