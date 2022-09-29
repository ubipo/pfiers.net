<script lang="ts">
	import ContentError from "$lib/components/contentError.svelte";
  import type { PageData } from "./$types";
	import ProjectGrid from "./projectGrid.svelte";


  export let data: PageData
  $: ({ projects, contentError } = data)
</script>

<svelte:head>
  <title>Projects - pfiers</title>
</svelte:head>

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
