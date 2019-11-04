import { Component, AsyncComponent } from 'vue'
import Vue from 'vue'

function DynamicVcFactory(components: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: Component<any, any, any, any> | AsyncComponent<any, any, any, any>
}) {
  return Vue.component('DyanmicVc', {
    components: components,
    props: {
      content: {
        type: String,
        required: true
      }
    },
    render: function(createElement) {
      const content = this.content || '<p class="not-available-text">No content</p>'
      return createElement({
        name: 'hey',
        components: components,
        template: content
      })
    }
  })
}

export default DynamicVcFactory
