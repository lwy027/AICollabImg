<script setup lang="ts">
import { listMyTeamSpaceUsingPost } from '@/api/spaceUserController'
import { SPACE_TYPE_ENUM } from '@/global/constant'
import { LOGIN_TOKEN } from '@/global/constant'
import { localCache } from '@/utils/catch'
import { PictureOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { computed, h, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

// 菜单列表
// 固定的菜单列表
const fixedMenuItems = [
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
  {
    key: '/add_space?type=' + SPACE_TYPE_ENUM.TEAM,
    label: '创建团队',
    icon: () => h(TeamOutlined),
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
  router.push(key)
}
const teamSpaceList = ref<API.SpaceUserVO[]>([])
const menuItems = computed(() => {
  // 没有团队空间，只展示固定菜单
  if (teamSpaceList.value.length < 1) {
    return fixedMenuItems
  }
  // 展示团队空间分组
  const teamSpaceSubMenus = teamSpaceList.value.map((spaceUser) => {
    const space = spaceUser.space
    return {
      key: '/space/' + spaceUser.spaceId,
      label: space?.spaceName,
    }
  })
  const teamSpaceMenuGroup = {
    type: 'group',
    label: '我的团队',
    key: 'teamSpace',
    children: teamSpaceSubMenus,
  }
  return [...fixedMenuItems, teamSpaceMenuGroup]
})

// 加载团队空间列表
const fetchTeamSpaceList = async () => {
  const res = await listMyTeamSpaceUsingPost()
  if (res.code === 0 && res.data) {
    teamSpaceList.value = res.data
  } else {
    message.error('加载我的团队空间失败，' + res.message)
  }
}

/**
 * 监听变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  // 登录才加载
  if (localCache.getCache(LOGIN_TOKEN)?.id) {
    fetchTeamSpaceList()
  }
})
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
