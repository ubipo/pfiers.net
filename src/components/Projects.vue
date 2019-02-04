<template>
  <div>
    <h1 class="page-title">Projects</h1>
    <ProjectShort v-for="project in siteData.projects" :key="project.name" :project="project"></ProjectShort>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import ProjectShort from './ProjectShort.vue';
  import { SiteData } from '../siteDataLoader';

  @Component({
    components: {
      ProjectShort
    }
  })
  export default class Projects extends Vue {
    constructor() {
      super();
    }

    @Prop(undefined) siteData!: SiteData;
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
