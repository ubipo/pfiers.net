<template>
  <section class="project">
    <h3 class="project__title" :id="project.urlSafeName">{{project.name}}</h3>
    <p>{{project.short}}</p>
    <router-link class="read-more" v-bind:to="`/projects/${project.urlSafeName}`">Read more></router-link>
    <a class="git-repo" v-if="project.gitUrl !== null" :href="project.gitUrl">Git repository></a>
    <ProjectTechnologyList class="technology-list" :project="project"></ProjectTechnologyList>
    <figure v-if="project.imgUrl !== null">
      <img v-bind:src="project.imgUrl">
    </figure>
  </section>
</template>


<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import ProjectTechnologyList from './ProjectTechnologyList.vue';
  import { Project } from '../siteDataLoader';

  @Component({
    components: {
      ProjectTechnologyList
    }
  })
  export default class ProjectShort extends Vue {
    constructor() {
      super();
    }

    @Prop(undefined) project!: Project;
  }
</script>


<style lang="scss" scoped>
@import '../style.scss';

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
