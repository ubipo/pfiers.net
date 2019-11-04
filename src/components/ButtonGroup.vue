<template>
  <ul v-if="links.length > 0" class="button-group">
    <SmartLink
      v-for="link in links"
      :key="link.name"
      :to="link.location"
      class="button-group__text"
    >
      {{ link.name }}
    </SmartLink>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import SmartLink from './SmartLink.vue'

@Component({
  components: {
    SmartLink
  }
})
export default class ProjectShort extends Vue {
  @Prop(Array) links!: { location: URL | string; name: string }[]
}
</script>

<style lang="scss" scoped>
@import '../style/style.scss';

.button-group {
  @include text;
  display: inline-block;
  background-color: $primary-color;
  border-radius: 28px;
  cursor: pointer;
  margin-bottom: 2em;
  box-shadow: 6px 4px 12px 0px rgba(0, 0, 0, 0.75);
  padding: 0;
  list-style-type: none;

  .button-group__text {
    display: inline-block;
    color: #ffffff;
    font-size: 16px;
    text-decoration: none;
    padding: 10px 25px;

    &:not(:last-child) {
      border-right-style: solid;
      border-right-width: thin;
    }

    &:not(:first-child) {
      border-left-style: solid;
      border-left-width: thin;
    }
  }
}
</style>
