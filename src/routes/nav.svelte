<script lang="ts">
  import { page } from '$app/stores';
	import ThemeSwitcher from '$lib/components/themeSwitcher.svelte';
  import { derived } from 'svelte/store';

  const routes = [
    { name: 'Pieter Fiers', abrv: 'PF', path: '/', isHeading: true },
    { name: 'Projects', abrv: 'Proj', path: '/projects', matchSubroutes: true },
    { name: 'Technologies', abrv: 'Tech', path: '/technologies', matchSubroutes: true }
  ]

  const activeRoutes = derived(page, $page => {
    return routes.filter(route => {
      if (route.matchSubroutes === true) {
        return $page.url.pathname.startsWith(route.path);
      }
      return $page.url.pathname === route.path;
    });
  })
</script>

<div class="cont">
  <div class="buffer"></div>
  <nav>
    <ul>
      {#each routes as route}
        <li
          class:heading={route.isHeading}
          class:active={$activeRoutes.includes(route)}>
          <a class="full" href="{route.path}">{route.name}</a>
          <a class="abrv" href="{route.path}">{route.abrv}</a>
        </li>
      {/each}
    </ul>
  </nav>
  <div class="buffer buffer-right">
    <div><ThemeSwitcher /></div>
    <div></div>
  </div>
</div>

<style lang="scss">
  .cont {
    display: flex;
    justify-content: center;
  }

  nav {
    @include textBg();
    flex-grow: 1;
    width: 100%;
    max-width: 70rem;
  }

  // To conver box shadow on sides
  .buffer {
    @include textBg();
    flex-grow: 1;
    z-index: 10;
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, 0.4);
    position: relative;
  }

  a {
    @include titleText();
    display: block;
    font-family: $title-font-stack;
    font-weight: 500;
    font-size: 2rem;
    text-decoration: none;
    width: 100%;
    height: 100%;
    outline: none;

    padding-bottom: calc(0.5rem + 3px);
    /* padding-top: calc(1rem + 3px); */
    padding-top: 1rem;
    border-bottom: 3px solid $primary-color;

    &:focus-visible,
    &:hover {
      padding-bottom: 0.5rem;
      padding-top: 1rem;
      border-bottom: 3px solid $secondary-color;
/* 
      transition-property: padding-bottom, padding-top, border-bottom;
      transition-delay: 0.5s;
      transition-timing-function: linear; */
    }

    &:focus-visible {
      outline: 2px dashed $secondary-color;
      -webkit-outline: 2px dashed $secondary-color;
      -moz-outline: 2px dashed $secondary-color;
      -ms-outline: 2px dashed $secondary-color;
      -o-outline: 2px dashed $secondary-color;
    }
  }

  .heading > a {
    font-weight: 700;
  }

  li {
    flex-grow: 1;
    text-align: center;
    list-style: none;
    position: relative;

    &.active {
      flex-grow: 1.4;

      > a {
        @include textColorSecondary();
        padding-bottom: 0.5rem !important;
        border-bottom: 5px solid $secondary-color !important;
      }
    }

    &::after {
      content: '';
      position: absolute;
      display: block;
      width: 100%;
      height: 10px;
      top: -10px;
      border-radius: 50%;

      box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0);
      visibility: hidden;
      transition: box-shadow 0.3s;
    }

    &:hover::after {
      box-shadow: 0px 3px 4px 0px color.change($secondary-color, $alpha: 0.3);
      visibility: visible;
    }
  }

  a {
    &.full { display: none; }
    &.abrv { display: block; }
  }

  @media (min-width: 650px) {
    a {
      &.full { display: block; }
      &.abrv { display: none; }
    }
  }

  .buffer-right {
    display: flex;
    align-items: center;
    justify-content: end;

    > div:first-child {
      margin: 0 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    > div:last-child {
      flex-grow: 1;
      max-width: 1rem;
    }
  }
</style>
