import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'album-view',
        component: () => import('@/views/AlbumView.vue'),
        meta: {
          title: 'Album',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      path: '/',
      name: 'album-view',
    },
  },
];

export default routes;
