import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

/**
 * Create a Pinia store
 */
const pinia = createPinia();

/**
 * Use the pinia plugin to persist the state
 */
pinia.use(piniaPluginPersistedstate);

export default pinia;
