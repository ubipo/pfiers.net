<script lang="ts">
  export let href: string
  export let title: string | undefined
</script>

<a {href} {title}><slot></slot></a>

<style lang="scss">
  a {
    @include link();
  }
</style>
