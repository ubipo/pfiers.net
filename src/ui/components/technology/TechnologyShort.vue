<template>
  <div class="header">
    <TechnologyBadge :technology="p.technology"></TechnologyBadge>
    <div>
      <router-link :to="`/technologies/${p.technology.urlSafeName.value}`" class="head-link">
        <h3 :id="p.technology.urlSafeName.value" class="head">
          {{ p.technology.name }}
        </h3>
      </router-link>
      <div class="used-in">
        <span>Used in: </span>
        <span v-for="(project, index) in p.technology.projects" :key="project.name">
          <router-link :to="`/projects/${project.urlSafeName.value}`" class="link">
            {{ project.name }}
          </router-link>
          <span v-if="index !== p.technology.projects.length - 1">,</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MarkdownFromDef from '../MarkdownFromDef.vue'
import TechnologyBadge from './TechnologyBadge.vue'
import { Technology } from '@/content/types'
import { defineComponent } from 'vue'


export default defineComponent({
  props: {
    technology: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    return { p: props }
  },
  components: { TechnologyBadge, MarkdownFromDef }
})
</script>

<style lang="scss" scoped>
@import '@/ui/style/style.scss';

.header {
  display: flex;
  // justify-content: space-between;
  // align-items: center;
  // justify-items: center;

  > *:first-child {
    margin-right: 1em;
  }
}

.head-link {
  text-decoration: none;
}

.head {
  @include h3-style();
  margin-top: -0.2em;
  margin-bottom: 0;
}

.used-in {
  @include text;
  display: flex;
  flex-wrap: wrap;

  span {
    margin-right: 0.5em;
  }

  span::last-child {
    margin-right: 0;
  }
}

</style>
