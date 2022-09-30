<script>
    import { page } from '$app/stores';
	import NotFound from './404/notFound.svelte';
</script>

{#if $page.status === 404}
    <NotFound path={$page.url.pathname} />
{:else}
    <article>
        {#if $page.error !== null}
            <h1>{$page.error.message}</h1>
            <p>Status code {$page.status}</p>
        {:else}
            <h1>Unknown error</h1>
            <p>Status code {$page.status}</p>
        {/if}
    </article>
{/if}

<style lang="scss">
    article {
        @include card();
    }
</style>
