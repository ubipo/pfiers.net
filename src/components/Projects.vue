<template>
  <div class="card-grid">
    <article
      class="card"
      v-for="project in siteData.projects"
      :key="project.name"
    >
      <div class="card__content">
        <ProjectShort :project="project"></ProjectShort>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from "vue-class-component";
import ProjectShort from './ProjectShort.vue'
import { SiteData } from '@/store/site-data/types'
import { namespace } from 'vuex-class'
import CardGrid from "./mixins/CardGrid";

const ns = namespace('siteData')

@Component({
  components: {
    ProjectShort
  }
})
export default class Projects extends mixins(CardGrid) {
  @ns.Getter('data') siteData!: SiteData | undefined

  public mounted() {
    this.cardGridInit()
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
