<template>
  <div>
    <h1 class="page-title">Projects</h1>
    <ProjectShort
      v-for="project in siteData.projects"
      :key="project.name"
      :project="project"
    ></ProjectShort>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ProjectShort from './ProjectShort.vue'
import { SiteData } from '../site-data/types'
import { namespace } from 'vuex-class'

const ns = namespace('siteData')

@Component({
  components: {
    ProjectShort
  }
})
export default class Projects extends Vue {
  @ns.Getter('data') siteData!: SiteData | undefined
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
