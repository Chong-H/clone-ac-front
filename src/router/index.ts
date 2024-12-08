import { createRouter, createWebHistory } from 'vue-router'
import UserManageView from '@/views/UserManageView.vue'
import DigitalCollectibleView from '@/views/DigitalCollectibleView.vue'
import UserLoginView from '@/views/UserLoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: UserLoginView,
    },
    {
      path: '/user-view',
      name: 'user-view',
      component: UserManageView,
    },
    {
      path: '/digital-collectible-view',
      name: 'digital-collectible-view',
      component: DigitalCollectibleView,
    }
  ],
})

export default router
