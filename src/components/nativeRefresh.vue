<script setup lang="ts">
/**
 * @描述
 * 本地按钮进行刷新, 不用按ctrl+r就能直接在浏览器刷新.  方便调试和开发
 * 快捷键 cmd + return
 */
import { ref, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance()
const instance = getCurrentInstance()
import useNativeRefresh from '@/hooks/useNativeRefresh.js'
const useRefresh = useNativeRefresh()

addHotKey()
function addHotKey() {
  nextTick(() => {
    let hasBtn = document.getElementById('nativeRefreshBtn')
    if (!hasBtn) {
      return
    }
    // 通过检查event.metaKey（Mac上的Command键）或event.ctrlKey（Windows上的Ctrl键）以及event.key是否为"Enter"来判断同时按下了Command键和回车键。
    document.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        nativeRefresh()
      }
    })
  })
}

function nativeRefresh() {
  useRefresh.refreshHandler()
}
const isDev = ref(proxy.$dev)
function changeMode() {
  isDev.value = !isDev.value
  instance.appContext.app.config.globalProperties.$dev = isDev.value
  proxy.setStorage('$dev', isDev.value)
  nativeRefresh()
}
defineExpose({
  nativeRefresh,
})
</script>

<template>
  <el-button
    v-show="isDev"
    id="nativeRefreshBtn"
    type="danger"
    class="po-f r-50% t-8"
    size="small"
    style="z-index: 9999"
    @click="nativeRefresh"
  >
    刷新
  </el-button>
  <el-button
    v-if="proxy.$test"
    id="nativeRefreshBtn"
    :type="isDev ? 'danger' : 'primary'"
    class="po-f r-40% t-8"
    style="z-index: 9999"
    size="small"
    @click="changeMode"
  >
    {{ isDev ? '开发模式(快速测试)' : '生产模式' }}
  </el-button>
</template>
