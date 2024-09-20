import axiosAPP from '../axios'
import { succussCommonFn, errorCommonFn } from './commonBackFn'
import { getStorage } from 'oeos-components'
import request from '@/utils/request.ts'

// 任务列表
export const getPublicTaskAPI = () => {
  return request({
    url: '/task/public',
  })
}
// 更新任务
const putPublicTaskAPI = async (data: object, fn: any) => {
  await axiosAPP()
    .put('/task/public', data)
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误，更新失败！', fn: null })
    })
}

export function deletePublicTask(row, isForce = false) {
  return request({
    url: `task/public/${row.nodeId}/${row.id}/${isForce}`,
    method: 'delete',
  })
}

// 开始任务
const startTask = (data) => {
  return request({
    url: `task/public/${data.nodeId}/${data.id}/start`,
    method: 'put',
  })
}
// 停止任务
const stopTaskAPI = async (data: object, fn: any) => {
  await axiosAPP()
    .put(`task/public/${data.nodeId}/${data.id}/stop`)
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误，停止失败！', fn: null })
    })
}

// 查询任务状态
const checkStatusTaskAPI = async (row, fn: any) => {
  await axiosAPP()
    .get(`task/public/${getStorage('nodeId')}/${row.id}/status`)
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误，查询失败！', fn: null })
    })
}
// 强制关闭
const killTaskAPI = async (data: object, fn: any) => {
  await axiosAPP()
    .put(`task/public/${data.nodeId}/${data.id}/kill`)
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误，强制删除失败！', fn: null })
    })
}
// 下载
const downloadTaskAPI = async (id: string, fn: any) => {
  await axiosAPP()
    .get(`task/public/log/download?id=${id}`)
    .then((res) => {
      console.log(res, '?res')
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误，下载失败！', fn: null })
    })
}

// 任务统计
export const statisticTaskAPI = async (data) => {
  // await axiosAPP()
  //   .get(`/task/public/${data.nodeId}/${data.id}/statistic`)
  //   .then((res) => {
  //     succussCommonFn(res, fn)
  //   })
  //   .catch((error) => {
  //     errorCommonFn(error, { msg: '未知错误，查询失败！', fn: null })
  //   })
  return request({
    url: `/task/public/${data.nodeId}/${data.id}/statistic`,
  })
}
// 运行状态
export const statusAPI = async (row) => {
  return request({
    url: `task/public/${row.nodeId}/${row.id}/status`,
  })
}
// 查询所有者
export const uclientlistAPI = async (fn: any) => {
  return request({
    url: '/client/manage/list',
  })
}

// 增加预览配置切换接口
const previewChangeAPI = async (data: object, fn: any) => {
  await axiosAPP()
    .put('/task/public/preview/change', data)
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误，更新失败！', fn: null })
    })
}

export { putPublicTaskAPI, startTask, stopTaskAPI, checkStatusTaskAPI, killTaskAPI, downloadTaskAPI, previewChangeAPI }
