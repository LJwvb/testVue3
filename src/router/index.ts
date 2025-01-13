import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test.vue'),
    },
    {
      path:'/demo',
      name: 'demo',
      component: () => import('@/views/Demo.vue'),
    }
  ],
})

export default router
