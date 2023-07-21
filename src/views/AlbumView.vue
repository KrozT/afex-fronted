<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { onSnapshot, query, orderBy } from 'firebase/firestore';
import AddVideo from '@/components/AddVideoComponent.vue';
import VideoItem from '@/components/VideoItemComponent.vue';
import { useDatabase } from '@/composables/database';
import { Video } from '@/models/videoModel';

/**
 * Firestore database
 */
const db = useDatabase();

/**
 * Create a new album array and a snapshotCreated state
 */
const album = ref<Video[]>([]);
const snapshotCreated = ref(false);

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
</script>

<template>
  <div id="album-view">
    <div class="flex justify-center w-screen sm:mt-10 inset-0 sticky top z-50">
      <div class="card w-full lg:w-3/4 bg-base-300 rounded-none">
        <div class="card-body">
          <add-video />
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
