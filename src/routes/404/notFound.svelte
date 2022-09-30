<script lang="ts">
export let path: string | undefined
</script>

<svelte:head>
    <title>Not Found</title>
</svelte:head>

<article>
    <h1>Not Found 🔍🤔</h1>
    <p>
        This page could not be 
        found{#if path !== undefined}: <code>{path}</code>{:else}.{/if}
    </p>
</article>

<style lang="scss">
    article {
        @include card();
    }
</style>
