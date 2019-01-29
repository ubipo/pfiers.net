<template>
  <div>
    <h2 class="page-title">Projects</h2>
    <section v-for="(project, index) in getProjects()" v-bind:key="index">
      <h3>{{project.name}}</h3>
      <p>{{project.short}}</p>
      <TechnologyBadges v-bind:technologies="project.technologies"></TechnologyBadges>
      <figure>
        <img v-bind:src="project.imgUrl">
      </figure>
    </section>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import TechnologyBadges from './TechnologyBadges.vue';
  import { Project, deserializeProjects } from '../projectsDeserializer.ts';

  @Component({
    components: {
      TechnologyBadges
    }
  })
  export default class Projects extends Vue {
    constructor() {
      super();
    }

    getProjects(): Array<Project> {
      return deserializeProjects();
    }
  }
</script>

<style lang="scss" scoped>

figure {
  max-width: 100%;
  margin: 0;
}

img {
  max-width: 100%;
}

object {
  background-color: rebeccapurple;
}

</style>
