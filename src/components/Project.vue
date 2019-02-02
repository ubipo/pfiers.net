<template>
  <div>
    <p v-if="projectData.err !== null">{{projectData.err}}</p>
    <p v-else-if="project === undefined">Long...</p>
    <NotFound v-else-if="project === null"></NotFound>
    <article v-else-if="project.longMdUrl !== null">
      <TechnologyBadges v-bind:technologies="project.technologies"></TechnologyBadges>
      <Markdown v-bind:markdownUrl="project.longMdUrl"></Markdown>
    </article>
    <p v-else>{{project.name}} doesn't have a detailed description yet.</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import TechnologyBadges from './TechnologyBadges.vue';
  import NotFound from './NotFound.vue';
  import Markdown from './Markdown.vue';
  import { tProject } from '../projectsLoader';

  @Component({
    components: {
      TechnologyBadges,
      NotFound,
      Markdown
    }
  })
  export default class Project extends Vue {
    constructor() {
      super();
    }

    private projectData = (this as any).$root.projectsData;

    /**
     * @returns {tProject} when found
     * @returns {undefined} when no projects have yet been loaded
     * @returns {null} when the project hasn't been found
     */
    get project(): tProject | undefined | null {
      let projects: Array<tProject> | null = (this as any).$root.projectsData.projects;
      if (projects === null) 
        return undefined;

      let projectName = (this as any).$parent.$route.params.project;
      let project = projects.find(e => e.urlSafeName === projectName);
      if (project === undefined)
        return null;

      return project;
    }
  }
</script>

<style lang="scss" scoped>

</style>
