<script type="ts">
	import type { ImageMeta } from "$lib/service/content/imageMeta";
	import { decodeHTMLEntities } from "$lib/service/stringUtil";


  export let href: string
  export let title: string | undefined = undefined
  export let text: string
  export let meta: ImageMeta | undefined = undefined
  export let placeholder: string | undefined = undefined

  const [containerStyle, imgStyle] = (() => {
    if (meta == undefined) return ["", ""]
    const aspectRatioInv = meta.height / meta.width
    const containerStyle = `width: 100%; position: relative; padding-bottom: calc(100% * ${aspectRatioInv});`
    const imgStyle = `position: absolute; top: 0; left: 0; width: 100%; height: 100%;`
    return [containerStyle, imgStyle]
  })();

  const removePlaceholder = () => {
    placeholder = undefined
  }
</script>

<figure>
  <div style={containerStyle}>
    {#if placeholder != undefined}
      <img src={placeholder} title={title ?? text} alt={text} style={imgStyle}>
    {/if}
    <img src={href} title={title ?? text} alt={text} style={imgStyle} on:load|once={removePlaceholder}>
  </div>
  {#if title != undefined}
    <figcaption>{@html title}</figcaption>
  {/if}
</figure>

<style lang="scss">
  figure {
    margin: 0;
  }

  figcaption {
    @include text();
    text-align: center;
    margin-bottom: 1.7rem;
    margin-top: 0.3rem;
    font-style: italic;
  }
</style>

