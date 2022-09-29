<script lang="ts">
  import Nav from "./nav.svelte";

  import "../styles/main.scss"
  import bgBalaIsohypse from "$lib/assets/img/bala-isohypse.svg"
  import bgCarinaNebula from "$lib/assets/img/carina-nebula.webp"
	import { derived } from "svelte/store";
	import { OverrideTheme, getThemeStore, OVERRIDE_STARRY_NIGHT_THEME } from "$lib/service/themeStore";
  import technologyIconsSprite from "$lib/assets/img/icons/sprite.svg?raw";


  const themeStore = getThemeStore();
  
  const bg = derived(
    themeStore,
    theme => theme === OVERRIDE_STARRY_NIGHT_THEME ? bgCarinaNebula : bgBalaIsohypse
  )
  const darkThemeOverride = derived(
    themeStore,
    theme => theme instanceof OverrideTheme && theme.isDark
  )
  const lightThemeOverride = derived(
    themeStore,
    theme => theme instanceof OverrideTheme && theme.isDark
  )
</script>

<div
  class="page-wrap"
  class:dark-theme-override={$darkThemeOverride}
  class:light-theme-override={$lightThemeOverride}>
  <Nav />
  <div class="main-wrap" style:--bg="url({$bg})">
    <main>
      <slot></slot>
    </main>
  </div>
</div>

{@html technologyIconsSprite}

<style lang="scss">
  .page-wrap {
    min-height: 100%;
    display: flex;
    flex-flow: column;
  }

  .main-wrap {
    @include layoutBg();
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    background-image: var(--bg);
    background-size: 100vw; // Ignore scrollbar

    main {
      z-index: 100; // For nav shadow
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      margin: $card-vmargin $card-hmargin;
    }
  }

  /* object {
    display: none;
  } */
</style>
