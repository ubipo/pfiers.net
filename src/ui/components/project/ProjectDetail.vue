<template>
  <div class="card-column">
    <!-- <NotFound v-if="!project"></NotFound> -->
    <article class="card">
      <div class="card__content">
        <h1 class="page-title">{{ p.project.name }}</h1>
        <p v-if="p.project.short === null">{{ p.project.description }}</p>
        <MarkdownFromDef v-else :definition="p.project.short"></MarkdownFromDef>
        <ProjectTechnologyList :project="p.project"></ProjectTechnologyList>
        <br>
        <a v-if="p.project.siteUrl" :href="p.project.siteUrl" class="button">Project site</a>
        <a v-if="p.project.gitUrl" :href="p.project.gitUrl" class="button">Git repository</a>
        <p v-if="p.project.long === null" class="not-available-text">
          No detailed description available.
        </p>
        <article v-else>
          <MarkdownFromDef :definition="p.project.long"></MarkdownFromDef>
        </article>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import MarkdownFromDef from '../MarkdownFromDef.vue'
import ProjectTechnologyList from './ProjectTechnologyList.vue'
import { Project } from '@/content/types'
import { defineComponent } from 'vue'


export default defineComponent({
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    return { p: props }
  },
  components: { ProjectTechnologyList, MarkdownFromDef }
})

</script>
