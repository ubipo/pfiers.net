<template>
  <router-link
    class="technology-badge"
    :title="p.technology.name"
    :to="`/technologies/${p.technology.urlSafeName.value}`">
    <SvgSprite :name="spriteName" />
  </router-link>
</template>

<script lang="ts">
import { Technology } from "@/content/types";
import { Exception } from "@/util/exception";
import { computed, defineComponent } from "vue";
import SvgSprite from "../util/SvgSprite.vue";


export default defineComponent({
  props: {
    technology: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const spriteName = computed(() => {
      const technology = props.technology as Technology
      return `tech-${technology.iconName.value}`
    })
    return { p: props, spriteName }
  },
  components: { SvgSprite }
})
</script>

<style lang="scss" scoped>
@import '@/ui/style/style.scss';

$icon-size: 50px;

.technology-badge {
  &,
  > svg {
    display: block;
    background-color: $primary-color;
    height: $icon-size;
    width: $icon-size;
  }
}

.technology-badge__icon {
  pointer-events: none;
  height: $icon-size;
  width: $icon-size;
}
</style>
