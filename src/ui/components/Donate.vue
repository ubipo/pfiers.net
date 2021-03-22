<template>
  <CardColumn>
    <template v-slot:first-item>
      <h1 class="page-title">Donate</h1>
      <MarkdownFromDef :definition="p.donate.long" v-on:ready="onReady"></MarkdownFromDef>
    </template>
  </CardColumn>
</template>

<script lang="ts">
import MarkdownFromDef from './MarkdownFromDef.vue'
import { defineComponent } from "vue";
import CardColumn from './layout/CardColumn.vue';


export default defineComponent({
  props: {
    donate: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const onReady = () => {}
    return { p: props, onReady }
  },
  components: { MarkdownFromDef, CardColumn }
})
</script>
