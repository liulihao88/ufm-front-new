// useRouterHooks.js
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export function useRouterHooks() {
  const router = useRouter()
  console.log(`04 router`, router)
  const route = useRoute()

  const navigateTo = (path) => {
    router.push(path)
  }

  const navigateWithQuery = (path, query) => {
    router.push({ path, query })
  }

  const getQueryParam = (key) => {
    return route.query[key]
  }

  const setQueryParam = (key, value) => {
    const newQuery = { ...route.query, [key]: value }
    router.push({ ...route, query: newQuery })
  }

  return {
    navigateTo,
    navigateWithQuery,
    getQueryParam,
    setQueryParam,
  }
}
