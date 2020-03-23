<template>
  <div class="card-grid">
    <article
      class="card"
      v-for="technology in siteData.technologies"
      :key="technology.name"
    >
      <div class="card__content">
        <TechnologyShort :technology="technology"></TechnologyShort>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from "vue-class-component";
import TechnologyShort from './TechnologyShort.vue'
import { SiteData } from '@/store/site-data/types'
import { namespace } from 'vuex-class'
import CardGrid from "./mixins/CardGrid";

const ns = namespace('siteData')

@Component({
  components: {
    TechnologyShort
  }
})
export default class Technologies extends mixins(CardGrid) {
  @ns.Getter('data') siteData!: SiteData | undefined

  public mounted() {
    this.cardGridInit()
  }
}
</script>

<style lang="scss" scoped></style>
