<script setup lang="ts">
import {
  GlobeAltIcon, ComputerDesktopIcon, SunIcon, MoonIcon,
} from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useApplicationStore } from '@/stores/applicationStore';

/**
 * Obtain the theme and language from the platform store.
 */
const applicationStore = useApplicationStore();
const { language, theme } = storeToRefs(applicationStore);

/**
 * Obtain the available locales from the i18n plugin.
 */
const { availableLocales } = useI18n();

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

/**
 * Resolve language display name.
 * @param locale
 */
const localeDisplayName = (locale: string) => {
  const languageCode = locale.split('-')[0].toLowerCase();
  const displayNames = new Intl.DisplayNames([languageCode], { type: 'language' });
  const languageName = displayNames.of(locale);

  return languageName?.charAt(0).toUpperCase()
    .concat(languageName?.slice(1));
};
</script>

<template>
  <div class="navbar bg-base-200 rounded-box">
    <div class="navbar-start">
      <router-link class="btn btn-ghost" to="/">
        <div class="font-title inline-flex text-lg md:text-2xl">
          <span>{{ applicationStore.appName }}</span>
        </div>
      </router-link>
    </div>
    <div class="navbar-end">
      <div class="justify-end flex space-x-2">
        <div class="input-group">
        <span>
          <globe-alt-icon class="h-8 w-8" />
        </span>
          <select class="select max-w-fit" v-model="language">
            <option v-for="locale in availableLocales" :key="locale" :value="locale">
              {{ localeDisplayName(locale) }}
            </option>
          </select>
        </div>
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
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
