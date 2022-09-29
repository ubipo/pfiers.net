<script lang="ts">
	import type { Technology } from "$lib/service/content/model";
  import TechnologyBadge from "$lib/components/technologyBadge.svelte";
	import { DEFAULT_ICON_SIZE } from "$lib/service/spriteIcons";


  export let technologies: Technology[]

  const iconsSize = DEFAULT_ICON_SIZE
</script>

<ul class="technology-icons" style:--icon-size={iconsSize}>
  {#each technologies as technology}
    <li><TechnologyBadge {technology} /></li>
  {/each}
</ul>

<style lang="scss">
  .technology-icons {
    float: right;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    justify-content: flex-end;
    margin: 0 0 1em 1em;
    padding: 0;

    max-width: var(--icon-size);

    @media screen and (min-width: 25rem) {
      max-width: calc((var(--icon-size) + 5px) * 2);
    }

    & > li {
      width: var(--icon-size);
      height: var(--icon-size);
      margin: 0 0 5px 5px;
    }
  }
</style>
