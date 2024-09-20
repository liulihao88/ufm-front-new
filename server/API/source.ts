import request from '@/utils/request'
// 列表
export function dsArrAPI() {
  return request({
    url: '/ds',
  })
}

// 查询数据源配置
export function dsConfigInfoCheckAPI(id) {
  return request({
    url: `/ds/${id}`,
  })
}
// 更新数据源配置
export function dsConfigEditInfoAPI(data) {
  return request({
    url: `/ds`,
    method: 'put',
    data,
  })
}
// 删除
export function dsConfigDelInfoAPI(id) {
  return request({
    url: `/ds/${id}`,
    method: 'delete',
  })
}
// 测试数据源配置
export function dsConfigTestInfoAPI(data) {
  return request({
    url: '/ds/test',
    method: 'put',
    data,
  })
}
