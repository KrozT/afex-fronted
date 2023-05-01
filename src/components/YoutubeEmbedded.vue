<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: '560',
  },
  height: {
    type: String,
    default: '315',
  },
  iframeClass: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <iframe :width="width" :height="height"
          :src="modelValue" :class="iframeClass"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen />
</template>

<style scoped>

</style>
