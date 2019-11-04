<template>
  <div>
    <h2 class="page-title">Technologies</h2>
    <article
      v-for="technology in siteData.technologies"
      :key="technology.name"
      class="article-card"
    >
      <TechnologyShort :technology="technology"></TechnologyShort>
    </article>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TechnologyShort from './TechnologyShort.vue'
import { SiteData } from '../site-data/types'
import { namespace } from 'vuex-class'

const ns = namespace('siteData')

@Component({
  components: {
    TechnologyShort
  }
})
export default class Technologies extends Vue {
  @ns.Getter('data') siteData!: SiteData | undefined
}
</script>

<style lang="scss" scoped></style>
