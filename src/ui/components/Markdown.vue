<template>
  <dynamic-vc class="markdown" :content="html"></dynamic-vc>
</template>

<script lang="ts">
import createStringTemplateVc from './util/StringTemplateVc'
import { computed, defineComponent } from 'vue'
import { useTask } from "vue-concurrency";
import { parse } from "@/markdown/parse";


export default defineComponent({
  props: {
    markdown: {
      type: String,
      required: true
    }
  },
  setup(props, ctx) {
    const html = computed(() => parse(props.markdown))
    return { html }
  },
  components: {
    DynamicVc: createStringTemplateVc({ })
  }
})
</script>

<style lang="scss">
@import '@/ui/style/style.scss';
@import '@/ui/style/tweet.scss';

.markdown {
  h3 {
    @include h3-style();
  }

  li {
    @include text();
    color: $text-color;
  }

  .twitter-tweet {
    a {
      @include link();
    }
  }
}

.banner {
  width: 100%;
}
</style>
