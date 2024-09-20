/**
 * @params
 * loading: '$loading' || true
 * <el-button :loading="$loading"></el-button>
  import { $loading } from "@/utils/request.ts";
  request({
   loading: '$loading',
  })
 */

import { ref } from 'vue'
export function useLoading() {
  const storeLoading = ref(false)
  const storeLoading1 = ref(false)
  // const storeLoading1 = ref(true)

  function storeLoadingTrue(loadingText) {
    if (loadingText === true) {
      storeLoading.value = true
    }
    if (loadingText === 'loading1') {
      storeLoading1.value = true
    }
  }

  function storeLoadingFalse() {
    storeLoading.value = false
    storeLoading1.value = false
  }

  return {
    storeLoading1,
    storeLoading,
    storeLoadingTrue,
    storeLoadingFalse,
  }
}
