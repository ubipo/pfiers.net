<template>
  <div>
    <h2>Not found</h2>
    <p>The page "{{ Pathname() }}" does not exist</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class NotFound extends Vue {
  Pathname(): string {
    return window.location.pathname
  }
}
</script>

<style lang="scss" scoped></style>
