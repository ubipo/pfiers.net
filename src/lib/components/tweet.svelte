<script lang="ts">
	import SpriteIcon from "./spriteIcon.svelte";

  export let url: string
  export let name: string
  export let username: string
  export let dateTime: string


  $: profileImageUrl = undefined as string | undefined
  $: {
    import(
      `$lib/assets/img/twitter-profile-images/${username}.png`
    ).then(module => { profileImageUrl = module.default })
  }
</script>

<article>
  <div on:click={() => window.open(url, "_blank")}>
    <div class="top">
      <a class="user" href="https://twitter.com/{username}">
        <img src={profileImageUrl} alt={name} />
        <div class="user-name">
          <a href={url} target="_blank">{name}</a>
          <span>@{username}</span>
        </div>
      </a>
      <a href={url}><SpriteIcon iconId="twitter" size="1.5rem" /></a>
    </div>
    <div on:click={e => e.stopImmediatePropagation()}><slot /></div>
    <a class="dateTime" href={url}>{dateTime}</a>
  </div>
</article>

<style lang="scss">
  article {
    max-width: 35rem;
    border-radius: 0.75rem;
    border-color: rgb(207, 217, 222);
    border-width: 1px;
    border-style: solid;

    & > div {
      display: block;
      padding: 1rem;
      text-decoration: none;
    }
  }

  .top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .user {
    display: flex;
    align-items: center;
    text-decoration: none;

    & > img {
      width: 3rem;
      height: 3rem;
    }
  }

  .user-name {
    @include text();
    margin-left: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > a {
      font-weight: bold;
      font-size: 1.2rem;
      @include themeSwitchProperties(color, rgb(15, 20, 25), rgb(243, 244, 245));
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    & > span {
      font-weight: normal;
      font-size: 0.8rem;
      @include themeSwitchProperties(color,  rgb(83, 100, 113), rgb(217, 228, 236));
      text-decoration: none;
    }
  }

  .dateTime {
    @include text();
    font-size: 0.8rem;
    @include themeSwitchProperties(color, rgb(83, 100, 113), rgb(217, 228, 236));
    margin-top: 0.5rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
