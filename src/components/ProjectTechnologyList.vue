<template>
  <div>
    <ul class="icons">
      <li
        v-for="(technology, index) in project.technologies"
        :key="index"
        class="icons__item"
      >
        <TechnologyBadge :technology="technology"></TechnologyBadge>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import TechnologyBadge from './TechnologyBadge.vue'
import { Project } from '../site-data/types'
import { Prop } from 'vue-property-decorator'

@Component({
  components: {
    TechnologyBadge
  }
})
export default class ProjectTechnologyList extends Vue {
  @Prop(Object) project!: Project
}
</script>

<style lang="scss" scoped>
.icons {
  display: flex;
  list-style: none;
  padding: 0;
}

.icons__item {
  height: 50px;
  width: 50px;
  background-color: hsl(120, 80, 35);
  margin-right: 5px;
}

.icons__icon {
  height: 50px;
  width: 50px;
}

a {
  display: block;
  height: 50px;
  width: 50px;
}

object {
  pointer-events: none;
}
</style>
