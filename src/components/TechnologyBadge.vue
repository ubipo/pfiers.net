<template>
  <router-link
    class="technology-badge"
    :title="technology.name"
    :to="`/technologies/${technology.urlSafeName}`"
  >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="svg"></div>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Technology } from '../site-data/types'

@Component
export default class TechnologyBadge extends Vue {
  @Prop(Object) technology!: Technology

  private svg: string | '' = ''

  @Watch('technology', {})
  onTechnologyChanged() {
    this.updateSvg()
  }

  created() {
    this.updateSvg()
  }

  updateSvg() {
    new Promise<string>((resolve, reject) => {
      let url = this.technology.iconUrl
      if (url != undefined) {
        TechnologyBadge.fetchSvgFromUrl(url)
          .then(svg => {
            resolve(svg)
          })
          .catch(err => {
            reject(
              `The following error occurred when trying to load "${url}":\n\n ${err.message}`
            )
          })
      } else {
        resolve()
      }
    })
      .then(svg => {
        this.svg = svg
      })
      .catch(error => {
        this.svg = ''
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }

  static fetchSvgFromUrl(url: URL): Promise<string> {
    let req = new Request(url.href)
    return fetch(req).then(res => {
      if (!res.ok) throw new Error(`HTTP Error loading ${url.href}: ${res.statusText}`)

      return res.text()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../style/style.scss';

$icon-size: 50px;

.technology-badge {
  &,
  > div {
    display: block;
    background-color: $primary-color;
    height: $icon-size;
    width: $icon-size;
  }
}

.technology-badge__icon {
  pointer-events: none;
  height: $icon-size;
  width: $icon-size;
}
</style>
