<script lang="ts">
	import { getSystemTheme, getThemeStore, OVERRIDE_STARRY_NIGHT_THEME } from "$lib/service/themeStore";
	import ColumnGrid from "$lib/components/columnGrid.svelte";
  import { isFillerProject, type Project } from "$lib/service/content/model";
  import ProjectShort from "$lib/components/projectShort.svelte";
	import TechnologyIcon from "$lib/components/spriteIcon.svelte";
	import { DEFAULT_ICON_SIZE } from "$lib/service/spriteIcons";
	import type { ColumnGridItem } from "$lib/components/ColumnGridItem";


  export let projects: Project[]

  const columnGridItems: ColumnGridItem[] = projects.map(project => ({
    component: ProjectShort,
    props: { project },
  }))

  const iconSize = DEFAULT_ICON_SIZE

  const themeStore = getThemeStore()

  function toggleNightStarry() {
    themeStore.update((theme) => {
      if (theme == OVERRIDE_STARRY_NIGHT_THEME) return getSystemTheme()
      return OVERRIDE_STARRY_NIGHT_THEME
    })
  }
</script>

<ColumnGrid items={columnGridItems} filter={item => !isFillerProject(item.props.project)}>
  <button style:--icon-size={iconSize} class="icon" on:click={toggleNightStarry}>
    <TechnologyIcon iconId="stars" size={iconSize} />
  </button>
  <h1>Projects</h1>
  <p>
    These are some of my bigger projects. I also have a 
    <a href="https://github.com/ubipo/">GitHub</a> with all these and
    more ✨
  </p>
</ColumnGrid>

<style lang="scss">
  a {
    @include link();
  }

  p {
    margin-top: 6pt;
  }

  button.icon {
    float: right;
    display: block;
    border: none;
    cursor: default;
    padding: 0;
    background-color: $primary-color;
    height: var(--icon-size);
    width: var(--icon-size);
  }
</style>
