<script lang="ts">
  import { page } from '$app/stores';
	import { resolveHrefForRoute } from "$lib/service/url";

  export let href: string
  export let title: string | undefined

  $: resolvedHref = resolveHrefForRoute($page.routeId, href)
</script>

<a href={resolvedHref} {title}><slot></slot></a>

<style lang="scss">
  a {
    @include link();
  }
</style>
