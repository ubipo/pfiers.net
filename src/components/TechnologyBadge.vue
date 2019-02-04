<template>
  <router-link :title="technology.name" :to="technology.urlSafeName">
    <object class="icons__icon" v-bind:data="technology.iconUrl" type="image/svg+xml"></object>
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
  .icons__icon {
    height: 50px;
    width: 50px;
  }

  a {
    display: block;
    background-color: hsl(120, 80, 35);
    height: 50px;
    width: 50px;
  }
  
  object {
    pointer-events: none;
  }

</style>
