<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDatabase } from '@/composables/database';
import { useApi } from '@/composables/api';
import { Video } from '@/models/videoModel';
import { useNotie } from '@/composables/notie';
import { Thumbnail } from '@/models/thumbModel';

/**
 * Video URL input
 */
const urlInput = ref<string>();

/**
 * Vue i18n
 */
const { t } = useI18n();

/**
 * Firestore database
 * @see https://firebase.google.com/docs/firestore
 */
const db = useDatabase();

/**
 * YouTube API
 * @see https://developers.google.com/youtube/v3/docs
 */
const api = useApi();

/**
 * Notie notifications
 * @see https://github.com/jaredreich/notie
 */
const notie = useNotie();

/**
 * Add a new video to the database
 */
const addVideo = async () => {
  /**
   * Check if the input is empty and show an alert
   */
  if (!urlInput.value) {
    notie.error(t('components.addVideo.alerts.empty'));
    return;
  }

  /**
   * Get the video ID from the URL
   */
  const videoId = api.resolveVideoId(urlInput.value);

  /**
   * Clear the input
   * Note: This is done before the API call to prevent the user from spamming the button
   */
  urlInput.value = '';

  /**
   * Check if the video ID is valid and show an alert
   */
  if (!videoId) {
    notie.error(t('components.addVideo.alerts.invalid'));
    return;
  }

  /**
   * Get the video data from the YouTube API
   */
  const request = await api.getVideoById(videoId)
    .then((res) => res.data.items[0])
    .catch((err) => console.error(err));

  /**
   * Check if the video exists
   * if it does, add it to the database, if not show an alert
   */
  if (!request) {
    notie.error(t('components.addVideo.alerts.nonExist'));
    return;
  }

  /**
   * Videos collection with prebuilt methods
   * Note: The collection is created if it doesn't exist
   */
  const collection = db.initializeCollection<Video>('videos');

  /**
   * Check if the video already exists in the database
   * if it does, show an alert, if not add it to the database
   */
  const exist = await collection.existsByField('id', request.id)
    .catch((err) => console.error(err));

  /**
   * Video already exists
   */
  if (exist) {
    notie.error(t('components.addVideo.alerts.exist'));
    return;
  }

  /**
   * Video object with type definition
   */
  const video: Video = {
    id: request.id,
    snippet: {
      channelId: request.snippet.channelId,
      channelTitle: request.snippet.channelTitle,
      description: request.snippet.description,
      publishedAt: request.snippet.publishedAt,
      thumbnail: api.resolveThumbnail(request.snippet.thumbnails) as Thumbnail,
      title: request.snippet.title,
    },
    contentDetails: {
      duration: request.contentDetails.duration,
    },
    addedAt: new Date(),
  };

  /**
   * Add the video to the database
   */
  await collection.setDocument(video)
    .then(() => {
      notie.success(t('components.addVideo.alerts.added'));
    })
    .catch((err) => {
      console.error(err);
      notie.error(t('global.alerts.apiError'));
    });
};
</script>

<template>
  <div class="form-control">
    <label class="label">
      <a class="text-2xl font-medium">{{ $t('components.addVideo.title') }}</a>
    </label>
    <div class="input-group">
      <input type="text" :placeholder="$t('components.addVideo.placeholder')"
             class="input input-bordered w-full h-14" autocomplete="off" v-model="urlInput" />
      <button class="btn btn-square btn-primary w-16 md:w-64 h-14" @click="addVideo">
        <a class="capitalize text-lg font-medium">{{ $t('components.addVideo.button') }}</a>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
