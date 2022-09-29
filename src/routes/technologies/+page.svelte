<script lang="ts">
	import ContentError from "$lib/components/contentError.svelte";
  import type { PageData } from "./$types";
	import TechnologyGrid from "./technologyGrid.svelte";


  export let data: PageData
  $: ({ technologies, contentError } = data)
</script>


{#if technologies != undefined}
  <TechnologyGrid {technologies} />
{:else}
  <article>
    <ContentError {contentError} />
  </article>
{/if}


<style lang="scss">
  article {
    @include card();
  }
</style>
