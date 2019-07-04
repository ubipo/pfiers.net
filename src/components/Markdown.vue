<template>
  <p v-if="error">{{ error }}</p>
  <dynamic-vc
    v-else-if="content !== undefined"
    class="markdown"
    :content="content"
  ></dynamic-vc>
  <!-- TODO: italic -->
  <p v-else>No markdown</p>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { parse } from 'marked'
import DynamicVc from './DynamicVc.vue'

@Component({
  components: {
    DynamicVc
  }
})
export default class Markdown extends Vue {
  constructor() {
    super()
  }

  @Prop(String) markdown!: string
  @Prop(URL) markdownUrl!: URL

  private content: string | undefined = ''
  private error: string | undefined = ''

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
        this.content = content == undefined ? undefined : Markdown.parse(content)
        this.error = undefined
    }).catch(error => {
        this.content = undefined
        this.error = error
    })
  }

  static fetchMdFromUrl(url: URL): Promise<string> {
    let req = new Request(url.href)
    return fetch(req).then(res => {
      if (!res.ok) throw new Error(`HTTP Error loading ${url.href}: ${res.statusText}`)

      return res.text()
    })
  }

  static parse(raw: string) {
    let parsed = parse(raw, { sanitize: true })
    // Wrap in root element and set router-links (url prefixed with '@')
    let out =
      '<div>' +
      parsed.replace(
        /<a href="@([^<>]*)">([^<>]*)<\/a>/g,
        '<router-link to="$1">$2</router-link>'
      ) +
      '</div>'
    return out
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
