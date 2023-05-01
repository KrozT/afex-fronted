<script setup lang="ts">
import { computed } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

/**
 * Modal properties
 */
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  modalClass: {
    type: String,
    required: false,
  },
});

/**
 * Emit update:modelValue event
 */
const emit = defineEmits(['update:modelValue']);

/**
 * Lifecycle hook for visibility state
 */
const visibilityState = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

/**
 * Close modal
 */
const closeModal = () => {
  visibilityState.value = false;
};
</script>

<template>
  <input type="checkbox" id="modal-component" class="modal-toggle" v-model="visibilityState" />
  <div class="modal">
    <div class="modal-box relative" :class="modalClass">
      <button class="btn btn-square btn-sm btn-ghost absolute right-2 top-2" @click="closeModal">
        <x-mark-icon class="w-5 h-5" />
      </button>
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped>

</style>
