<script lang="ts">
	import { page } from '$app/stores';
	import { pageSpecificMetadataStore } from '$lib/service/pageSpecificMetadataStore';

  export let href: string
  export let title: string | undefined

  $: pageRelativeHref = ((routeId, s) => {
    if (routeId == null) return href
    return s[routeId]?.['link']?.[href].pageRelativeHref ?? href
  })($page.route.id, $pageSpecificMetadataStore)
</script>

<a href={pageRelativeHref} {title}><slot></slot></a>

<style lang="scss">
  a {
    @include link();
  }
</style>
