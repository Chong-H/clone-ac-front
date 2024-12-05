import { createRouter, createWebHistory } from 'vue-router'
import UserView from '@/views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user-view',
      component: UserView,
    },
  ],
})

export default router
