import { useGlobalStore } from '@/store/useGlobal.js'
import { clearStorage } from 'oeos-components'
import { useRouter, useRoute } from 'vue-router'
import request from '@/utils/request.ts'

export default function useLogout() {
  const router = useRouter()
  const toLogin = async (isLocal = false) => {
    if (isLocal !== true) {
      let res = await request({
        url: '/auth/signout',
        method: 'put',
        custom: true,
      })
    }
    const { changeTaskValue } = useGlobalStore()
    clearStorage()
    changeTaskValue('', '')
    if (router) {
      router.replace({ name: 'login' })
    }
  }
  return {
    toLogin,
  }
}
