<template>
  <p v-if="articleTask.last.isRunning">Loading Wikipedia article extract...</p>
  <p v-else-if="articleTask.last.isError">Error loading Wikipedia article extract: {{ articleTask.last.error.message }}</p>
  <blockquote v-else>
    <p class="wiki-extract">
      "{{ articleTask.last.value.extract }}"
    </p>
    <footer>
      <p>
        Extract from
        <cite>
          <a :href="articleTask.last.value.url" class="link">{{ articleTask.last.value.title }}</a>
        </cite>
        on
        <a href="https://en.wikipedia.org/wiki/Main_Page" class="link">Wikipedia</a>
        , 
        <span class="slogan">The Free Encyclopedia</span>
      </p>
    </footer>
  </blockquote>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { useAsyncTask } from 'vue-concurrency'


export default defineComponent({
  props: {
    articleName: {
      type: String,
      required: true
    }
  },
  setup(props, ctx) {
    const articleTask = useAsyncTask(async (signal, articleName: string) => {
      const articleNameEnc = encodeURIComponent(props.articleName)
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${articleNameEnc}`
      const req = new Request(url)
      return fetch(req).then(res => {
        if (!res.ok) throw new Error(`HTTP Error loading ${url}: ${res.statusText}`)
        return res.json()
      }).then(data => {
        const { description, extract, title } = data
        return { 
          description, extract, title,
          url: `https://en.wikipedia.org/wiki/${data.title}`
        }
      })
    })

    const onArticleNameChange = (articleName: string) => {
      articleTask.perform(articleName)
    }
    watch(() => props.articleName, onArticleNameChange)
    onArticleNameChange(props.articleName)

    return { articleTask }
  }
})
</script>

<style lang="scss">
blockquote {
  margin: 1rem 2rem;
}
  
.wiki-extract {
  font-style: italic;
}

.slogan {
  font-style: italic;
}
</style>
