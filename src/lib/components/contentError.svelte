<script lang="ts">
  export let contentError: unknown
</script>

<p>Error loading site content: </p>
<p class="error">
  {#if contentError != undefined}
    {contentError}
  {:else}
    <i>Unkown error</i>
  {/if}
</p>

<style lang="scss">
  p.error {
    @include errorText();
  }
</style>
