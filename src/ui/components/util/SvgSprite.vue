<template>
  <svg :viewBox="icon.viewBox">
    <use :xlink:href="'#' + icon.id" />
  </svg>
</template>

<script lang="ts">
import { fetchCup } from "@/fetch";
import { Exception } from "@/util/exception";
import Cup from "@/url/Cup";
import { toUrl } from "@/url";
import { withoutQueryOrFragment } from "@/url/transform"
import { computed, defineComponent } from "vue";


const ID_PREFIX = "svg-sprite-"
const HIDDEN_ATTR = 'hidden'
const SPRITE_URL_ATTR = 'data-sprite-url'

interface Icon {
  name: string,
  id: string,
  viewBox: string,
  spriteUrl: URL
}

const iconsReq = require.context("@/assets/img/icons", true, /\.svg$/);
const icons: Array<Icon> = iconsReq.keys().map((key: any) => {
  const { viewBox, url: rUrl } = iconsReq(key).default
  if (typeof rUrl !== 'string') {
    throw new Exception(`SVG icon url must be a string`)
  }
  if (typeof viewBox !== 'string') {
    throw new Exception(`SVG icon viewBox must be a string`)
  }

  const url = toUrl(rUrl, Cup.DIST)
  const id = url.hash.slice(1)
  if (!id.startsWith(ID_PREFIX)) {
    throw new Exception(`SVG icon id must start with ${ID_PREFIX}`)
  }

  const name = id.slice(ID_PREFIX.length)
  const spriteUrl = withoutQueryOrFragment(url)
  return { name, id, viewBox, spriteUrl }
})

async function downloadSprite(spriteUrl: URL) {
  const spriteElemExists = document.querySelector(
    `div[${SPRITE_URL_ATTR}="${spriteUrl.href}"]`
  ) !== null
  if (spriteElemExists) return
  const res = await fetchCup(spriteUrl)
  const svg = await res.text()
  var div = document.createElement("div")
  div.setAttribute(HIDDEN_ATTR, HIDDEN_ATTR)
  div.setAttribute(SPRITE_URL_ATTR, spriteUrl.href)
  div.innerHTML = svg
  document.body.insertBefore(div, document.body.childNodes[0]);
}

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props, ctx) {
    const icon = computed(() => {
      const name = props.name
      const icon = icons.find(i => i.name === name)
      if (icon === undefined) {
        throw new Error(`No svg found by name: "${name}"`)
      }
      downloadSprite(icon.spriteUrl)
      return icon
    })
    return { icon }
  }
})
</script>
