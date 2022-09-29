<script lang="ts">
	import ContentError from "$lib/components/contentError.svelte";
  import type { PageData } from "./$types";
	import ProjectGrid from "./projectGrid.svelte";


  export let data: PageData
  $: ({ projects, contentError } = data)
</script>


{#if projects != undefined}
  <ProjectGrid {projects} />
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
