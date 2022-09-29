<script lang="ts">
  import type { PageData } from "./$types";
  import ContentError from "$lib/components/contentError.svelte";
	import Markdown from "$lib/components/markdown.svelte";
  import ProjectTechBadges from "$lib/components/projectTechBadges.svelte";
  import ProjectButtons from "$lib/components/projectButtons.svelte";


  export let data: PageData
  $: ({ project, contentError } = data)
</script>

<svelte:head>
  {#if project != undefined}
    <title>{project.name} - pfiers</title>
  {:else}
    <title>Project - pfiers</title>
  {/if}
</svelte:head>

<article>
  {#if project != undefined}
    <ProjectTechBadges technologies={project.technologies} />
    <h1>{project.name}</h1>
    <ProjectButtons {project} includeReadMore={false} />
    {#if project.longDescription != null}
      <Markdown tokens={project.longDescription.tokens} />
    {:else}
      <Markdown tokens={project.shortDescription.tokens} />
    {/if}
  {:else}
    <ContentError {contentError} />
  {/if}
</article>

<style lang="scss">
  article {
    @include card();
  }

  h1 {
    margin-bottom: 0.5em;
  }
</style>
