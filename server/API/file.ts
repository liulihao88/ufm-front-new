import axiosAPP from '../axios'
import { succussCommonFn, errorCommonFn } from './commonBackFn'
import { getStorage, $toast } from 'oeos-components'
import request from '@/utils/request'
// 列表
export function entryAPI() {
  return request({
    url: '/entry',
  })
}

// 查询输入配置
export function queryEntryAPI(id) {
  return request({
    url: `/entry/${id}`,
  })
}

export const saveEntryAPI = (data) => {
  return request({
    url: '/entry',
    method: 'put',
    data: data,
  })
}

// 删除配置
export function delEntryAPI(id) {
  return request({
    url: `/entry/${id}`,
    method: 'delete',
  })
}
// 测试输入配置
export function testEntryAPI(data) {
  return request({
    url: 'entry/test',
    method: 'put',
    data: data,
  })
}
// 系统列表
export function syslistAPI() {
  return request({
    url: 'entry/syslist',
  })
}

export function spaceQueryListAPINew(id) {
  const nodeId = getStorage('nodeId')
  return request({
    url: `task/public/${nodeId}/entry/${id}/items`,
  })
}
