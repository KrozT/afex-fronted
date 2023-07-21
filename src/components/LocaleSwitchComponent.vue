<script setup lang="ts">
import { GlobeAltIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useApplicationStore } from '@/stores/applicationStore';

/**
 * Obtain the theme and language from the platform store.
 */
const applicationStore = useApplicationStore();
const { language } = storeToRefs(applicationStore);

/**
 * Obtain the available locales from the i18n plugin.
 */
const { availableLocales } = useI18n();

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
</template>

<style scoped>

</style>
