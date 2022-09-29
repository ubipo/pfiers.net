<script lang="ts">
	import { DEFAULT_ICON_SIZE } from "$lib/service/spriteIcons";


  export let iconId: string
  export let size = DEFAULT_ICON_SIZE
</script>

<svg style:--icon-size={size}>
  <use href={`#${iconId}`} />
</svg>

<style lang="scss">
  svg {
    height: var(--icon-size);
    width: var(--icon-size);
  }
</style>
