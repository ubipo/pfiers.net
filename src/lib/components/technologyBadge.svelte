<script lang="ts">
  import type { Technology } from "$lib/service/content/model"
	import TechnologyIcon from "./spriteIcon.svelte";
	import { DEFAULT_ICON_SIZE } from "$lib/service/spriteIcons";


  export let technology: Technology
  export let size = DEFAULT_ICON_SIZE
</script>

<a
  href={`/technologies/${technology.urlSafeName}`}
  style:--icon-size={size}
  aria-label="Read about {technology.name}"
  title="Read about {technology.name}">
  <TechnologyIcon size={size} iconId={technology.icon} />
</a>

<style lang="scss">
  a {
    display: block;
    background-color: $primary-color;
    height: var(--icon-size);
    width: var(--icon-size);
  }
</style>
