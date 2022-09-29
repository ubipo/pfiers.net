<script lang="ts">
  import type { Technology } from "$lib/service/content/model";
	import TechnologyBadge from "./technologyBadge.svelte";


  export let title: string
  export let technologies: Technology[]
</script>

<h2>{title}</h2>
<div class="technologies">
  {#each technologies as technology}
    <div class="technology">
      <TechnologyBadge technology={technology} />
      <h3>{technology.name}</h3>
    </div>
  {/each}
</div>

<style lang="scss">
  h2 {
    margin-top: 0.1em;
  }

  .technologies {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(11.3rem, 1fr));
    justify-content: space-between;
  }

  .technology {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.6rem;
    margin-right: 1.2rem;

    & > h3 {
      margin: 0px;
      margin-left: 0.6em;
    }
  }
</style>
