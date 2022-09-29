<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'
  import type { marked } from 'marked'
	import Dropword from './dropword.svelte';
	import Link from './link.svelte';
	import Image from './image.svelte';
	import { getCustomOptions } from '$lib/service/markdown';
	import Tweet from './tweet.svelte';


  export let tokens: marked.TokensList

  const options = getCustomOptions()
  const renderers: any = {
    dropword: Dropword,
    tweet: Tweet,
    link: Link,
    image: Image
  }
</script>

<SvelteMarkdown source={tokens} {options} {renderers} />
