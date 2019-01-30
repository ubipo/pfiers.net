<template>
  <div>
    <Markdown :markdown="mainMd"></Markdown>
    <figure>
      <img src="/content/home.jpg">
    </figure>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { parse } from 'marked';
  import Markdown from './Markdown.vue';

  import * as mainMd from "../../content/home.md";

  @Component({
    data: () => {
      return {
        "mainMd": mainMd
      }
    },
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
