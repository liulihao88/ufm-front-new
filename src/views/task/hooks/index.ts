import { isString, isEmpty } from '@pureadmin/utils'
import { useMultiTagsStoreHook } from '@/store/modules/multiTags'
import { useRouter, useRoute, type LocationQueryRaw, type RouteParamsRaw } from 'vue-router'

export function useDetail() {
  const route = useRoute()
  const router = useRouter()
  const getParameter = isEmpty(route.params) ? route.query : route.params

  function toDetail(parameter: LocationQueryRaw | RouteParamsRaw, model: 'query' | 'replace') {
    // ⚠️ 这里要特别注意下，因为vue-router在解析路由参数的时候会自动转化成字符串类型，比如在使用useRoute().route.query或useRoute().route.params时，得到的参数都是字符串类型
    // 所以在传参的时候，如果参数是数字类型，就需要在此处 toString() 一下，保证传参跟路由参数类型一致都是字符串，这是必不可少的环节！！！
    Object.keys(parameter).forEach((param) => {
      if (!isString(parameter[param])) {
        parameter[param] = parameter[param]?.toString()
      }
    })

    let nowRoute = {
      path: `/task/edit`,
      name: 'Edit',
      query: parameter,
      meta: {
        title: parameter.id ? `任务-${parameter.name}` : `新建任务-${parameter.index}`,
        // 如果使用的是非国际化精简版title可以像下面这么写
        // title: `No.${index} - 详情信息`,
        // 最大打开标签数
        dynamicLevel: 50,
      },
    }
    if (model === 'query') {
      // 保存信息到标签页
      if (model === 'query') {
        useMultiTagsStoreHook().handleTags('push', nowRoute)
        // 路由跳转
        router.push({ name: 'Edit', query: parameter })
      }
    }
    if (model === 'replace') {
      const multiTags = useMultiTagsStoreHook().multiTags
      let newMultiTags = multiTags.map((v) => {
        if (v?.query?.id === parameter.id) {
          v = nowRoute
        }
        if (v?.query?.index === route?.query?.index && route?.query?.index) {
          v = nowRoute
        }
        return v
      })
      useMultiTagsStoreHook().handleTags('equal', newMultiTags)
      router.replace({ name: 'Edit', query: parameter })
    }
  }

  // 用于页面刷新，重新获取浏览器地址栏参数并保存到标签页
  const initToDetail = (model: 'query' | 'params') => {
    if (getParameter) toDetail(getParameter, model)
  }

  return { toDetail, initToDetail, getParameter, router }
}
