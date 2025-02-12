<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { HomeOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'

import useUser from '@/stores/user'
import { localCache } from '@/utils/catch'
import { LOGIN_TOKEN, userRole } from '@/global/constant'
//使用路由
const router = useRouter()
const current = ref<string[]>(['home'])
const originItems = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/add_picture',
    label: '创建图片',
    title: '创建图片',
  },
  {
    key: '/admin/userManager',
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: '/admin/pictureManager',
    label: '图片管理',
    title: '图片管理',
  },
])

const filterMenus = (menus = [] as MenuProps['items']) => {
  return menus?.filter((item) => {
    if (item?.key?.startsWith('/admin')) {
      const userInfo = localCache.getCache(LOGIN_TOKEN)
      if (userInfo?.userRole !== userRole.ADMIN) {
        return false
      }
    }
    return true
  })
}

//展示在菜单的路由数组
let items = computed<MenuProps['items']>(() => filterMenus(originItems.value))

//监听路由变化更新菜单
router.afterEach(() => {
  current.value = [router.currentRoute.value.path]

  items = computed<MenuProps['items']>(() => filterMenus(originItems.value))
})

// 路由跳转事件
const doMenuClick = ({ key }) => {
  router.push({
    path: key,
  })
}

const useStore = useUser()

//用户登录
const doLogin = () => {
  router.push({
    path: '/user/login',
  })
}

const doLogout = () => {
  localCache.deleteCache(LOGIN_TOKEN)
  useStore.userInfo = {}
  router.push({
    path: '/user/login',
  })
}
</script>

<template>
  <div class="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <RouterLink to="/">
          <div class="title-bar">
            <img class="logo" src="@/assets/img/logo.jpg" alt="logo" />
            <div class="title">智能云图库</div>
          </div>
        </RouterLink>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          @click="doMenuClick"
          :items="items"
        />
      </a-col>
      <a-col flex="120px">
        <div class="user-login-status">
          <div v-if="useStore.userInfo?.userAccount ?? localCache.getCache(LOGIN_TOKEN)">
            {{
              useStore.userInfo?.userAccount
                ? useStore.userInfo?.userAccount
                : localCache.getCache(LOGIN_TOKEN).userAccount
            }}
            <div class="user-login-avatar">
              <a-button type="primary" @click="doLogout">退出</a-button>
            </div>
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login" @click="doLogin">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style lang="less" scoped>
.globalHeader {
  .title-bar {
    display: flex;
    align-items: center;
    .logo {
      height: 48px;
      background-color: white;
    }
    .title {
      color: black;
      font-size: 18px;
      margin-left: 16px;
    }
  }
  .user-login-avatar {
    display: none;
    position: absolute;
    top: 50%;
  }

  .user-login-status:hover .user-login-avatar {
    display: block;
  }
}
</style>
