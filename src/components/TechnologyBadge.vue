<template>
  <router-link
    class="technology-badge"
    :title="technology.name"
    :to="`/technologies/${technology.urlSafeName}`"
  >
    <svg v-if="icon" :viewBox="icon.viewBox">
      <use :xlink:href="icon.url" />
    </svg>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Technology } from '@/store/site-data/types'
import { Exception } from '../util/exception'

interface Icon {
  name: string,
  url: string
}

const techIconsReq = require.context("@/tech-icons", false, /^\.\/([\w-]+)\.svg$/);
const techIcons: Array<Icon> = techIconsReq.keys().map((key: any) => {
  const nameRe = /^\.\/([\w-]+)\.svg$/.exec(key)
  if (nameRe == null)
    throw new Exception(`Invalid svg icon name: ${key}`)
  return {
    name: nameRe[1],
    ...techIconsReq(key).default
  }
})

@Component
export default class TechnologyBadge extends Vue {
  @Prop(Object) technology!: Technology

  private icon: Icon | null = null
  private svg: string | '' = ''

  @Watch('technology', {})
  onTechnologyChanged() {
    this.updateSvg()
  }

  created() {
    this.updateSvg()
  }

  updateSvg() {
    const icon = techIcons.find(i => i.name === this.technology.iconName)
    if (icon) {
      this.icon = icon
    }

    // new Promise<string>((resolve, reject) => {


    //   if (url != undefined) {
    //     TechnologyBadge.fetchSvgFromUrl(url)
    //       .then(svg => {
    //         resolve(svg)
    //       })
    //       .catch(err => {
    //         reject(
    //           `The following error occurred when trying to load "${url}":\n\n ${err.message}`
    //         )
    //       })
    //   } else {
    //     resolve()
    //   }
    // })
    //   .then(svg => {
    //     this.svg = svg
    //   })
    //   .catch(error => {
    //     this.svg = ''
    //     // eslint-disable-next-line no-console
    //     console.error(error)
    //   })
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
  > svg {
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
