<template>
  <div>
    <h2 class="page-title">Project {{ $route.params.project }}</h2>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import TechnologyBadges from './TechnologyBadges.vue';
  import { tProject } from '../projectsLoader';

  @Component({
    components: {
      TechnologyBadges
    }
  })
  export default class Projects extends Vue {
    constructor() {
      super();

      let projects: Array<tProject> = (this as any).$root.projects;
      let project = projects.find(e => e.urlSafeName === (this as any).$parent.$route.params.project);
      if (project !== undefined) {
        this.exists = true;
      }

      console.log((this as any).$parent.$route.params.project);
    }

    private exists: boolean = false;
  }
</script>

<style lang="scss" scoped>

</style>
