<template>
  <div>
    <div class="technology__header">
      <h3 :id="technology.urlSafeName" class="technology__header__title">
        {{ technology.name }}
      </h3>
      <TechnologyBadge :technology="technology"></TechnologyBadge>
    </div>
    <p>{{ technology.short }}</p>
    <router-link class="button" :to="`/technologies/${technology.urlSafeName}`">
      Read more
    </router-link>

    <p>Used in:</p>
    <ul>
      <li v-for="project in technology.projects" :key="project.name">
        <router-link :to="`/projects/${project.urlSafeName}`" class="link">
          {{ project.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import TechnologyBadge from './TechnologyBadge.vue'
import { Technology } from '../site-data/types'

@Component({
  components: {
    TechnologyBadge
  }
})
export default class TechnologyShort extends Vue {
  @Prop(undefined) technology!: Technology
}
</script>

<style lang="scss" scoped>
@import '../style/style.scss';

.technology__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .technology__header__title {
    @include h3-style();
    margin-top: 0.2em;
  }
}
</style>
