<template>
  <router-link class="technology-badge" :title="technology.name" :to="`/technologies/${technology.urlSafeName}`">
    <object class="technology-badge__icon" v-bind:data="technology.iconUrl" type="image/svg+xml"></object>
  </router-link>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    props: ['technology']
  })
  export default class TechnologyBadge extends Vue {
    constructor() {
      super();
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style.scss';

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
