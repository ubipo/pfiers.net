<script>
	import { browser } from "$app/environment";
	import { page } from "$app/stores";
	import { get } from "svelte/store";
	import NotFound from "./notFound.svelte";

    $: path = browser ? get(page).url.pathname : undefined;
</script>

<NotFound {path} />
