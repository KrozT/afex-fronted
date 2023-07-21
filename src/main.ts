import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import pinia from '@/stores';
import i18n from '@/i18n';

/**
 * Create the Vue app instance.
 */
const app = createApp(App);

/**
 * Mount the Vue router to the app.
 */
app.use(router);

/**
 * Mount the Vue pinia to the app.
 */
app.use(pinia);

/**
 * Mount the Vue i18n to the app.
 */
app.use(i18n);

/**
 * Mount the app to the DOM.
 */
app.mount('#app');
