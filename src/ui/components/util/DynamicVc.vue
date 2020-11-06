<template>
  <component :is="p.component" v-bind="p.props"></component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  props: {
    component: {
      type: String,
      required: true
    },
    props: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    return { p: props }
  }
})
</script>
