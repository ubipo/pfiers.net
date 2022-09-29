<script lang="ts">
  import type { PageData } from "./$types";
  import ContentError from "$lib/components/contentError.svelte";
	import Markdown from "$lib/components/markdown.svelte";
	import ProjectHeader from "$lib/components/projectHeader.svelte";
  import TechnologyBadge from "$lib/components/technologyBadge.svelte";


  export let data: PageData
  $: ({ technology, contentError } = data)

  function simplifyHost(host?: string): string | undefined {
    if (host == null) return undefined
    if (host.startsWith("www."))
      return simplifyHost(host.substring(4))
    if (/^(?:[a-z]{2})?\.wikipedia\.org/.test(host))
      return "Wikipedia"
    return host
  }

  const badgeSize = "7rem"
</script>

<svelte:head>
  {#if technology != undefined}
    <title>{technology.name} - pfiers</title>
  {:else}
    <title>Technology - pfiers</title>
  {/if}
</svelte:head>

<article>
  {#if technology != undefined}
    <div class="badge" style:--badge-size={badgeSize}>
      <TechnologyBadge {technology} size={badgeSize} />
    </div>
    <h1>{technology.name}</h1>
    {#if technology.url != null}
      <a href={technology.url.toString()}>Read more on {simplifyHost(technology.url?.host)}</a>
    {/if}
    {#if technology.longDescription != null}
      <Markdown tokens={technology.longDescription.tokens} />
    {:else}
      <Markdown tokens={technology.shortDescription.tokens} />
    {/if}
    {#if technology.projects.length != 0}
      <br>
      <p>I've used {technology.name} in...</p>
      <ul>
        {#each technology.projects as project (project.name)}
          <li>
            <ProjectHeader {project} includeIcons={false} />
          </li>
        {/each}
      </ul>
    {:else}
      <p><i>
        I don't have any side projects that use {technology.name} to show at
        the moment. I've probably used it for work or in university assignments
        though.
      </i></p>
    {/if}
  {:else}
    <ContentError {contentError} />
  {/if}
</article>

<style lang="scss">
  article {
    @include card();
  }

  ul {
    list-style: none;
    padding: 0;
  }

  a {
    @include link();
  }

  .badge {
    float: right;
    width: var(--badge-size);
    height: var(--badge-size);
    margin-left: 1rem;
  }
</style>
