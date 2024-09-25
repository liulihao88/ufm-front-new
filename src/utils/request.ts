import axios from 'axios'
import { ref, nextTick, h, resolveComponent } from 'vue'
import { $toast, clearStorage, sleep, getStorage, setStorage } from 'oeos-components'

import { useLoading } from '@/hooks/useLoading.js'
import { ElNotification, ElMessageBox } from 'element-plus'
import router from '@/router'
const { storeLoading1, storeLoading, storeLoadingTrue, storeLoadingFalse } = useLoading()
import UseLogout from '@/hooks/useLogout.js'
const { logout } = UseLogout()

export const loading1 = ref(storeLoading1)
export const loading = ref(storeLoading)

// console.log(`05 baseURL`, baseURL);
// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? '/api/admin' : '/admin',
  timeout: 200000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    const tokenV = getStorage('ufm_token')
    if (tokenV) {
      if (config.noToken) {
      } else {
        config.headers.Authorization = tokenV
      }
    }
    storeLoadingTrue(config.loading)
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (response.config.custom && response.status === 200) {
      return Promise.resolve(response)
    }
    closeLoading()
    // 对响应数据做点什么
    if (res.status === 200 || res.status === 201 || res.status === '200' || res.status === '201') {
      return res.details
    }
    if (res.status === 401 && response.config.showError !== false) {
      handleMoreError(res)
      // $toast(res.message, 'e')
      return resetLogin()
    }
    if (response.config.showError !== false) {
      handleMoreError(res)
    }
    return Promise.reject(res)
  },
  (error) => {
    console.log(`15 error`, error)
    closeLoading()
    // 对响应错误做点什么
    if (error.message.indexOf('timeout') != -1) {
      $toast('网络超时', 'e')
    } else if (error.message == 'Network Error') {
      $toast('网络连接错误', 'e')
    } else {
      handleMoreError(error.response.data)
    }
    return Promise.reject(error)
  },
)

// 除了mobile不清空, 其他都清空
export function resetLogin() {
  clearStorage()
  // router.push({ name: 'Login' })
}

export function closeLoading() {
  storeLoadingFalse()
}

export function handleMoreError(errorData) {
  debugger
  if (errorData.status === 401) {
    if (errorData.message) {
      $toast(errorData.message, 'e')
    }
    return router.push({ name: 'Login' })
  }
  const { message, details } = errorData
  if (!message) {
    return $toast('接口报错', 'e')
  }
  if (message && !details) {
    return $toast(message, 'e')
  }
  const $dev = getStorage('$dev') ?? import.meta.env.MODE === 'development'
  if ($dev || getStorage('ufm-error-hide', true)) {
    return $toast(message, 'e')
  }

  let isMore = ref(false)

  // 假设 message 和 isMore 是Vue实例的数据属性

  const messageBox = ElMessageBox.confirm(message, {
    dangerouslyUseHTMLString: true,
    beforeClose: (action, instance, done) => {
      handleBeforeClose(action, instance, done)
    },
    cancelButtonText: '不再显示弹框',
    confirmButtonText: '更多',
    distinguishCancelAndClose: true,
    message: () => h('div', null, [renderMessage(isMore.value), renderDetails(isMore.value)]),
    customStyle: {
      maxWidth: '70%',
    },
  })
  function renderMessage(isMore) {
    return h('div', { class: 'm-t-16 bold' }, message)
  }

  function renderDetails(isMore) {
    return h(
      'div',
      {
        style: {
          'max-height': '80vh',
          'overflow-y': 'auto',
        },
      },
      isMore ? details : '',
    )
  }

  function handleBeforeClose(action, ins, done) {
    if (action === 'confirm') {
      isMore.value = !isMore.value
    } else if (action === 'cancel') {
      setStorage('ufm-error-hide', true, true)
      done()
    } else {
      done()
    }
  }
}

// 导出 axios 实例
export default service
