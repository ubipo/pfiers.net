<script lang="ts">
  import Image from "./image.svelte";
	import type { ContentImageDefinition, ImageDefinition } from "$lib/service/content/model";


  export let definition: ImageDefinition
  const contentImage = definition as ContentImageDefinition
</script>

<Image
  href={definition.url}
  meta={contentImage.meta}
  placeholder={contentImage.placeholder}
  text={contentImage.alt} />
