import { createRouter, createWebHistory } from 'vue-router'
import GetMusic from '@/views/GetMusic.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GetMusic
    },
    {
      path: '/playlist/:playlistId',
      name: 'playlist',
      component: GetMusic
    }
  ]
})

export default router
