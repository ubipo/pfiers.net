<template>
  <div>
    <NotFound v-if="project === null"></NotFound>
    <div v-else>
      <h1>{{project.name}}</h1>
      <p>{{project.short}}</p>
      <ProjectTechnologyList :project="project"></ProjectTechnologyList>
      <p v-if="project.longMdUrl === null">No detailed description available.</p>
      <article v-else>
        <Markdown :markdownUrl="project.longMdUrl"></Markdown>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import ProjectTechnologyList from './ProjectTechnologyList.vue';
  import NotFound from './NotFound.vue';
  import Markdown from './Markdown.vue';
  import { SiteData, Project } from '../siteDataLoader';

  @Component({
    components: {
      ProjectTechnologyList,
      NotFound,
      Markdown
    }
  })
  export default class ProjectDetail extends Vue {
    constructor() {
      super();
    }

    @Prop(String) projectName!: string;
    @Prop(undefined) siteData!: SiteData;

    /**
     * @returns {tProject} when found
     * @returns {null} else
     */
    get project(): Project | null {
      let project = this.siteData.projects.find(e => e.urlSafeName === this.projectName);
      if (project === undefined)
        return null;

      return project;
    }
  }
</script>

<style lang="scss" scoped>

</style>
