<script setup lang="ts">
import { h, ref } from 'vue'
import { HomeOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/about',

    label: '关于',
    title: '关于',
  },
])
//使用路由
const router = useRouter()
const current = ref<string[]>(['home'])
//监听路由变化更新菜单
router.afterEach(() => {
  current.value = [router.currentRoute.value.path]
})

// 路由跳转事件
const doMenuClick = ({ key }) => {
  router.push({
    path: key,
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
          <a-button type="primary" href="/user/login">登录</a-button>
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
}
</style>
