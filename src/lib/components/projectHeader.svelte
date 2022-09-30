<script lang="ts">
	import Markdown from "./markdown.svelte";
	import type { Project } from "$lib/service/content/model";
	import ProjectTechBadges from "./projectTechBadges.svelte";
	import ProjectButtons from "./projectButtons.svelte";


  export let project: Project
  export let includeIcons = true
</script>

<div class="header">
  {#if includeIcons && project.technologies.length > 0}
    <ProjectTechBadges technologies={project.technologies} />
  {/if}
  <a href="/projects/{project.urlSafeName}"><h2>{project.name}</h2></a>
  <Markdown tokens={project.shortDescription.tokens} />
  <!-- {#if project.longDescription != null}
    <p><a href={`/projects/${project.urlSafeName}`}>Read more</a></p>
  {/if} -->
  <ProjectButtons {project} includeReadMore={true} />
</div>

<style lang="scss">
  .header {
    width: 100%;
    overflow: auto; // Makes float fit
  }

  h2 {
    margin-top: 0.1em;
  }

  a {
    text-decoration: none;
  }

  /* a {
    @include link();
  } */
</style>
