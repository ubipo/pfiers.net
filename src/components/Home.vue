<template>
  <div>
    <dynamic-markdown class="markdown" :content="md(mainMd)"></dynamic-markdown>
    <figure>
      <img src="/dist/res/home.png">
    </figure>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { parse } from 'marked';

  import * as mainMd from "../res/home.md";

  @Component({
    data: () => {
      return {
        "mainMd": mainMd
      }
    },  
    components: {
      DynamicMarkdown: {
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
  export default class Home extends Vue {
    constructor() {
      super();
    }

    // <a href="@projects">projects I've made</a>

    md(raw: string) {
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

</style>
