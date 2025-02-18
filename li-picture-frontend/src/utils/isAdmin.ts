import { computed } from 'vue'
import { localCache } from './catch'
import { LOGIN_TOKEN, userRole } from '@/global/constant'

const isAdmin = computed(() => {
  return localCache.getCache(LOGIN_TOKEN).userRole === userRole.ADMIN
})

export default isAdmin
