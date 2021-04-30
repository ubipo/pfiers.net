<template>
  <div>
    <div class="project__header">
      <ProjectTechnologyList class="tech-list tech-list--float" :block="true" :project="p.project" />
      <router-link
        class="head-link"
        :to="`/projects/${p.project.urlSafeName.value}`">
        <h3 :id="p.project.urlSafeName.value" class="project__header__title">{{ p.project.name }}</h3>
      </router-link>
      <ProjectTechnologyList class="tech-list tech-list--under" :project="p.project" />
      <p v-if="p.project.short === null">{{ p.project.description }}</p>
      <MarkdownFromDef v-else :definition="p.project.short"></MarkdownFromDef>
    </div>
    
    <router-link
      v-if="p.project.long !== null"
      :to="`/projects/${p.project.urlSafeName.value}`"
      class="button">
      Read more
    </router-link>
    <a v-if="p.project.siteUrl" :href="p.project.siteUrl" class="button">Project site</a>
    <a v-if="p.project.gitUrl" :href="p.project.gitUrl" class="button">Git repository</a>
    <figure v-if="p.project.imgUrl !== null">
      <img :src="resolveCupUrl(p.project.imgUrl)" />
    </figure>
  </div>
</template>

<script lang="ts">
import MarkdownFromDef from '../MarkdownFromDef.vue'
import { Project } from "@/content/types";
import { resolveCupUrl } from "@/url/resolve";
import ProjectTechnologyList from './ProjectTechnologyList.vue'
import { defineComponent } from "vue";


export default defineComponent({
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    return { p: props, resolveCupUrl }
  },
  components: { ProjectTechnologyList, MarkdownFromDef }
})
</script>

<style lang="scss" scoped>
@import '@/ui/style/style.scss';

figure {
  max-width: 100%;
  margin: 0;
}

img {
  max-width: 100%;
}

.head-link {
  text-decoration: none;
}

.project__header {
  // display: flex;
  // justify-content: space-between;
  // align-items: center;

  .project__header__title {
    @include h3-style();
    margin-top: 0.2em;
  }
}


.tech-list--float {
  display: none;
}

.tech-list--under {
  display: block;
}

@media only screen and (min-width: 650px) {
  .tech-list--float {
    display: block;
    float: right;
  }

  .tech-list--under {
    display: none;
  }
}


</style>
