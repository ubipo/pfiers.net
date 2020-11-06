<template>
  <CardColumn>
    <template v-slot:first-item>
      <h1 class="page-title">Not found</h1>
      <p>The page "{{ getPathname() }}" does not exist</p>
    </template>
  </CardColumn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CardColumn from './layout/CardColumn.vue'


export default defineComponent({
  setup(props, ctx) {
    const getPathname = () => window.location.pathname
    return { getPathname }
  },
  components: { CardColumn }
})

</script>

<style lang="scss" scoped></style>
