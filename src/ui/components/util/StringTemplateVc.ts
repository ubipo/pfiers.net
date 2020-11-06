import { createVNode, defineComponent } from 'vue'


export default function createStringTemplateVc(components: any) {
  return defineComponent({
    name: 'DyanmicVc',
    props: {
      content: {
        type: String,
        required: true
      }
    },
    components,
    setup(props, ctx) {
      return () => {
        const content = props.content || '<p class="not-available-text">No content</p>'
        return createVNode({
          name: 'DynamicVcContent',
          components: components,
          template: content
        })
      }
    }
  })
}
