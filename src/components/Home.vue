<template>
  <div class="card-column">
    <article class="card">
      <div class="card__content">
        <h1 class="page-title">Pieter Fiers</h1>
        <Markdown :markdown-url="contentUrl('@/home.md')"></Markdown>
        <figure>
          <img :src="contentUrl('@/home-md-min.png')" />
        </figure>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import Markdown from './Markdown.vue'
import ContentUrl from './mixins/ContentUrl'

@Component({
  components: {
    Markdown
  }
})
export default class Home extends mixins(ContentUrl) {}
</script>

<style lang="scss">
.banner {
  width: 100%;
}
</style>
