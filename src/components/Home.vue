<template>
  <div>
    <h1 class="page-title">Pieter Fiers</h1>
    <Markdown markdownUrl="/content/home.md"></Markdown>
    <figure>
      <img src="/content/home.jpg">
    </figure>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Markdown from './Markdown.vue';

  @Component({
    components: {
      Markdown
    }
  })
  export default class Home extends Vue {
    constructor() {
      super();
    }
  }
</script>

<style lang="scss">

.banner {
  width: 100%;
}

</style>
