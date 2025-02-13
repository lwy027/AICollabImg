<script setup lang="ts">
import { deletePictureUsingPost, getPictureVoByIdUsingGet } from '@/api/pictureController'
import { message } from 'ant-design-vue'
import { computed, onMounted, ref } from 'vue'
import formatSize from '@/utils/formatSize.ts'
import downloadImage from '@/utils/downloadImage.ts'
import { localCache } from '@/utils/catch.ts'
import { LOGIN_TOKEN } from '@/global/constant.ts'
import router from '@/router'
import { backTopProps } from 'ant-design-vue/es/float-button/interface'
const props = defineProps<{
  id: string | number
}>()
const visible = ref<boolean>(false)

const picture = ref<API.PictureVO>({})

// 获取图片详情
const fetchPictureDetail = async () => {
  try {
    const res = await getPictureVoByIdUsingGet({
      id: props.id,
    })
    if (res.code === 0 && res.data) {
      picture.value = res.data
    } else {
      message.error('获取图片详情失败，' + res.message)
    }
  } catch (e: any) {
    message.error('获取图片详情失败：' + e.message)
  }
}

onMounted(() => {
  fetchPictureDetail()
})

// 是否具有编辑权限
const canEdit = computed(() => {
  const loginUser = localCache.getCache(LOGIN_TOKEN)
  // 未登录不可编辑
  if (!loginUser.id) {
    return false
  }
  // 仅本人或管理员可编辑
  const user = picture.value.user || {}
  return loginUser.id === user.id || loginUser.userRole === 'admin'
})

// 编辑
const doEdit = () => {
  router.push('/admin/add_picture?id=' + picture.value.id)
}

// 删除
const doDelete = async () => {
  visible.value = true
}
// 处理下载
const doDownload = () => {
  downloadImage(picture.value.url)
}

const doDeleteOk = async () => {
  const id = picture.value.id
  if (!id) {
    return
  }
  const res = await deletePictureUsingPost({ id })
  if (res.code === 0) {
    visible.value = false
    message.success('删除成功')
    router.back()
  } else {
    message.error('删除失败')
  }
}
</script>

<template>
  <div class="pictureDetail">
    <a-row :gutter="[16, 16]">
      <!-- 图片展示区 -->
      <a-col :sm="24" :md="16" :xl="18">
        <a-card title="图片预览">
          <a-image style="max-height: 600px; object-fit: contain" :src="picture.url" />
        </a-card>
      </a-col>
      <!-- 图片信息区 -->
      <a-col :sm="24" :md="8" :xl="6">
        <a-card title="图片信息">
          <a-descriptions :column="1">
            <a-descriptions-item label="作者">
              <a-space>
                <a-avatar :size="24" :src="picture.user?.userAvatar" />
                <div>{{ picture?.user?.userName }}</div>
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item label="名称">
              {{ picture.name ?? '未命名' }}
            </a-descriptions-item>
            <a-descriptions-item label="简介">
              {{ picture.introduction ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="分类">
              {{ picture.category ?? '默认' }}
            </a-descriptions-item>
            <a-descriptions-item label="标签">
              <a-tag v-for="tag in picture.tags" :key="tag">
                {{ tag }}
              </a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="格式">
              {{ picture.picFormat ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="宽度">
              {{ picture.picWidth ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="高度">
              {{ picture.picHeight ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="宽高比">
              {{ picture.picScale ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="大小">
              {{ formatSize(picture.picSize) }}
            </a-descriptions-item>
          </a-descriptions>
          <a-space wrap>
            <a-button v-if="canEdit" type="default" @click="doEdit">
              编辑
              <template #icon>
                <EditOutlined />
              </template>
            </a-button>
            <a-button v-if="canEdit" danger @click="doDelete">
              删除
              <template #icon>
                <DeleteOutlined />
              </template>
            </a-button>
            <a-button type="primary" @click="doDownload">
              免费下载
              <template #icon>
                <DownloadOutlined />
              </template>
            </a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
    <!-- 提示删除 -->
    <a-modal v-model:visible="visible" title="提示" @ok="doDeleteOk">
      <p>确认删除该用户吗？</p>
    </a-modal>
  </div>
</template>

<style lang="less" scoped></style>
