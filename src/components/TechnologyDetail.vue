<template>
  <div class="card-column">
    <NotFound v-if="technology === null"></NotFound>
    <article v-else class="card">
      <div class="card__content">
        <div class="technology-header">
          <TechnologyBadge :technology="technology" class="technology-header__badge"></TechnologyBadge>
          <h1 class="page-title">{{ technology.name }}</h1>
        </div>
        <Wikipedia :article-name="technology.wikiArticleName"></Wikipedia>
        <p>{{ technology.short }}</p>
        <p>Some projects in which I use {{ technology.name }}:</p>
        <ProjectShort
          v-for="project in technology.projects"
          :key="project.name"
          :project="project"
        ></ProjectShort>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ProjectShort from './ProjectShort.vue'
import NotFound from './NotFound.vue'
import TechnologyBadge from './TechnologyBadge.vue'
import Wikipedia from './Wikipedia.vue'
import { Technology } from '@/store/site-data/types'

@Component({
  components: {
    TechnologyBadge,
    ProjectShort,
    NotFound,
    Wikipedia
  }
})
export default class TechnologyDetail extends Vue {
  @Prop(Object) technology!: Technology

  public mounted() {
    this.$nextTick(() => this.$emit('content-load'))
  }
}
</script>

<style lang="scss" scoped>
@import '../style/style.scss';

$icon-size: 75px;

/deep/ .technology-header {
  .technology-header__badge {
    float: right;

    &,
    > svg {
      height: $icon-size;
      width: $icon-size;
    }
  }
}
</style>
