<template>
  <router-link v-if="isRelative" :to="absoluteUrl.pathname">
    <slot>{{ absoluteUrl.pathname }}</slot>
  </router-link>
  <a v-else :href="absoluteUrl.href">
    <slot>{{ absoluteUrl.href }}</slot>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  props: {
    to: {
      type: URL,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  setup(props, ctx) {
    const absoluteUrl = new URL(props.to.toString(), document.location.href)
    return {
      absoluteUrl,
      isRelative() {
        absoluteUrl.host === document.location.host
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
