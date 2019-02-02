<template>
  <dynamic-vc class="markdown" :content="content"></dynamic-vc>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import { parse } from 'marked';

  @Component({
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
  export default class Markdown extends Vue {
    constructor() {
      super();
    }

    @Prop(String) markdown!: string;
    @Prop(String) markdownUrl!: string;

    private content: string = Markdown.parse("Loading...");

    @Watch('markdown', {})
    @Watch('markdownUrl', {})
    onMarkdownChanged(val: string, oldVal: string) {
      this.updateContent();
    }

    created() {
      this.updateContent();
    }

    updateContent() {
      let markdown = "Loading...";
      if (this.markdown !== undefined && this.markdown !== null) {
        markdown = this.markdown;
      } else {
        let url = this.markdownUrl;
        if (url !== undefined && url !== null) {
          Markdown.fetchMdFromUrl(url).then(e => {
            this.content = Markdown.parse(e)}
          ).catch(err => {
            this.content = Markdown.parse(
              `The following error occurred when trying to load "${url}":\n\n __${err}__`
            );
          });
        } else {
          markdown = '';
        }
      }

      this.content = Markdown.parse(markdown);
    }

    static fetchMdFromUrl(url: string): Promise<string> {
      let req = new XMLHttpRequest();
      req.open("GET", url);

      return new Promise((resolve, reject) => {
        req.addEventListener("load", e => {
          if (req.status !== 200) 
            return reject(`HTTP Error: ${req.statusText}`);

          resolve(req.responseText);
        });
        req.send();
      });
    }

    static parse(raw: string) {
      let parsed = parse(raw, { sanitize: true });
      // Wrap in root element and set router-links (url prefixed with '@')
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
