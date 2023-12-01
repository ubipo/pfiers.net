<script lang="ts">
  import type { Project } from "$lib/service/content/model";
	import ContentImage from "./contentImage.svelte";
	import Markdown from "./markdown.svelte";
	import SpriteIcon from "./spriteIcon.svelte";

  
  export let project: Project;

  const iconSize = "1.3em"
</script>

<div class="project">

  <a href="/projects/{project.uriSafeName}"><h2>{project.name}</h2></a>
  <Markdown tokens={project.shortDescription.tokens} />
  <a href={`/projects/${project.uriSafeName}`} class="button">
    <span><SpriteIcon iconId="read-more" size={iconSize} /></span>
    Read more
  </a>
  <!-- <ProjectHeader {project} /> -->
  {#if project.image != null}
    <a class="image" href="/projects/{project.uriSafeName}">
      <ContentImage definition={project.image} />
    </a>
  {/if}
</div>

<style lang="scss">

  h2 {
    margin-top: 0.1em;
  }

  a {
    text-decoration: none;
  }

  .button {
    @include button();
    display: inline-flex;
    justify-content: center;
    flex-direction: row;

    & > span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.5em;
    }
  }
</style>
