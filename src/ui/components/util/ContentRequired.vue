<template>
  <CardColumn v-if="p.content === null">
    <template v-slot:first-item>
      <div v-if="p.contentTask.last === undefined || p.contentTask.last.isRunning" class="loading-msg">
        <p class="loading-msg__text">Loading site content...</p>
        <div class="loading-msg__spinner"><div></div></div>
      </div>
      <div v-else-if="p.contentTask.last.isError" class="error">
        <p class="error__title">
          An error occured while trying to load the site content:
        </p>
        <p class="error__msg">{{ p.contentTask.last.error.name }}: </p>
        <p class="error__msg">{{ p.contentTask.last.error.message }}</p>
        <button v-on:click="performContentTask()">Try again</button>
      </div>
    </template>
  </CardColumn>
  <template v-else>
    <component :is="p.componentName" v-bind="componentProps"></component>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { PERFORM_CONTENT_TASK_EVENT } from '@/ui/components/events'
import CardColumn from '../layout/CardColumn.vue'


export default defineComponent({
  props: {
    contentTask: {
      type: Object,
      required: true
    },
    content: {
     required: true,
    },
    componentName: {
      type: String,
      required: true
    },
    propsFn: {
      type: Function,
      required: true
    },
    metadataUpdateFn: {
      type: Function,
      required: true
    }
  },
  setup(props, ctx) {
    if (typeof props.content !== 'object') {
      throw new Error("Prop `content` must be an object")
    }
    watch(() => props.content, content => {
      props.metadataUpdateFn(content)
    })

    const performContentTask = () => {
      /* We can't perform the content task here.
      If we did, it would be cancelled when we leave
      this route. Make main perform it instead. */
      ctx.emit(PERFORM_CONTENT_TASK_EVENT)
    }
    if (props.contentTask.last === undefined) {
      performContentTask()
    }
    const componentProps = computed(() => props.propsFn(props.content))
    return { p: props, componentProps, performContentTask }
  },
  components: { CardColumn }
})
</script>

<style lang="scss" scoped>
@import '@/ui/style/style.scss';
@import '@/ui/style/spinner.scss';
@import '@/ui/style/error.scss';

.loading-msg__text {
  text-align: center;
  font-style: italic;
}

.loading-msg__spinner {
  @include spinner('loading-msg__spinner--animation', $primary-color);
}
</style>
