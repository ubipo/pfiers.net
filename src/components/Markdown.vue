<template>
  <p v-if="error">{{ error }}</p>
  <dynamic-vc
    v-else-if="content != undefined"
    class="markdown"
    :content="content"
  ></dynamic-vc>
  <!-- TODO: italic -->
  <p v-else>No markdown</p>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import * as marked from 'marked'
import DynamicVcFactory from './DynamicVc'
import SmartLink from './SmartLink.vue'
import { toContentUrl } from '../enviroment/content'

function markdownRendererFactory() {
  const renderer = new marked.Renderer()
  renderer.link = (href, title, text) => {
    return `<SmartLink to="${toContentUrl(href).href}" class="link">${text}</SmartLink>`
  }
  return renderer
}

@Component({
  components: {
    DynamicVc: DynamicVcFactory({ SmartLink: SmartLink })
  }
})
export default class Markdown extends Vue {
  @Prop(String) markdown!: string
  @Prop(URL) markdownUrl!: URL

  private content: string | null = null
  private error: string | null = null

  private static renderer: marked.Renderer = markdownRendererFactory()

  @Watch('markdown', {})
  @Watch('markdownUrl', {})
  onMarkdownChanged() {
    this.updateContent()
  }

  created() {
    this.updateContent()
  }

  updateContent() {
    /* eslint-disable prettier/prettier */
    new Promise<string>((resolve, reject) => {
      if (this.markdown != undefined) {
        resolve(this.markdown)
      } else {
        let url = this.markdownUrl
        if (url !== undefined && url !== null) {
          Markdown.fetchMdFromUrl(url)
            .then(md => {
              resolve(md)
            })
            .catch(err => {
              reject(
                `The following error occurred when trying to load "${url}":\n\n ${err.message}`
              )
            })
        } else {
          resolve()
        }
      }
    }).then(content => {
        this.content = content == null ? null : Markdown.parse(content)
        this.error = null
        console.log("Markdown content load")
        this.$nextTick(() => this.$emit('content-load'))
    }).catch(error => {
        this.content = null
        this.error = error
    })
  }

  static fetchMdFromUrl(url: URL): Promise<string> {
    const req = new Request(url.href)
    return fetch(req).then(res => {
      if (!res.ok) throw new Error(`HTTP Error loading ${url.href}: ${res.statusText}`)
      return res.text()
    })
  }

  static parse(raw: string) {
    const markdown = marked.parse(raw, { renderer: this.renderer })
    return `<div>${markdown}</div>`
  }
}
</script>

<style lang="scss">
@import '../style/style.scss';

.markdown {
  h3 {
    @include h3-style();
  }

  li {
    @include text();
    color: $text-color;
  }
}

.banner {
  width: 100%;
}
</style>
