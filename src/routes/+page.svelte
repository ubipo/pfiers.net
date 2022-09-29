<script lang="ts">
  import type { PageData } from "./$types";
  import ContentError from "$lib/components/contentError.svelte";
	import Markdown from "$lib/components/markdown.svelte";

  export let data: PageData
  $: ({ home, contentError } = data)
</script>

<article>
  {#if home != undefined}
    <Markdown tokens={home.tokens} />
  {:else}
    <ContentError {contentError} />
  {/if}
</article>

<style lang="scss">
  article {
    @include card();
  }
</style>
