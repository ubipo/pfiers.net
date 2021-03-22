<template>
  <div class="card-grid" ref="gridRef">
    <article
      class="card"
      v-for="item in props.items"
      :key="item.key">
      <div class="card__content">
        <slot :data="item.data" />
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { initCardGrid } from "@/ui/CardGrid";


export interface MasonryItem {
  key: string,
  data: any
}

export default defineComponent({
  props: {
    items: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const gridRef = ref<HTMLDivElement | null>(null)
    onMounted(() => {
      const grid = gridRef.value
      if (grid === null) throw new Error("Card grid not mounted")
      initCardGrid(grid)
    })
    return { props, gridRef }
  }
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
</style>
