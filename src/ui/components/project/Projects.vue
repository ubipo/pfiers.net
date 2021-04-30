<template>
  <MasonryGrid :items="masonryItems">
    <template v-slot:default="slotProps">
      <ProjectShort :project="slotProps.data" v-on:ready="onReady(slotProps.data)" />
    </template>
  </MasonryGrid>
</template>

<script lang="ts">
import ProjectShort from "./ProjectShort.vue"
import { Project } from "@/content/types";
import { computed, ComputedRef, defineComponent } from "vue";
/** @ts-ignore */
import MasonryGrid, { MasonryItem } from "../layout/MasonryGrid";


export default defineComponent({
  props: {
    projects: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const masonryItems: ComputedRef<MasonryItem[]> = computed(() => 
      (props.projects as Project[]).map(project => ({
        key: project.urlSafeName.value,
        data: project
      }))
    )
    const onReady = (project: Project) => console.log(`Ready: ${project.name}`)
    return { masonryItems, onReady }
  },
  components: { ProjectShort, MasonryGrid }
})

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
