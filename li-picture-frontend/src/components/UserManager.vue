<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import useUser from '@/stores/user'
import { message } from 'ant-design-vue'
import { computed, onMounted, reactive, ref } from 'vue'
import dayjs from 'dayjs'
import { localCache } from '@/utils/catch'
import { LOGIN_TOKEN, userRole } from '@/global/constant'
import CreateUserInput from './CreateUserInput.vue'
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
  },
  {
    title: '简介',
    dataIndex: 'userProfile',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const useStore = useUser()

// 数据
const dataList = ref([])
const total = ref(0)

// 搜索条件
const searchParams = reactive<API.UserQueryRequest>({
  current: 1,
  pageSize: 10,
})

// 获取数据
const fetchData = async () => {
  const res = await useStore.listUserVoByPage({
    ...searchParams,
  })

  if (res.data) {
    dataList.value = res.data.records ?? []
    total.value = Number(res.data?.total) ?? 0
  } else {
    message.error('获取数据失败，' + res?.message)
  }
}

// 页面加载时请求一次
onMounted(() => {
  fetchData()
})

// 分页参数
const pagination = computed(() => {
  return {
    current: searchParams.current ?? 1,
    pageSize: searchParams.pageSize ?? 10,
    total: total.value,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 条`,
  }
})

// 表格变化处理
const doTableChange = (page: any) => {
  searchParams.current = page.current
  searchParams.pageSize = page.pageSize
  fetchData()
}

// 获取数据
const doSearch = () => {
  // 重置页码
  searchParams.current = 1
  fetchData()
}
const visible = ref<boolean>(false)
const userId = ref<number>()
const doDelete = (id: number) => {
  visible.value = true
  userId.value = id
}

//用于用户权限进行限制,只有管理员才可以看到这个页面
const isAdmin = computed(() => {
  return localCache.getCache(LOGIN_TOKEN).userRole === userRole.ADMIN
})

//删除用户
const doDeleteUserOk = async () => {
  const res = await useStore.deleteUser(userId.value as number)
  if (res?.code === 0) {
    message.success('删除成功')
    visible.value = false
    fetchData()
  } else {
    message.error('删除失败，' + res.data.message)
  }
}
//控制创建表单的显隐

const isShow = ref(false)

const onCreateShow = () => {
  isShow.value = true
}
const handleCancel = (value: boolean) => {
  isShow.value = value
}

//搜索用户
</script>

<template>
  <div class="useManager" v-if="isAdmin">
    <a-form layout="inline" :model="searchParams" @finish="doSearch">
      <a-form-item label="账号">
        <a-input v-model:value="searchParams.userAccount" placeholder="输入账号" />
      </a-form-item>
      <a-form-item label="用户名">
        <a-input v-model:value="searchParams.userName" placeholder="输入用户名" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="onCreateShow">创建用户</a-button>
      </a-form-item>
    </a-form>

    <a-table
      :columns="columns"
      :data-source="dataList"
      :pagination="pagination"
      @change="doTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'userAvatar'">
          <a-image :src="record.userAvatar" :width="120" />
        </template>
        <template v-else-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 'admin'">
            <a-tag color="green">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button type="primary" style="margin-right: 5px">编辑</a-button>
          <a-button @click="doDelete(record.id)">删除 </a-button>
        </template>
      </template>
    </a-table>
    <!-- 提示删除 -->
    <a-modal v-model:visible="visible" title="提示" @ok="doDeleteUserOk">
      <p>确认删除该用户吗？</p>
    </a-modal>

    <!-- 创建用户 -->
    <CreateUserInput
      :fetch-data="fetchData"
      class="create-user-input"
      v-if="isShow"
      v-on:cancel="handleCancel"
    />
  </div>
</template>

<style lang="less" scoped>
.user-manager {
  display: flex;
}
.create-user-input {
  width: 500px;
  position: absolute;
  top: 25%;
  left: 40%;
  background-color: #fff;
}
</style>
