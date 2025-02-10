<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <div class="wrapper">
      <a-form-item label="用户账户" v-bind="validateInfos.name">
        <a-input v-model:value="createUser.userAccount" />
      </a-form-item>
      <a-form-item label="用户名称" v-bind="validateInfos.name">
        <a-input v-model:value="createUser.userName" />
      </a-form-item>
      <a-form-item label="用户头像" v-bind="validateInfos.name">
        <a-input v-model:value="createUser.userAvatar" />
      </a-form-item>
      <a-form-item label="用户介绍" v-bind="validateInfos.name">
        <a-input v-model:value="createUser.userProfile" />
      </a-form-item>
      <a-form-item label="用户角色" v-bind="validateInfos.region">
        <a-select v-model:value="createUser.userRole" placeholder="选择用户角色">
          <a-select-option value="user">普通用户</a-select-option>
          <a-select-option value="admin">管理员</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
        <a-button style="margin-left: 10px" @click="handleCancel">cancel</a-button>
      </a-form-item>
    </div>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { Form, message } from 'ant-design-vue'
import useUser from '@/stores/user'

const useStore = useUser()
const useForm = Form.useForm
const props = defineProps({
  fetchData: Function,
})

const labelCol = { span: 4 }
const wrapperCol = { span: 14 }
const createUser = reactive<API.UserAddRequest>({
  userName: '无名',
  userAccount: '',
  userProfile: '',
  userRole: 'user',
  userAvatar: '',
})
const rulesRef = reactive({
  userName: [
    {
      required: true,
      message: '用户名是必填项',
    },
  ],
  userAccount: [
    {
      required: true,
      message: '用户账户是必填项',
    },
  ],
  userRole: [
    {
      required: true,
      message: '请选择用户角色',
    },
  ],
  userProfile: [
    {
      required: false,
    },
  ],
  userAvatar: [
    {
      required: false,
    },
  ],
})

const emits = defineEmits(['cancel'])
const { resetFields, validate, validateInfos } = useForm(createUser, rulesRef)
const onSubmit = () => {
  validate()
    .then(async () => {
      const res = await useStore.addUser(createUser)

      if (res?.code === 0) {
        if (props?.fetchData) {
          props?.fetchData()
        }
        emits('cancel', false)
        message.success('创建成功')
        resetFields()
      } else {
        message.error('创建失败，' + res.data.message)
      }
    })
    .catch((err) => {
      for (const item of err.errorFields) {
        message.error(item.errors)
      }
    })
}

//取消组件显示
const handleCancel = () => {
  emits('cancel', false)
}
</script>

<style scoped lang="less">
.wrapper {
  margin-left: 100px;
}
</style>
