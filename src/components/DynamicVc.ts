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
      const content = `<div>${this.content}</div>` || '<div></div><p class="not-available-text">No content</p>'
      return createElement({
        name: 'DynamicVcContent',
        components: components,
        template: content
      })
    }
  })
}

export default DynamicVcFactory
