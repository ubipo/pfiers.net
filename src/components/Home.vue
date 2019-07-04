<template>
  <div>
    <h1 class="page-title">Pieter Fiers</h1>
    <Markdown :markdown-url="url"></Markdown>
    <figure>
      <img src="/content/home.jpg" />
    </figure>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Markdown from './Markdown.vue'

@Component({
  components: {
    Markdown
  }
})
export default class Home extends Vue {
  private url: URL = new URL(document.location.origin + '/content/home.md')
}
</script>

<style lang="scss">
.banner {
  width: 100%;
}
</style>
