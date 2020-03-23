<template>
  <div class="card-column">
    <NotFound v-if="!project"></NotFound>
    <article v-else class="card">
      <div class="card__content">
        <h1 class="page-title">{{ project.name }}</h1>
        <p>{{ project.short }}</p>
        <ProjectTechnologyList :project="project"></ProjectTechnologyList>
        <p v-if="project.longMdUrl == undefined" class="not-available-text">
          No detailed description available.
        </p>
        <article v-else>
          <Markdown :markdown-url="project.longMdUrl"></Markdown>
        </article>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ProjectTechnologyList from './ProjectTechnologyList.vue'
import NotFound from './NotFound.vue'
import Markdown from './Markdown.vue'
import { Project } from '@/store/site-data/types'

@Component({
  components: {
    ProjectTechnologyList,
    NotFound,
    Markdown
  }
})
export default class ProjectDetail extends Vue {
  @Prop(Object) project!: Project
}
</script>
