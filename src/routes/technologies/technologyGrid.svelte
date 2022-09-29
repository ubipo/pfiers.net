<script lang="ts">
	import ColumnGrid from "$lib/components/columnGrid.svelte";
  import type { Technology } from "$lib/service/content/model";
  import TechnologyGroup from "$lib/components/technologyGroup.svelte";
	import TechnologyIcon from "$lib/components/spriteIcon.svelte";
	import { DEFAULT_ICON_SIZE } from "$lib/service/spriteIcons";
	import type { ColumnGridItem } from "$lib/components/ColumnGridItem";


  export let technologies: Technology[]

  interface ITechnologyGroup {
    title: string,
    technologies: Technology[],
  }

  const columnGridItems: ColumnGridItem[] = technologies.reduce((groups, technology) => {
    const group = groups.find(group => group.title === technology.group)
    if (group != undefined) {
      group.technologies.push(technology)
    } else {
      groups.push({
        title: technology.group,
        technologies: [technology],
      })
    }
    return groups
  }, [] as ITechnologyGroup[]).map(group => ({
    component: TechnologyGroup,
    props: group,
  }))

  const iconSize = DEFAULT_ICON_SIZE
</script>

<ColumnGrid items={columnGridItems}>
  <div class="icon" style:--icon-size={iconSize}>
    <TechnologyIcon iconId="gears" size={iconSize} />
  </div>
  <h1>Tech­nologies</h1>
  <p>
    These are some of my favorite technologies – and the ones I'm the most
    familiar with 👨‍💻
  </p>
  <p>
    Click on any technology for more information and for the projects I've used
    it in. I don't have projects to show for all of them though, and I didn't
    include the less exciting technologies... sorry relation databases :(
  </p>
</ColumnGrid>

<style lang="scss">
  p {
    margin-top: 6pt;
  }

  .icon {
    float: right;
    display: block;
    background-color: $primary-color;
    height: var(--icon-size);
    width: var(--icon-size);
  }
</style>
