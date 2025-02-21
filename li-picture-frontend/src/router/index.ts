import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import { userRole } from '@/global/constant'
import addPicture from '@/views/picture/addPicture.vue'
import addPictureBatchVue from '@/views/picture/addPictureBatch.vue'
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
      name: '登录',
      component: () => import('../views/user/UserLogin.vue'),
    },
    {
      path: '/user/register',
      name: '注册',
      component: () => import('../views/user/UserRegister.vue'),
    },
    {
      path: '/add_picture/batch',
      name: '批量创建图片',
      component: () => import('@/views/picture/addPictureBatch.vue'),
    },
    {
      path: '/admin/spaceManage',
      name: '空间管理',
      component: () => import('@/components/space/SpaceManager.vue'),
    },
    {
      path: '/add_space',
      name: '创建空间',
      component: () => import('@/components/picture/AddSpace.vue'),
    },
    {
      path: '/my_space',
      name: '我的空间',
      component: () => import('@/views/user/MySpace.vue'),
    },
    {
      path: '/space/:id',
      name: '私人空间',
      component: () => import('@/components/space/SpaceDetail.vue'),
    },
    {
      path: '/search_picture',
      name: '图片搜索',
      component: () => import('@/components/picture/searchPicture.vue'),
    },
    {
      path: '/space_analyze',
      name: '空间分析',
      component: () => import('@/components/space/SpaceAnalyze.vue'),
    },
  ],
})

export default router
