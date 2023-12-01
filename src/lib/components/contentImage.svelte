<script lang="ts">
  import Image from "./image.svelte";
	import type { ImageDefinition } from "$lib/service/content/model";


  export let definition: ImageDefinition
</script>

<Image href={definition.href} text={definition.alt} />
