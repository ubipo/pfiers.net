<template>
  <div>
    <h2 class="page-title">Projects</h2>
    <section class="project" v-for="(project, index) in $root.projects" v-bind:key="index">
      <h3 class="project__title">{{project.name}}</h3>
      <p>{{project.short}}</p>
      <router-link v-if="project.longMdUrl !== null" class="navlist__link navlist__link--title" v-bind:to="`/projects/${project.urlSafeName}`">Read more...</router-link>
      <a v-if="project.gitUrl !== null" v-bind:href="project.gitUrl">Git repository</a>
      <TechnologyBadges v-bind:technologies="project.technologies"></TechnologyBadges>
      <figure v-if="project.imgUrl !== null">
        <img v-bind:src="project.imgUrl">
      </figure>
    </section>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import TechnologyBadges from './TechnologyBadges.vue';

  @Component({
    components: {
      TechnologyBadges
    }
  })
  export default class Projects extends Vue {
    constructor() {
      super();
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

.project__title {
  font-size: 2rem;
  margin-bottom: 0.5em;
}

</style>
