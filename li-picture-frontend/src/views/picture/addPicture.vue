<script setup lang="ts">
import { getPictureByIdUsingGet } from '@/api/pictureController'
import { editPictureUsingPost, listPictureTagCategoryUsingGet } from '@/api/pictureController'
import PictureUpLoad from '@/components/pictureUpLoad.vue'
import UrlPictureUpLoad from '@/components/UrlPictureUpLoad.vue'
import { message } from 'ant-design-vue'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const picture = ref<API.PictureVO>()

const pictureForm = reactive<API.PictureEditRequest>({})

const router = useRouter()
const route = useRoute()

const onSuccess = (newPicture: API.PictureVO) => {
  console.log(newPicture)
  picture.value = newPicture
  pictureForm.name = newPicture.name
}

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: any) => {
  const pictureId = picture.value?.id
  if (!pictureId) {
    return
  }
  const res = await editPictureUsingPost({
    id: pictureId,
    ...values,
  })
  if (res.code === 0 && res.data) {
    message.success('创建成功')
    // 跳转到图片详情页
    router.push({
      path: `/picture/${pictureId}`,
    })
  } else {
    message.error('创建失败，' + res.message)
  }
}

//获取分类和标签选项
const tagOptions = ref<{ value: string; label: string }[]>([])
const categoryOptions = ref<{ value: string; label: string }[]>([])
const uploadType = ref<'file' | 'url'>('file')

// 获取标签和分类选项
const getTagCategoryOptions = async () => {
  const res = await listPictureTagCategoryUsingGet()

  if (res.code === 0 && res.data) {
    // 转换成下拉选项组件接受的格式
    tagOptions.value = (res.data.tagList ?? []).map((data: string) => {
      return {
        value: data,
        label: data,
      }
    })
    categoryOptions.value = (res.data.categoryList ?? []).map((data: string) => {
      return {
        value: data,
        label: data,
      }
    })
  } else {
    message.error('加载选项失败，' + res.data.message)
  }
}

onMounted(() => {
  getTagCategoryOptions()
})

// 修改图片
// 获取老数据
const getOldPicture = async () => {
  // 获取数据
  const id = route.query?.id

  if (id) {
    const res = await getPictureByIdUsingGet({
      id: id,
    })
    console.log(res)
    if (res.code === 0 && res.data) {
      const data = res.data
      picture.value = data
      pictureForm.name = data.name
      pictureForm.introduction = data.introduction
      pictureForm.category = data.category
      pictureForm.tags = data.tags
    }
  }
}
onMounted(() => {
  getOldPicture()
})
</script>

<template>
  <div class="addPicture">
    <h2 style="margin-bottom: 16px">
      {{ route.query?.id ? '修改图片' : '创建图片' }}
    </h2>
    <!-- 选择上传方式 -->
    <a-tabs v-model:activeKey="uploadType"
      >>
      <a-tab-pane key="file" tab="文件上传">
        <PictureUpLoad :picture="picture" :onSuccess="onSuccess" />
      </a-tab-pane>
      <a-tab-pane key="url" tab="URL 上传" force-render>
        <UrlPictureUpLoad :picture="picture" :onSuccess="onSuccess" />
      </a-tab-pane>
    </a-tabs>

    <a-form layout="vertical" v-if="picture" :model="pictureForm" @finish="handleSubmit">
      <a-form-item label="名称" name="name">
        <a-input v-model:value="pictureForm.name" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item label="简介" name="introduction">
        <a-textarea
          v-model:value="pictureForm.introduction"
          placeholder="请输入简介"
          :rows="2"
          autoSize
          allowClear
        />
      </a-form-item>
      <a-form-item label="分类" name="category">
        <a-auto-complete
          v-model:value="pictureForm.category"
          placeholder="请输入分类"
          allowClear
          :options="categoryOptions"
        />
      </a-form-item>
      <a-form-item label="标签" name="tags">
        <a-select
          v-model:value="pictureForm.tags"
          mode="tags"
          placeholder="请输入标签"
          :options="tagOptions"
          allowClear
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">创建</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
.addPicture {
  width: 80%;
  height: 80%;
  max-width: 720px;
  margin: 0 auto;
}
</style>
