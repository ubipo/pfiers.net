<template>
  <div class="card-column">
    <article class="card" v-if="hasFirstItem">
      <div class="card__content">
        <slot name="first-item" />
      </div>
    </article>
    <template v-if="p.items !== undefined">
      <article
        class="card"
        v-for="item in p.items"
        :key="item.key" >
        <div class="card__content">
          <slot :data="item.data" />
        </div>
      </article>
    </template>
  </div>
</template>

<script lang="ts">
import { Project } from "@/content/types";
import { computed, defineComponent } from "vue";


export default defineComponent({
  props: {
    items: {
      type: Object,
      default: []
    }
  },
  setup(props, ctx) {
    const hasFirstItem = computed(() => ctx.slots["first-item"] !== undefined)
    return { p: props, hasFirstItem }
  }
})

</script>

<style lang="scss" scoped>
</style>
