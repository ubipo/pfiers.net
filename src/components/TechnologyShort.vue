<template>
  <section class="technology">
    <h3 class="technology__title">{{technology.name}}</h3>
    <p>{{technology.short}}</p>
    <router-link v-bind:to="`/technologies/${technology.urlSafeName}`">Read more...</router-link>
    <p>Used in: </p>
    <ul>
      <li v-for="project in technology.projects" :key="project.name">
        <router-link :to="`/projects/${project.urlSafeName}`">{{project.name}}</router-link>
      </li>
    </ul>
  </section>
</template>


<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { Technology } from '../siteDataLoader';

  @Component
  export default class TechnologyShort extends Vue {
    constructor() {
      super();
    }

    @Prop(undefined) technology!: Technology;
  }
</script>


<style lang="scss" scoped>

.technology__title {
  font-size: 1.5rem;
}
</style>
