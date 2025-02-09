import {
  addUserUsingPost,
  deleteUserUsingPost,
  getUserByIdUsingGet,
  listUserVoByPageUsingPost,
  updateUserUsingPost,
  userLoginUsingPost,
  userRegisterUsingPost,
} from '@/api/userController'
import { LOGIN_TOKEN } from '@/global/constant'
import { localCache } from '@/utils/catch'

import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUser = defineStore('user', () => {
  const userInfo = ref({})
  //1.用户登录请求
  async function userLogin(values: never) {
    const res = await userLoginUsingPost(values)

    userInfo.value = res.data
    //储存在本地
    localCache.setCache(LOGIN_TOKEN, res.data)
    return res
  }
  //2.用户注册
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function userRegister(values: any) {
    const res = await userRegisterUsingPost(values)
    return res
  }

  //4.用户查询
  async function getUserById(id: number) {
    const res = await getUserByIdUsingGet({
      id,
    })
    return res
  }
  //5.用户更新
  async function updateUser(userUpdateRequest: API.UserUpdateRequest) {
    const res = await updateUserUsingPost(userUpdateRequest)
    return res
  }
  //6.用户删除
  async function deleteUser(id: number) {
    const res = await deleteUserUsingPost({
      id,
    })
    return res
  }
  //7.用户分页查询
  async function listUserVoByPage(userQueryRequest: API.UserQueryRequest) {
    const res = await listUserVoByPageUsingPost(userQueryRequest)
    return res
  }
  //创建用户
  async function addUser(userAddRequest: API.UserAddRequest) {
    console.log(userAddRequest)
    const res = await addUserUsingPost(userAddRequest)

    return res
  }

  return {
    userLogin,
    userRegister,
    getUserById,
    updateUser,
    addUser,
    deleteUser,
    listUserVoByPage,

    userInfo,
  }
})

export default useUser
