<script lang="ts">
	import type { Project } from "$lib/service/content/model";
	import SpriteIcon from "./spriteIcon.svelte";


  export let project: Project
  export let includeReadMore: boolean
  
  const iconSize = "1.3em"
</script>


{#if includeReadMore && project.longDescription != null}
  <a href={`/projects/${project.urlSafeName}`} class="button">
    <span><SpriteIcon iconId="read-more" size={iconSize} /></span>
    Read more
  </a>
{/if}
{#if project.siteUrl != null}
  <a href={project.siteUrl.toString()} class="button">
    <span><SpriteIcon iconId="arrow-out" size={iconSize} /></span>
    Website
  </a>
{/if}
{#if project.gitUrl != null}
  <a href={project.gitUrl.toString()} class="button">
    <span><SpriteIcon iconId="git" size={iconSize} /></span>
    Repository
  </a>
{/if}

<style lang="scss">
  a {
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
