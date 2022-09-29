<script lang="ts">
  import type { ColumnGridItem } from "./ColumnGridItem"


  type T = $$Generic<ColumnGridItem>
  export let items: T[]
  export let filter: (item: T) => boolean = () => true

  const itemsOrIntro = [undefined, ...items.map(item => ({ item }))]

  const columns = Array.from(Array(2).keys()).map(
    iColumn => itemsOrIntro.filter((_, i) => i % 2 === iColumn)
  )

  function shouldInclude(itemOrIntro: { item: T } | undefined): boolean {
    return itemOrIntro == undefined || filter(itemOrIntro?.item)
  }
</script>

<div class="single-column">
  {#each itemsOrIntro as itemOrIntro}
    {#if shouldInclude(itemOrIntro)}
      <article>
        {#if itemOrIntro == undefined}
          <slot />
        {:else}
          <svelte:component this={itemOrIntro.item.component} {...itemOrIntro.item.props}/>
        {/if}
      </article>
    {/if}
  {/each}
</div>

<div class="grid">
  {#each columns as column}
    <div class="grid-column">
      {#each column as itemOrIntro}
        {#if shouldInclude(itemOrIntro)}
          <article>
            {#if itemOrIntro == undefined}
              <slot />
            {:else}
              <svelte:component this={itemOrIntro.item.component} {...itemOrIntro.item.props}/>
            {/if}
          </article>
        {/if}
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .grid {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }

  .grid-column {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 36rem;
    
    &:not(:last-child) {
      margin-right: $card-margin;
    }
  }

  article {
    @include card();
    max-width: 100%;

    margin-bottom: $card-margin;
    &:last-child {
      margin-bottom: 0;
    }
  }

  // Responsive switch from single-column to grid
  .single-column { display: block; }
  .grid { display: none; }

  // 47 rem is just enough room for the the three pill buttons to not stack
  @media (min-width: 47rem) {
    .single-column { display: none; }
    .grid { display: flex; }
  }
</style>
