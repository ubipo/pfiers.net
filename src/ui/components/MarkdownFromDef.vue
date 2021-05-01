<template>
  <template v-if="markdown == null">
    <p v-if="markdownTask.last.isRunning">Loading markdown...</p>
    <p v-else-if="markdownTask.last.isError">Error loading markdown: {{ markdownTask.last.error.message }}</p>
    <Markdown v-else :markdown="markdownTask.last.value" />
  </template>
  <Markdown v-else :markdown="markdown" />
</template>

<script lang="ts">
import Markdown from './Markdown.vue'
import { defineComponent, watch } from "vue";
import { useAsyncTask } from 'vue-concurrency';
import {MarkdownDefinition } from '@/content/types';
import { fetchMarkdown } from '@/markdown/fetch';

export default defineComponent({
  props: {
    definition: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const definition = props.definition as MarkdownDefinition
    const { markdown, fetch } = fetchMarkdown(definition)
    const markdownTask = markdown == null
      ? useAsyncTask(fetch!!)
      : null
    if (markdownTask != null) {
      watch(() => props.definition, () => {
        markdownTask.perform()
      }, { immediate: true })
    }
    return { markdown, markdownTask }
  },
  components: { Markdown }
})
</script>
