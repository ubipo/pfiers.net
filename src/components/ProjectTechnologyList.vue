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
import { Project } from '@/store/site-data/types'
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
  flex-direction: row;
  padding: 0;
  margin: 0;
}

.icons__item {
  height: 50px;
  width: 50px;
  background-color: hsl(120, 80, 35);
  margin-right: 5px;
  margin-bottom: 5px;
}

@media only screen and (min-width: 650px) {
  .icons {
    flex-wrap: wrap;
    flex-direction: row-reverse;
    max-width: calc((50px + 5px) * 3);
  }

  .icons__item {
    margin-left: 5px;
    margin-right: 0;
  }
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
