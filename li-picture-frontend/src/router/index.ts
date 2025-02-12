import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import { userRole } from '@/global/constant'
import addPicture from '@/views/picture/addPicture.vue'
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
      name: '用户管理',
      component: () => import('@/components/user/UserManager.vue'),
      meta: {
        access: userRole.ADMIN,
      },
    },
    {
      path: '/admin/pictureManager',
      name: '图片管理',
      component: () => import('@/components/picture/pictureManager.vue'),
      meta: {
        access: userRole.ADMIN,
      },
    },
    {
      path: '/picture/:id',
      name: '图片详情',
      component: () => import('@/views/picture/PictureDetail.vue'),
      props: true,
    },
    {
      path: '/add_picture',
      name: '创建图片',
      component: addPicture,
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
