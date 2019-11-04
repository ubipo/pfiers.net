<template>
  <div>
    <article class="article-card">
      <h1 class="page-title">Pieter Fiers</h1>
      <Markdown :markdown-url="url"></Markdown>
      <figure>
        <img :src="staticUrl('/content/home.jpg')" />
      </figure>
    </article>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import Markdown from './Markdown.vue'
import StaticUrl from './mixins/StaticUrl'

@Component({
  components: {
    Markdown
  }
})
export default class Home extends mixins(StaticUrl) {
  private url: URL = new URL(document.location.origin + '/content/home.md')
}
</script>

<style lang="scss">
.banner {
  width: 100%;
}
</style>
