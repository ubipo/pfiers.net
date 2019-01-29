<template>
  <div>
    <h2> Projects </h2>
    <section v-for="(project, index) in getProjects()" v-bind:key="index">
      <h3>{{project.name}}</h3>
      <p>{{project.short}}</p>
      <object data="/src/res/tech-icons/opencv.svg" type="image/svg+xml"></object>
      <figure>
        <img v-bind:src="project.imgUrl">
      </figure>
    </section>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Project, deserializeProjects } from '../projectsDeserializer.ts';

  @Component
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


</style>
