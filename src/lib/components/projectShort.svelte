<script lang="ts">
  import type { Project } from "$lib/service/content/model";
	import ContentImage from "./contentImage.svelte";
	import ProjectHeader from "./projectHeader.svelte";

  
  export let project: Project;
</script>

<div class="project">
  <ProjectHeader {project} />
  {#if project.image != null}
    <ContentImage definition={project.image} />
  {/if}
</div>
