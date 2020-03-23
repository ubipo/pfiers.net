<template>
  <div>
    <div class="project__header">
      <ProjectTechnologyList class="tech-list tech-list--float" :project="project" />
      <h3 :id="project.urlSafeName" class="project__header__title">{{ project.name }}</h3>
      <ProjectTechnologyList class="tech-list tech-list--under" :project="project" />
      <p>{{ project.short }}</p>
    </div>
    
    <router-link
      v-if="project.longMdUrl"
      :to="`/projects/${project.urlSafeName}`"
      class="button"
    >
      Read more
    </router-link>
    <a v-if="project.siteUrl" :href="project.siteUrl" class="button">Project site</a>
    <a v-if="project.gitUrl" :href="project.gitUrl" class="button">Git repository</a>
    <figure v-if="project.imgUrl !== null">
      <img :src="project.imgUrl" />
    </figure>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ProjectTechnologyList from './ProjectTechnologyList.vue'
import ButtonGroup from './ButtonGroup.vue'
import { Project } from '@/store/site-data/types'

@Component({
  components: {
    ProjectTechnologyList,
    ButtonGroup
  }
})
export default class ProjectShort extends Vue {
  @Prop(undefined) project!: Project
}
</script>

<style lang="scss" scoped>
@import '../style/style.scss';

figure {
  max-width: 100%;
  margin: 0;
}

img {
  max-width: 100%;
}

.project__header {
  // display: flex;
  // justify-content: space-between;
  // align-items: center;

  .project__header__title {
    @include h3-style();
    margin-top: 0.2em;
  }
}


.tech-list--float {
  display: none;
}

.tech-list--under {
  display: block;
}

@media only screen and (min-width: 650px) {
  .tech-list--float {
    display: block;
    float: right;
  }

  .tech-list--under {
    display: none;
  }
}


</style>
