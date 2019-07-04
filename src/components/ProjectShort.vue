<template>
  <section class="project">
    <h3 :id="project.urlSafeName" class="project__title">{{ project.name }}</h3>
    <p>{{ project.short }}</p>
    <router-link class="read-more" :to="`/projects/${project.urlSafeName}`"
      >Read more></router-link
    >
    <a v-if="project.gitUrl !== null" class="git-repo" :href="project.gitUrl"
      >Git repository></a
    >
    <ProjectTechnologyList
      class="technology-list"
      :project="project"
    ></ProjectTechnologyList>
    <figure v-if="project.imgUrl !== null">
      <img :src="project.imgUrl" />
    </figure>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ProjectTechnologyList from './ProjectTechnologyList.vue'
import { Project } from '../site-data/types'

@Component({
  components: {
    ProjectTechnologyList
  }
})
export default class ProjectShort extends Vue {
  constructor() {
    super()
  }

  @Prop(undefined) project!: Project
}
</script>

<style lang="scss" scoped>
@import '../style/style.scss';

.read-more {
  @include button;
}

.git-repo {
  @include button;
}

figure {
  max-width: 100%;
  margin: 0;
}

img {
  max-width: 100%;
}

.project__title {
  font-size: 1.5rem;
  margin-bottom: 0.5em;
}
</style>
