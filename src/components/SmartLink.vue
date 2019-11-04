<template>
  <router-link v-if="isRelative" :to="toUrl.pathname">
    <slot>{{ toUrl.pathname }}</slot>
  </router-link>
  <a v-else :href="toUrl.href">
    <slot>{{ toUrl.href }}</slot>
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SmartLink extends Vue {
  @Prop(undefined) to!: URL | string
  @Prop({ required: false, type: String }) text: string | undefined

  get isRelative() {
    return this.toUrl.host === document.location.host
  }

  get toUrl() {
    return new URL(this.to.toString(), document.location.href)
  }
}
</script>

<style lang="scss" scoped></style>
