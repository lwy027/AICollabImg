<script setup lang="ts">
import { h, onMounted, ref } from 'vue'
import { getSpaceVoByIdUsingGet } from '@/api/spaceController.ts'
import { message } from 'ant-design-vue'
import {
  listPictureVoByPageUsingPost,
  searchPictureByColorUsingPost,
} from '@/api/pictureController.ts'
import formatSize from '@/utils/formatSize.ts'
import PictureList from '@/components/picture/PictureList.vue'
import { useRoute } from 'vue-router'
import PictureSearchForm from '@/base_ui/PictureSearchForm.vue'
import BatchEditPictureModal from '@/base_ui/BatchEditPictureModal.vue'
import { BarChartOutlined, EditOutlined } from '@ant-design/icons-vue'
interface Props {
  id: string | number
}
const props = defineProps<Props>()
const space = ref<API.SpaceVO>({})
const route = useRoute()
// -------- 获取空间详情 --------
const fetchSpaceDetail = async () => {
  try {
    const res = await getSpaceVoByIdUsingGet({
      id: route.params.id,
    })

    if (res.code === 0 && res.data) {
      space.value = res.data
    } else {
      message.error('获取空间详情失败，' + res.message)
    }
  } catch (e: any) {
    message.error('获取空间详情失败：' + e.message)
  }
}
onMounted(() => {
  fetchSpaceDetail()
})
// --------- 获取图片列表 --------
// 定义数据
const dataList = ref<API.PictureVO[]>([])
const total = ref(0)
const loading = ref(true)
// 搜索条件
const searchParams = ref<API.PictureQueryRequest>({
  current: 1,
  pageSize: 12,
  sortField: 'createTime',
  sortOrder: 'descend',
})

// 分页参数
const onPageChange = (page, pageSize) => {
  searchParams.value.current = page
  searchParams.value.pageSize = pageSize
  fetchData()
}

// 搜索
const onSearch = (newSearchParams: API.PictureQueryRequest) => {
  searchParams.value = {
    ...searchParams.value,
    ...newSearchParams,
    current: 1,
  }
  fetchData()
}

// 获取数据
const fetchData = async () => {
  loading.value = true
  // 转换搜索参数
  const params = {
    spaceId: props.id,
    ...searchParams.value,
  }
  const res = await listPictureVoByPageUsingPost(params)
  if (res.data) {
    dataList.value = res.data.records ?? []
    total.value = res.data.total ?? 0
  } else {
    message.error('获取数据失败，' + res.message)
  }
  loading.value = false
}
// 页面加载时获取数据，请求一次
onMounted(() => {
  fetchData()
})
const onColorChange = async (color: string) => {
  const res = await searchPictureByColorUsingPost({
    picColor: color,
    spaceId: route.params.id,
  })
  console.log(res)
  if (res.code === 0 && res.data) {
    const data = res.data ?? []
    dataList.value = data
    total.value = data.length
  } else {
    message.error('获取数据失败，' + res.message)
  }
}
// 分享弹窗引用
const batchEditPictureModalRef = ref()

// 批量编辑成功后，刷新数据
const onBatchEditPictureSuccess = () => {
  fetchData()
}
// 打开批量编辑弹窗
const doBatchEdit = () => {
  if (batchEditPictureModalRef.value) {
    batchEditPictureModalRef.value.openModal()
  }
}
</script>
<template>
  <div id="spaceDetailPage">
    <!-- 搜索表单 -->
    <PictureSearchForm :onSearch="onSearch" />
    <!-- 按颜色搜索 -->
    <a-form-item label="按颜色搜索" style="margin-top: 16px">
      <color-picker format="hex" @pureColorChange="onColorChange" />
    </a-form-item>
    <!-- 空间信息 -->
    <a-flex justify="space-between">
      <h2>{{ space.spaceName }}（私有空间）</h2>
      <a-space size="middle">
        <a-button type="primary" :href="`/add_picture?spaceId=${id}`" target="_blank">
          + 创建图片
        </a-button>
        <a-button
          type="primary"
          ghost
          :icon="h(BarChartOutlined)"
          :href="`/space_analyze?spaceId=${id}`"
          target="_blank"
        >
          空间分析
        </a-button>
        <a-button :icon="h(EditOutlined)" @click="doBatchEdit"> 批量编辑</a-button>
        <a-tooltip
          :title="`占用空间 ${formatSize(space.totalSize)} / ${formatSize(space.maxSize)}`"
        >
          <a-progress
            type="circle"
            :size="42"
            :percent="((space.totalSize * 100) / space.maxSize).toFixed(1)"
          />
        </a-tooltip>
      </a-space>
    </a-flex>
    <div style="margin-bottom: 16px" />
    <!-- 图片列表 -->
    <PictureList :dataList="dataList" :loading="loading" :showOp="true" :onReload="fetchData" />
    <!-- 分页 -->
    <a-pagination
      style="text-align: right"
      v-model:current="searchParams.current"
      v-model:pageSize="searchParams.pageSize"
      :total="total"
      @change="onPageChange"
    />
    <BatchEditPictureModal
      ref="batchEditPictureModalRef"
      :spaceId="id as number"
      :pictureList="dataList"
      :onSuccess="onBatchEditPictureSuccess"
    />
  </div>
</template>
<style scoped>
#spaceDetailPage {
  margin-bottom: 16px;
}
</style>
