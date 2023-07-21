<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps({
  companyName: {
    type: String,
    required: true,
  },
});

/**
 * Obtain the current year.
 */
const currentYear = new Date().getFullYear();

/**
 * Obtain the i18n plugin.
 */
const { t } = useI18n();
</script>

<template>
  <footer class="footer footer-center p-4 text-base-content">
    <div>
      <p>{{ t('footer.text', { currentYear, companyName}) }}</p>
    </div>
  </footer>
</template>

<style scoped>

</style>
