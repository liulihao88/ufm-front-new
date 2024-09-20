import request from '@/utils/request.ts'
export const loginAPI = (data) => {
  return request({
    url: 'auth/signin',
    data: data,
    method: 'post',
    custom: true,
  })
}
