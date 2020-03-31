<template>
  <div>
    <blockquote>
      <p class="wiki-text">
        "{{ wikiText }}"
      </p>
      <footer>
        <p>
          Extract from
          <cite>
            <a :href="wikiUrl" class="link">{{ wikiTitle }}</a>
          </cite>
          on
          <a href="https://en.wikipedia.org/wiki/Main_Page" class="link">Wikipedia</a>
          , the free encyclopedia
        </p>
      </footer>
  </blockquote>

    <p>
      
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  @Prop(String) articleName!: string

  private wikiDescription: string | null = null
  private wikiText: string | null = null
  private wikiTitle: string | null = null
  private wikiUrl: string | null = null

  created() {
    this.updateWikiText()
  }

  @Watch('articleName', {})
  public async updateWikiText() {
    const articleNameEnc = encodeURIComponent(this.articleName)
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${articleNameEnc}`
    const req = new Request(url)
    return fetch(req).then(res => {
      if (!res.ok) throw new Error(`HTTP Error loading ${url}: ${res.statusText}`)
      console.log(res)
      return res.json()
    }).then(data => {
      console.log(data)
      this.wikiDescription = data.description
      this.wikiText = data.extract
      this.wikiTitle = data.title
      this.wikiUrl = `https://en.wikipedia.org/wiki/${data.title}`
    })
  }



  public contentLoad() {
    this.$emit('content-load')
  }
}
</script>

<style lang="scss">

blockquote {
  margin: 1rem 2rem;
}
  
.wiki-text {
  font-style: italic;
}

</style>
