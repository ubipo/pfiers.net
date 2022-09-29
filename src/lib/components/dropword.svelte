<script lang="ts">
  export let text: string
</script>

<span>{text}</span>

<style lang="scss">
  span {
    @include titleText();
    font-size: 24pt;
    margin-right: 0.2em;
  }
</style>
