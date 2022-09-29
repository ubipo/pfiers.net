<script lang="ts">
  import type { Technology } from "$lib/service/content/model";
  import TechnologyBadge from "$lib/technologyBadge.svelte";


  export let technologies: Technology[]
</script>

<ul>
  {#each technologies as technology}
    <li><TechnologyBadge technology={technology} /></li>
  {/each}
</ul>

<style lang="scss">
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0 0 5px 5px;
  }
</style>
