import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import { userRole } from '@/global/constant'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/admin/userManager',
      name: 'userManager',
      component: () => import('@/components/UserManager.vue'),
      meta: {
        access: userRole.ADMIN,
      },
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue'),
    },
    {
      path: '/user/login',
      name: 'login',
      component: () => import('../views/user/UserLogin.vue'),
    },
    {
      path: '/user/register',
      name: 'register',
      component: () => import('../views/user/UserRegister.vue'),
    },
  ],
})

export default router
