<template>
  <div class="card-column">
    <NotFound v-if="technology === null"></NotFound>
    <article v-else class="card">
      <div class="card__content">
        <h1 class="page-title">{{ technology.name }}</h1>
        <p>{{ technology.short }}</p>
        <p>Below are some projects in which I use {{ technology.name }}:</p>
        <ProjectShort
          v-for="project in technology.projects"
          :key="project.name"
          :project="project"
        ></ProjectShort>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ProjectShort from './ProjectShort.vue'
import NotFound from './NotFound.vue'
import { Technology } from '@/store/site-data/types'

@Component({
  components: {
    ProjectShort,
    NotFound
  }
})
export default class TechnologyDetail extends Vue {
  @Prop(Object) technology!: Technology
}
</script>
