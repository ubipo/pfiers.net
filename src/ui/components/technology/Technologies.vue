<template>
  <div class="card-column" ref="gridRef">
    <article
      class="card"
    >
      <div class="card__content">
        <TechnologyShort 
          class="item"
          v-for="technology in technologies"
          :key="technology.name"
          :technology="technology" />
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import TechnologyShort from "./TechnologyShort.vue"
import { Technology } from "@/content/types"
import { defineComponent, onMounted, ref, watch } from "vue";
import { initCardGrid } from "@/ui/CardGrid";


export default defineComponent({
  props: {
    technologies: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const gridRef = ref<HTMLDivElement | null>(null)
    // onMounted(() => {
    //   const grid = gridRef.value
    //   if (grid === null) throw new Error("Card grid not mounted")
    //   initCardGrid(grid)
    // })
    return { technologies: props.technologies as Technology[], gridRef }
  },
  components: { TechnologyShort }
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

.card {
  max-width: 35rem;
}

.item {
  margin-bottom: 2rem;
}
</style>
