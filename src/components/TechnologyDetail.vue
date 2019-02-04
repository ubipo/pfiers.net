<template>
  <div>
    <NotFound v-if="technology === null"></NotFound>
    <div v-else>
      <h1 class="page-title">{{technology.name}}</h1>
      <p>{{technology.short}}</p>
      <p>Below are some projects in which I use {{technology.name}}: </p>
      <ProjectShort v-for="project in technology.projects" v-bind:key="project.name" :project="project"></ProjectShort>
    </div>
  </div>
</template>


<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import ProjectShort from './ProjectShort.vue';
  import NotFound from './NotFound.vue';
  import { Technology, SiteData } from '../siteDataLoader';

  @Component({
    components: {
      ProjectShort,
      NotFound
    }
  })
  export default class TechnologyDetail extends Vue {
    constructor() {
      super();
    }

    @Prop(String) technologyName!: string;
    @Prop(undefined) siteData!: SiteData;

    /**
     * @returns {tProject} when found
     * @returns {null} else
     */
    get technology(): Technology | null {
      let technology = this.siteData.technologies.find(e => e.urlSafeName === this.technologyName);
      if (technology === undefined)
        return null;

      return technology;
    }
  }
</script>

