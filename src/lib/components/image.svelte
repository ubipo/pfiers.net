<script lang="ts">
	import { page } from "$app/stores";
	import { pageSpecificMetadataStore } from "$lib/service/pageSpecificMetadataStore";


  export let href: string
  export let title: string | undefined = undefined
  export let text: string
  export let placeholder: string | undefined = undefined

  $: [pageRelativeHref, meta] = ((routeId, s) => {
    if (routeId == null) return [href, undefined]
    const metadata = s[routeId]?.['image']?.[href]
    if (metadata == null) return [href, undefined]
    const { pageRelativeHref, meta } = metadata
    return [pageRelativeHref, meta]
  })($page.route.id, $pageSpecificMetadataStore)

  $: [containerStyle, imgStyle] = ((meta) => {
    if (meta == undefined) return ["", ""]
    const aspectRatioInv = meta.height / meta.width
    const containerStyle = `width: 100%; position: relative; padding-bottom: calc(100% * ${aspectRatioInv});`
    const imgStyle = `position: absolute; top: 0; left: 0; width: 100%; height: 100%;`
    return [containerStyle, imgStyle]
  })(meta);

  const removePlaceholder = () => {
    placeholder = undefined
  }

  $: commonImgAttributes = {
    title: title,
    alt: text,
    style: imgStyle,
  }

  $: srcsetAttributes = meta?.srcset == undefined ? {} : {
    srcset: meta.srcset.map(({ href: url, size }) => `${url} ${size}w`).join(", "),
    sizes: meta.srcset.map(({ size, mediaQuery }) => {
      return mediaQuery == undefined ? `${size}px` : `(${mediaQuery}) ${size}px`
    }).join(", "),
  }

  $: fullimgAttributes = {
    ...commonImgAttributes,
    ...srcsetAttributes,
  }

  $: imagesrc = meta?.srcset != undefined && meta.srcset.length > 0
    ? meta.srcset[meta.srcset.length - 1].href
    : pageRelativeHref
</script>

<figure>
  <!-- svelte-ignore a11y-missing-attribute -->
  <div style={containerStyle}>
    {#if placeholder != undefined}
      <img src={placeholder} {...commonImgAttributes}>
    {/if}
    <img src={imagesrc} {...fullimgAttributes} on:load={removePlaceholder}>
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

