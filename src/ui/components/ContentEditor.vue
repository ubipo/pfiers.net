<template>
  <div class="card-column">
    <article class="card">
      <div class="card__content">
        <h1 class="page-title">Content editor</h1>
        <MarkdownFromDef :definition="description"></MarkdownFromDef>
        <div ref="cmInputContRef"></div>
        <h2>Parsed data</h2>
        <div v-show="error === null" ref="cmOutputContRef"></div>
        <div v-if="error !== null">
          <p class="error__title">
            An error occured while trying to update the site content:
          </p>
          <p class="error__msg">{{ error.name }}: </p>
          <p class="error__msg">{{ error.message }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import MarkdownFromDef from './MarkdownFromDef.vue'
import { computed, defineComponent, onMounted, Ref, ref } from "vue"
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/yaml/yaml";
import "codemirror/mode/javascript/javascript";
import { contentToYAML, YAMLToConent, serializeContent } from "@/content/deserialize";
import { Content } from "@/content/types";
import { cloneDeep } from "lodash";
import YAML from 'yaml'
import { CHANGE_CONTENT_EVENT } from './Main.vue';


export default defineComponent({
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const cmInputContRef = ref<HTMLDivElement | null>(null)
    const cmOutputContRef = ref<HTMLDivElement | null>(null)

    const errorRef = ref<string | null>(null)

    onMounted(() => {
      const cmInputCont = cmInputContRef.value
      if (cmInputCont === null) {
        throw new Error("Ref to codemirror input div is not populated")
      }
      const editor = CodeMirror(cmInputCont, {
        lineNumbers: true,
        mode: "yaml",
        value: contentToYAML(props.content as Content)
      })
      const cmOutputCont = cmOutputContRef.value
      if (cmOutputCont === null) {
        throw new Error("Ref to codemirror output div is not populated")
      }
      const output = CodeMirror(cmOutputCont, {
        readOnly: true,
        mode: {
          name: "javascript",
          json: true
        }
      })

      function editorChangeHandler() {
        const yaml = editor.getDoc().getValue()
        let content: Content;
        try {
          content = YAMLToConent(yaml)
        } catch (error) {
          errorRef.value = error
          return
        }
        errorRef.value = null
        const sContent = serializeContent(content)
        output.getDoc().setValue(JSON.stringify(sContent, null, 2))
        ctx.emit(CHANGE_CONTENT_EVENT, content)
      }
      editor.on('change', editorChangeHandler)
      editorChangeHandler()
    })

    const editorDescription = computed(() => props.content.editor.description)

    return { cmInputContRef, cmOutputContRef, error: errorRef, description: editorDescription }
  },
  components: { MarkdownFromDef }
})
</script>

<style lang="scss" scoped>
@import '@/ui/style/error.scss';


</style>
