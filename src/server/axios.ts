import axios from 'axios'
import { message } from 'ant-design-vue'
import router from '@/router'
import UseLogout from '@/hooks/useLogout.js'
const { logout } = UseLogout()
const pramasCountFn = (obj: object) => {
  const pramas: object = {
    timeout: null, // 超时定义
    type: '', // 请求类型定义
    responseType: '', // 请求方式定义
    callBackFn: null, // 回调函数定义
    isSpecial: false, // 是否是特殊请求
  }
  if (!obj) {
    return pramas
  }
  Object.keys(pramas).forEach((item: string) => {
    const isHave = Object.keys(obj).find((el) => item === el)
    if (isHave) {
      pramas[item] = obj[item]
    }
  })
  return pramas
}
let Spinner_common: any = null
const $Spinner_common = (isShow: boolean) => {
  if (Spinner_common === null) {
    const _w: HTMLElement = document.querySelector('#app')
    if (isShow) {
      const spinnerBox = document.querySelector('#spinnerBox')
      const str =
        '<div class="css-u4kgz5 ant-spin ant-spin-lg ant-spin-spinning" aria-live="polite" aria-busy="true"><span class="ant-spin-dot ant-spin-dot-spin"><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i></span></div>'
      if (!spinnerBox) {
        const spinnerHtml = str // 将虚拟节点渲染为HTML字符串
        const div = document.createElement('div') // 创建一个新的div元素来包含渲染的HTML字符串
        div.setAttribute('id', 'spinnerBox')
        div.innerHTML = spinnerHtml // 将HTML字符串设置为div的innerHTML，这会将字符串转换为真实的DOM节点
        _w.appendChild(div) // 将真实的DOM节点附加到DOM中
      }
    } else {
      const spinnerBox = document.querySelector('#spinnerBox')
      if (spinnerBox) {
        _w.removeChild(spinnerBox)
      }
    }
    Spinner_common = null
  }
}
const axiosAPP = (obj: any) => {
  const tokenV: string = localStorage.getItem('ufm_token')
  axios.defaults.headers.common.Authorization = tokenV
  const axiosSource = axios.CancelToken.source() // 为了解决接口取消后，再次发起请求，接口不能再次请求canceltoken，会持续取消
  const pramasInfo = pramasCountFn(obj)
  const axiosIns = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? '/api/admin' : '/admin',
    timeout: pramasInfo.timeout ? pramasInfo.timeout : 10000,
    validateStatus: function () {
      return true
    },
    responseType: pramasInfo.responseType ? pramasInfo.responseType : '',
    cancelToken: axiosSource.token,
  })
  if (pramasInfo.type == 'form-data') {
    axiosIns.defaults.headers.post['Content-Type'] = 'multipart/form-data'
  } else {
    axiosIns.defaults.headers.post['Content-Type'] = 'application/json'
  }
  axiosIns.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
  $Spinner_common(true)
  axiosIns.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      console.log(error, 'config is error')
      $Spinner_common(false)
      Promise.reject(error)
    },
  )
  axiosIns.interceptors.response.use(
    (response) => {
      $Spinner_common(false)
      if (response.data && response.data.status === 401) {
        logout(true)
        return
      }
      return response
    },
    (error) => {
      $Spinner_common(false)
      console.log(error, 'response is error')
      message.error(error.message)
      Promise.reject(error)
    },
  )
  return axiosIns
}
export default axiosAPP
