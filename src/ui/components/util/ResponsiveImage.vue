<template>
  <div>
    <figure>
      <source
        v-for="source in imgData.sources"
        :key="source.srcSet"
        :type="source.mimeType"
        :srcset="source.srcSet">
      <img :src="imgData.src" :title="title" :alt="alt" />
    </figure>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { responsiveImageData } from '@/responsiveImages';

export default defineComponent({
  props: {
    url: {
      type: [String, Object],
      required: true
    },
    title: {
      type: String,
      required: false
    },
    alt: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const imgData = responsiveImageData(props.url as string | URL)
    return { imgData, title: props.title, alt: props.alt }
  },
  components: { }
})
</script>
