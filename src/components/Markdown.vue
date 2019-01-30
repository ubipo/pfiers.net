<template>
  <dynamic-vc class="markdown" :content="parse(markdown)"></dynamic-vc>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { parse } from 'marked';

  @Component({
    props: ['markdown'], 
    components: {
      DynamicVc: {
        props: {
          content: {
            type: String,
            required: true
          }
        },
        render(h: any): any {
          return h((Vue as any).compile((this as any).content))
        }
      }
    }
  })
  export default class markdown extends Vue {
    constructor() {
      super();
    }

    parse(raw: string) {
      let parsed = parse(raw, { sanitize: true });
      let out = '<div>' + 
      parsed.replace(
        /<a href="@([^<>]*)">([^<>]*)<\/a>/g, "<router-link to=\"$1\">$2</router-link>"
      )
      + '</div>';
      return out;
    }
  }
</script>

<style lang="scss">

.markdown h2 {
  margin-top: 0;
}

.banner {
  width: 100%;
}

</style>
