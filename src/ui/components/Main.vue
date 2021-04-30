<template>
  <div class="page-wrapper">
    <Nav :router="props.router" />
    <div class="main-wrapper">
      <main>
        <!-- Pass down content task for content-dependent pages -->
        <router-view
          :contentTask="contentTask" :content="content"
          v-on:perform-content-task="performContentTask" v-on:change-content="changeContent" />
        <router-link
          class="edit-button"
          title="Edit me!"
          :to="`/edit`" v-if="!subIsActive('/edit', true)">
          <SvgSprite name="edit" />
        </router-link>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { fetchContentFromYAML } from "@/content/fetch"
import { Content } from "@/content/types"
import { computed, defineComponent, reactive, Ref } from "vue"
import { useAsyncTask } from "vue-concurrency"
import Nav from './Nav.vue'
import { TaskInstance } from "vue-concurrency/dist/vue3/src/TaskInstance"
import SvgSprite from "./util/SvgSprite.vue"
import { subIsActive } from "@/ui/routeUtil";
import { Router } from "vue-router"
import { tryCatch } from "@/util"
import { resolveCupUrl } from "@/url/resolve"
import bgImg from "@/assets/img/bg.svg"


export default defineComponent({
  props: {
    contentRef: {
      type: Object,
      required: true
    },
    router: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const contentTask = useAsyncTask(async () => {
      const content = await tryCatch(
        fetchContentFromYAML,
        console.error
      );
      (props.contentRef as Ref<Content>).value = reactive(content)
      return content
    })
    const performContentTask = (callback?: (taskInstance: TaskInstance<Content>) => void) => {
      if (contentTask.last !== undefined && !contentTask.last.isError) {
        if (callback !== undefined) callback(contentTask.last)
        return
      }
      const taskInstance = contentTask.perform()
      if (callback !== undefined) {
        callback(taskInstance)
      }
    }
    const changeContent = (content: Content) => {
      if (typeof content !== 'object' || content === null) {
        throw new Error("Event data `content` must be an object")
      }
      (props.contentRef as Ref<Content>).value = reactive(content)
    }
    const content = computed(() => props.contentRef.value)
    return {
      contentTask, performContentTask, changeContent, props, content, resolveCupUrl, bgImg,
      subIsActive: (route: string, exact: boolean = false) => subIsActive(props.router as Router, route, exact)
    }
  },
  components: { Nav, SvgSprite }
})
</script>

<style lang="scss">
@import '@/ui/style/main.scss';
@import '@/ui/style/style.scss';

p {
  font-family: $text-font-stack;
  color: $text-color;
}

h1,
h2,
h3 {
  font-family: 'Quicksand', sans-serif;
  font-weight: 400;
  text-decoration: none;
  color: $text-color;
  outline: none;
}

.page-wrapper {
  min-height: 100%;
  display: flex;
  flex-flow: column;
}

.bg {
  position: absolute;
  z-index: 1;
  width: 100%;
}

.main-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  background-image: url("@/assets/img/bg.svg");
  background-size: 100vw; // Ignore scrollbar
  background-color: hsl(0, 0%, 95%);
}

main {
  z-index: 100; // For nav shadow
  margin: 0.25rem;
  width: 100%;
}

@media only screen and (min-width: 650px) {
  main {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
}

figure {
  max-width: 100%;
  margin: 0;
}

img {
  max-width: 100%;
}

.site-data-status {
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-button {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: transparentize($color: grey($amount: 30), $amount: 0.6);
  width: 1.5rem;
  height: 1.5rem;
}
</style>
