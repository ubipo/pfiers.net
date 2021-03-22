<template>
  <p v-if="markdownTask.last.isRunning">Loading markdown...</p>
  <p v-else-if="markdownTask.last.isError">Error loading markdown: {{ markdownTask.last.error.message }}</p>
  <Markdown v-else :markdown="markdownTask.last.value" ></Markdown>
</template>

<script lang="ts">
import Markdown from './Markdown.vue'
import { computed, defineComponent, ref, watch } from "vue";
import { useAsyncTask, useTask } from 'vue-concurrency';
import { Content, Home, MarkdownDefinition } from '@/content/types';
import { fetchMarkdown } from '@/markdown/fetch';


export default defineComponent({
  props: {
    definition: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const markdownTask = useAsyncTask(async () => {
      const definition = props.definition as MarkdownDefinition
      let markdown: string
      try {
        markdown = await fetchMarkdown(definition)
      } catch (error) {
        console.error(error)
        throw error
      }
      ctx.emit('ready')
      return markdown
    })
    watch(() => props.definition, () => {
      markdownTask.perform()
    })
    markdownTask.perform()
    return { markdownTask }
  },
  components: { Markdown }
})
</script>
