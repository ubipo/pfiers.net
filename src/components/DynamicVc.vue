<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'
import { memoize } from 'lodash'

// First arg (content) is used as cache key
const renderer = memoize((content: string, createElement: CreateElement) => {
  return createElement(Vue.compile(content))
})

@Component({
  render(createElement: CreateElement): VNode {
    return renderer((this as DyanmicVue).content, createElement)
  }
})
export default class DyanmicVue extends Vue {
  @Prop({ type: String, required: true }) content!: string
}
</script>
