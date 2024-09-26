import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AppLayout from '@/layouts/AppLayout.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Index.vue'),
      meta: { layout: DefaultLayout }
    },
    {
      path: '/desktop',
      name: 'desktop',
      component: () => import('@/views/Desktop.vue'),
      meta: { layout: DefaultLayout }
    },
    {
      path: '/terminal',
      name: 'terminal',
      component: () => import('@/views/Terminal.vue'),
      meta: { layout: DefaultLayout }
    },
    {
      path: '/app',
      name: 'app',
      component: () => import('@/views/app/AppIndex.vue'),
      meta: { layout: AppLayout  }
    }
    
  ]
    
});

export default router;