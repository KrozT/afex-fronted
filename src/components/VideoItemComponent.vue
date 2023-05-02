<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { useI18n } from 'vue-i18n';
import { Video } from '@/types/video';
import { useApi } from '@/composables/api';
import { useDatabase } from '@/composables/database';
import ModalComponent from '@/components/ModalComponent.vue';
import { useNotie } from '@/composables/notie';
import YoutubeEmbedded from '@/components/YoutubeEmbedded.vue';

/**
 * Video object with type definition
 */
const props = defineProps({
  modelValue: {
    type: Object as PropType<Video>,
    required: true,
  },
});

/**
 * Firebase database
 */
const db = useDatabase();

/**
 * Format duration function for nice display
 */
const { formatDuration, resolveURL } = useApi();

/**
 * Notie notifications
 */
const notie = useNotie();

/**
 * Vue i18n
 */
const { t } = useI18n();

/**
 * Modal state
 */
const deleteModal = ref(false);
const viewModal = ref(false);

/**
 * Video URL
 */
const videoURL = computed(() => resolveURL(props.modelValue?.id));

/**
 * Toggle modal visibility
 */
const toggleDeleteModal = () => {
  deleteModal.value = !deleteModal.value;
};

const toggleViewModal = () => {
  viewModal.value = !viewModal.value;
};

/**
 * Delete video from the database
 */
const deleteVideo = async () => {
  const collection = db.initializeCollection<Video>('videos');
  await collection.deleteDocumentsByField('id', props.modelValue?.id)
    .then(() => notie.info(t('components.videoItem.alerts.deleted')))
    .catch((error) => {
      console.error(error);
      notie.error(t('global.alerts.apiError'));
    });
};
</script>

<template>
  <div class="border-2 border-neutral-200 transition duration-500 ease-in-out
              transform hover:border-primary hover:-translate-y-1 hover:scale-110">
    <button class="btn btn-square btn-sm opacity-90 absolute right-0 m-2 bg-neutral-900 text-white"
            @click="toggleDeleteModal">
      <x-mark-icon class="w-5 h-5" />
    </button>
    <figure>
      <img :src="modelValue.snippet.thumbnail.url" alt="Thumbnail" @click="toggleViewModal" />
    </figure>
    <span class="absolute bottom-2 right-2 px-1 bg-neutral-900 opacity-90 text-white rounded">
      {{ formatDuration(modelValue.contentDetails.duration) }}
    </span>
  </div>
  <Teleport to="body">
    <modal-component v-model="deleteModal" modal-class="w-11/12 max-w-5xl">
      <p class="p-5 text-xl font-medium">{{ $t('components.videoItem.modals.delete.body') }}</p>
      <div class="modal-action">
        <button class="btn btn-primary btn-outline lg:btn-wide capitalize" @click="toggleDeleteModal">
          {{ $t('components.videoItem.modals.delete.buttons.cancel')}}
        </button>
        <button class="btn btn-primary lg:btn-wide capitalize" @click="deleteVideo">
          {{ $t('components.videoItem.modals.delete.buttons.confirm') }}
        </button>
      </div>
    </modal-component>
    <modal-component v-model="viewModal" modal-class="w-full md:w-11/12 max-w-5xl">
      <div class="flex flex-row pr-5">
        <div class="w-1/2 pr-2">
          <youtube-embedded v-model="videoURL" class="w-full h-full" />
        </div>
        <div class="w-1/2 m-2 flex h-52 md:h-72 overflow-auto">
          <div class="container">
            <p class="text-xl font-bold">{{ modelValue.snippet.title }}</p>
            <p class="text-lg pt-4">{{ modelValue.snippet.description }}</p>
          </div>
        </div>
      </div>
    </modal-component>
  </Teleport>
</template>

<style scoped>

</style>
