import axiosAPP from '../axios'
import { succussCommonFn, errorCommonFn } from './commonBackFn'
import request from '@/utils/request'
// 查询客户端概览
export const getClientAPI = () => {
  return request({
    url: '/client/manage/summary',
  })
}
// 查询客户端列表
export const checkClientListAPI = async (fn) => {
  return request({
    url: '/client/manage/list',
  })
}
// 查询客户端节点概览
const checkClientNodeIdAPI = async (id: string, fn: any) => {
  await axiosAPP()
    .get(`/client/manage/${id}/summary`)
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误，查询列表失败！', fn: null })
    })
}
// 重启
export function reStartAPI(id) {
  return request({
    url: `/client/manage/${id}/restart`,
    method: 'put',
  })
}
// 关闭
const shutDownAPI = async (nodeId: string, fn: any) => {
  await axiosAPP()
    .put(`/client/manage/${nodeId}/shutdown`)
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误,关闭失败！', fn: null })
    })
}
// 更新
const updateHostAPI = async (nodeId, fn: any) => {
  await axiosAPP()
    .put(`/client/manage/${nodeId}/update`)
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误,更新失败！', fn: null })
    })
}

// 部署
// 测试
const putTestAPI = async (
  data: {
    hosts: string[]
    rsAuth: {
      authVersion: string
      authorization: string
      host: string
      port: number
      protocol: string
    }
    sshAuth: {
      authVersion: string
      authorization: {
        ignoreHostKeyChecking: boolean
        knownHosts: string
        location: string
        passphrase: string
        password: string
        privateKey: string
        username: string
      }
      host: string
      port: number
      protocol: string
    }
  },
  fn: any,
) => {
  await axiosAPP({ timeout: 60000 * 3 })
    .put('/client/deploy/test', data)
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误,检测失败！', fn: null })
    })
}
// 测试远程shell

const testRemoteshellAPI = async (data: object, fn: any, errFn: any) => {
  await axiosAPP({ timeout: 1000000 })
    .put(`/client/deploy/test/remoteshell`, data)
    .then((res) => {
      console.log(res, 'resresres')

      succussCommonFn(res, fn, errFn)
    })
    .catch((error) => {
      errFn()
      // errorCommonFn(error, { msg: "未知错误,测试远程shell失败！", fn: null });
    })
}
// 检测连接主机

const testConnectHostAPI = async (id: string, fn: any) => {
  await axiosAPP()
    .put(`/client/deploy/test/connect/${id}`)
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误,检测连接主机失败！', fn: null })
    })
}
// 停止主机
const stopHostAPI = async (id: string, fn: any) => {
  await axiosAPP()
    .put(`/client/deploy/${id}/stop`)
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误,停止失败!', fn: null })
    })
}
// 升级客户端
const upgrateHostAPI = async (
  data: {
    nodeId: string
    remoteClient: {
      authVersion: string
      authorization: any
      host: string
      port: number
      protocol: string
    }
  },
  fn: any,
) => {
  await axiosAPP()
    .put('/client/deploy/upgrade', data)
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误,更新失败！', fn: null })
    })
}

// 安装客户端
const installHostAPI = async (
  data: {
    nodeId: string
    remoteClient: {
      host: string
    }
  },
  fn: any,
) => {
  await axiosAPP()
    .put('/client/deploy/install', data)
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误,安装失败!', fn: null })
    })
}
// 查询安装客户端进度
const installHostProgressAPI = async (id: string, fn: any, errFn: any) => {
  await axiosAPP()
    .get(`/client/deploy/${id}/progress`)
    .then((res) => {
      succussCommonFn(res, fn, errFn)
    })
    .catch((error) => {
      if (errFn) {
        errFn()
      }
      errorCommonFn(error, { msg: '未知错误,进度查询失败!', fn: null })
    })
}
// 卸载客户端
const unInstallHostAPI = async (
  data: {
    remoteClient: {
      host: string
    }
  },
  fn: any,
) => {
  await axiosAPP()
    .put('/client/deploy/uninstall', data)
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误，卸载失败！', fn: null })
    })
}

// 查询版本
const checkVirsionAPI = async (fn: any) => {
  await axiosAPP()
    .get('/client/deploy/serverinfo')
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误,查询版本失败！', fn: null })
    })
}

// 测试远程shell
const testShellWinAPI = async (data: object, fn: NonNullable<T>, errFn: any) => {
  await axiosAPP()
    .put('/client/deploy/test/remoteshell', data)
    .then((res) => {
      succussCommonFn(res, fn, errFn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误,测试失败远程shell!', fn: errFn })
    })
}
const testShellLinuxAPI = async (
  data: {
    nodeId: ''
    remoteClient: {
      host: ''
      protocal: ''
      port: ''
      authVersion: ''
      authorization: {
        username: ''
        password: ''
        privateKey: ''
        passphrase: ''
      }
    }
  },
  fn: any,
) => {
  await axiosAPP()
    .put('/client/deploy/test/remoteshell', JSON.stringify(data))
    .then((res) => {
      succussCommonFn(res, fn)
    })
    .catch((error) => {
      errorCommonFn(error, { msg: '未知错误,测试失败远程shell!', fn: null })
    })
}
export {
  checkClientNodeIdAPI,
  shutDownAPI,
  putTestAPI,
  stopHostAPI,
  updateHostAPI,
  testConnectHostAPI,
  installHostAPI,
  installHostProgressAPI,
  unInstallHostAPI,
  checkVirsionAPI,
  testShellLinuxAPI,
  testShellWinAPI,
  upgrateHostAPI,
  testRemoteshellAPI,
}
