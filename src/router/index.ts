import { createRouter, createWebHistory } from 'vue-router'
import UserManageView from '@/views/UserManageView.vue'
import DigitalCollectibleView from '@/views/DigitalCollectibleView.vue'
import UserLoginView from '@/views/UserLoginView.vue'
//import StoreView from '@/views/StoreView.vue'
import StoreView from '@/views/StoreView.vue'
import SignView from '@/views/SignView.vue'
import AboutView from '@/views/AboutView.vue'
import MessageView from '@/views/MessageView.vue'
import MyHome from '@/views/MyHome.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: UserLoginView,
    },
    {
      path: '/sign',
      name: 'signView',
      component: SignView,
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
    },
    {
      path: '/store',
      name: 'store',
      component: StoreView,
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView,
    }
    ,
    {
      path: '/Message',
      name: 'Message',
      component: MessageView,
    }
    ,
    {
      path: '/MyHome',
      name: 'MyHome',
      component: MyHome,
    }
  ]
})

export default router
