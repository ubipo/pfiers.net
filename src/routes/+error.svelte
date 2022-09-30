<script>
    import { page } from '$app/stores';
	import NotFound from './404/notFound.svelte';
</script>

{#if $page.status === 404}
    <NotFound path={$page.url.pathname} />
{:else}
    {#if $page.error !== null}
        <h1>{$page.error.message}</h1>
        <p>Status code {$page.status}</p>
    {/if}
{/if}
