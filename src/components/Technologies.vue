<template>
  <div>
    <h2 class="page-title">Technologies</h2>
    <TechnologyShort v-for="technology in siteData.technologies" :key="technology.name" :technology="technology"></TechnologyShort>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import TechnologyShort from './TechnologyShort.vue';
  import { SiteData } from '../siteDataLoader';

  @Component({
    components: {
      TechnologyShort
    }
  })
  export default class Technologies extends Vue {
    constructor() {
      super();
    }

    @Prop(undefined) siteData!: SiteData;
  }
</script>

<style lang="scss" scoped>

</style>
