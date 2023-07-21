<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { onSnapshot, query, orderBy } from 'firebase/firestore';
import { useI18n } from 'vue-i18n';
import VideoItem from '@/components/VideoItemComponent.vue';
import { useDatabase } from '@/composables/database';
import { Video } from '@/models/videoModel';
import { useApi } from '@/composables/api';
import { useNotie } from '@/composables/notie';
import { Thumbnail } from '@/models/thumbModel';

/**
 * Firestore database
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
 * Create a new album array and a snapshotCreated state
 */
const album = ref<Video[]>([]);
const snapshotCreated = ref(false);

/**
 * Video URL input
 */
const urlInput = ref<string>();

/**
 * Vue i18n
 */
const { t } = useI18n();

/**
 * Get all videos from the database
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
onMounted(async () => {
  /**
   * Videos collection with type definition
   * Note: The collection is created if it doesn't exist
   */
  const collection = db.createCollection<Video>('videos');

  /**
   * Query the collection and order the videos by the date they were added (descending)
   */
  const queryOperation = query(collection, orderBy('addedAt', 'desc'));

  /**
   * Listen to the collection changes
   * It will be triggered every time a new video is added
   */
  onSnapshot(queryOperation, (snapshot) => {
    /**
     * Set the snapshotCreated state to true
     */
    snapshotCreated.value = true;

    /**
     * Sort the videos by the date they were added
     */
    album.value = snapshot.docs.map((doc) => doc.data() as Video);
  });
});

/**
 * Check if the album is empty by checking the length of the array and if the snapshot has been created
 * Computed properties are cached based on their reactive dependencies
 */
const isAlbumEmpty = computed(() => album.value.length === 0 && snapshotCreated.value);

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
  <div id="album-view">
    <div class="flex justify-center w-screen sm:mt-10 inset-0 sticky top z-50">
      <div class="card w-full lg:w-3/4 bg-base-300 rounded-none">
        <div class="card-body">
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
        </div>
      </div>
    </div>
    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" v-if="isAlbumEmpty">
      <div class="card">
        <div class="card-body">
          <h1 class="text-4xl font-bold text-center text-gray-500">
            {{ $t('views.album.empty') }}
          </h1>
        </div>
      </div>
    </div>
    <div class="flex justify-center h-full" v-else>
      <div class="card md:w-3/4 bg-base-300 rounded-none">
        <div class="card-body">
          <div class="grid lg:grid-cols-3 gap-5 lg:gap-16 w-full lg:px-24 lg:py-8">
            <video-item v-for="video in album" :key="video.id" :model-value="video" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
