// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/* eslint-disable */
import request from '@/service/requests/index'

/** health GET /api/health */
export async function healthUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/health', {
    method: 'GET',
    ...(options || {}),
  })
}
