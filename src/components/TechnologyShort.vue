<template>
  <section class="technology">
    <h3 class="technology__title">{{technology.name}}</h3>
    <p>{{technology.short}}</p>
    <router-link class="read-more" v-bind:to="`/technologies/${technology.urlSafeName}`">Read more></router-link>
    <TechnologyBadge :technology="technology"></TechnologyBadge>
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
  import TechnologyBadge from './TechnologyBadge.vue';
  import { Technology } from '../siteDataLoader';

  @Component({
    components: {
      TechnologyBadge
    }
  })
  export default class TechnologyShort extends Vue {
    constructor() {
      super();
    }

    @Prop(undefined) technology!: Technology;
  }
</script>


<style lang="scss" scoped>
@import '../style.scss';

.read-more {
  @include button;
}

.technology__title {
  font-size: 1.5rem;
}
</style>
