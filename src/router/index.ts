import { createRouter, createWebHistory } from 'vue-router';
import ImagesView from '../views/ImagesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ImagesView,
    },
    {
      path: '/image/:id?',
      name: 'image',
      component: () => import('../views/ImageView.vue'),
    },
  ],
});

export default router;
