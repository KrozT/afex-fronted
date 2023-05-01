import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/routes';

const router = createRouter({
  routes,
  history: createWebHistory(),
});

/**
 * Add title to the page if it is defined in the route
 * Prefer use of a meta library for this but this is a simple solution
 */
router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = `${to.meta.title} - ${import.meta.env.VITE_APP_NAME}`;
  next();
});

export default router;
