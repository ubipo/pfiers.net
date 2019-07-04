<template>
  <router-link
    class="technology-badge"
    :title="technology.name"
    :to="`/technologies/${technology.urlSafeName}`"
  >
    <object
      class="technology-badge__icon"
      :data="technology.iconUrl"
      type="image/svg+xml"
    ></object>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Technology } from '../site-data/types'

@Component
export default class TechnologyBadge extends Vue {
  @Prop(Object) technology!: Technology
}
</script>

<style lang="scss" scoped>
@import '../style/style.scss';

$icon-size: 50px;

.technology-badge {
  display: block;
  background-color: $primary-color;
  height: $icon-size;
  width: $icon-size;
}

.technology-badge__icon {
  pointer-events: none;
  height: $icon-size;
  width: $icon-size;
}
</style>
