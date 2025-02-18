<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constant'
import { localCache } from '@/utils/catch'
import { PictureOutlined, UserOutlined } from '@ant-design/icons-vue'
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'

// 菜单列表
const menuItems = [
  {
    key: '/',
    label: '公共图库',
    icon: () => h(PictureOutlined),
  },
  {
    key: '/my_space',
    label: '我的空间',
    icon: () => h(UserOutlined),
  },
]

const router = useRouter()

// 当前选中菜单
const current = ref<string[]>([])
// 监听路由变化，更新当前选中菜单
router.afterEach((to, from, failure) => {
  current.value = [to.path]
})

// 路由跳转事件
const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  })
}
</script>
?
<template>
  <div class="globalSider">
    <a-layout-sider
      v-if="localCache.getCache(LOGIN_TOKEN)"
      breakpoint="lg"
      collapsed-width="0"
      class="sider"
    >
      <a-menu
        mode="inline"
        v-model:selectedKeys="current"
        :items="menuItems"
        @click="doMenuClick"
      />
    </a-layout-sider>
  </div>
</template>

<style lang="less" scoped>
.globalSider {
  width: 150px; /* 或其他固定宽度 */
  position: fixed;
  left: 0;
  top: 65px;
  bottom: 0;
  background-color: #fff;
  padding: 20px;
  border-right: 0.5px solid #eee;
  .ant-menu {
    width: 150px;
    position: fixed;
    left: 0;
    right: 0;
  }
}
</style>
