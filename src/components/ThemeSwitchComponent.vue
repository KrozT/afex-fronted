<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { useApplicationStore } from '@/stores/applicationStore';

/**
 * Obtain the theme and language from the platform store.
 */
const applicationStore = useApplicationStore();
const { theme } = storeToRefs(applicationStore);

/**
 * Icon map for the theme selector.
 */
const iconMap = {
  default: ComputerDesktopIcon,
  light: SunIcon,
  dark: MoonIcon,
};

/**
 * Resolve the current icon based on the chosen theme.
 */
const currentIcon = computed(() => iconMap[theme.value]);
</script>

<template>
  <div class="input-group">
    <span>
      <component :is="currentIcon" class="h-8 w-8" />
    </span>
    <select class="select max-w-fit" v-model="theme">
      <option value="default">
        {{ $t('header.themes.system') }}
      </option>
      <option value="dark">
        {{ $t('header.themes.dark') }}
      </option>
      <option value="light">
        {{ $t('header.themes.light') }}
      </option>
    </select>
  </div>
</template>

<style scoped>

</style>
