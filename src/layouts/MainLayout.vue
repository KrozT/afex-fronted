<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { onMounted, watch } from 'vue';
import NavBar from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { useApplicationStore } from '@/stores/applicationStore';

/**
 * Obtain the app name and company name from the environment variables.
 * If they are not defined, use the default values.
 */
const appName: string = import.meta.env.YAULT_APP_NAME || 'Yault';
const companyName: string = import.meta.env.YAULT_COMPANY_NAME || 'ACME Industries Ltd.';

/**
 * Initialize the platform store.
 * This will be used to obtain the platform info on another components using the usePlatformStore hook.
 */
const applicationStore = useApplicationStore();
applicationStore.definePlatform(appName, companyName);

/**
 * Obtain the theme and language from the platform store.
 */
const { theme, language } = storeToRefs(applicationStore);

/**
 * Obtain the locale and available locales from the i18n plugin.
 */
const { locale } = useI18n();

/**
 * Watch for changes in the language and update the locale accordingly.
 */
watch(language, (value) => {
  locale.value = value;
});

/**
 * Check if the language is not the default one and update the locale accordingly.
 * If the language is the default one, update the language accordingly.
 */
onMounted(() => {
  if (language.value !== 'default') locale.value = language.value;
  else language.value = locale.value;
});
</script>

<template>
  <div class="min-h-screen bg-base-300 py-8 px-8" v-bind:data-theme="theme">
    <!-- Navbar -->
    <nav-bar />
    <!-- Main content -->
    <router-view class="flex-auto px-6 py-8" />
    <!-- Footer -->
    <footer-component :company-name="companyName" />
  </div>
</template>

<style scoped>

</style>
