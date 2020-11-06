<template>
  <CardColumn :items="projectCardItems">
    <template v-slot:first-item>
      <div class="header">
        <TechnologyBadge :technology="p.technology" class="header__badge"></TechnologyBadge>
        <h1 class="page-title">{{ p.technology.name }}</h1>
      </div>
      <MarkdownFromDef v-if="p.technology.short !== null" :definition="p.technology.short"></MarkdownFromDef>
      <Wikipedia v-if="p.technology.wikiArticleName !== null" :article-name="p.technology.wikiArticleName.value"></Wikipedia>
      <p v-if="p.technology.projects.length > 0">
        I used {{ p.technology.name }} in the projects below in some way or another.
        Keep in mind that this is just a selection.
      </p>
    </template>

    <template v-slot:default="slotProps">
      <ProjectShort :project="slotProps.data" />
    </template>
  </CardColumn>
</template>

<script lang="ts">
import ProjectShort from '../project/ProjectShort.vue'
import NotFound from './NotFound.vue'
import TechnologyBadge from './TechnologyBadge.vue'
import Wikipedia from '../Wikipedia.vue'
import { Technology } from '@/content/types'
import { computed, ComputedRef, defineComponent } from 'vue'
import MarkdownFromDef from '../MarkdownFromDef.vue'
import CardColumn, { ColumnItem } from '../layout/CardColumn.vue'


export default defineComponent({
  props: {
    technology: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const projectCardItems: ComputedRef<ColumnItem[]> = computed(() => 
      (props.technology as Technology).projects.map(project => ({
        key: project.urlSafeName.value,
        data: project
      }))
    )
    return { p: props, projectCardItems }
  },
  components: {
    TechnologyBadge, ProjectShort, Wikipedia,
    MarkdownFromDef, CardColumn
  }
})
</script>

<style lang="scss" scoped>
@import '@/ui/style/style.scss';

$icon-size: 75px;

::v-deep(.header) {
  .header__badge {
    float: right;

    &,
    > svg {
      height: $icon-size;
      width: $icon-size;
    }
  }
}
</style>
