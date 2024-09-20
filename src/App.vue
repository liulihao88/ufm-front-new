<script lang="ts" setup>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

import { useRouter } from 'vue-router'
const router = useRouter()

import { ref, onMounted, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import NativeRefresh from '@/components/nativeRefresh.vue'
import useNativeRefresh from '@/hooks/useNativeRefresh.js'
moment.locale('zh-cn')
const locale = ref(zhCN)
const useRefresh = useNativeRefresh()
// 非测试环境, 清除本地$dev
if (!proxy.$test) {
  proxy.clearStorage('$dev')
}
proxy.clearStorage('ufm-error-hide')
</script>

<template>
  <a-config-provider :locale="locale">
    <router-view v-if="useRefresh.refresh" class="router-content-page" />
    <native-refresh ref="refreshRef" />
  </a-config-provider>
</template>

<style lang="scss">
#app {
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  font-family: sans-serif, Arial, Avenir, Helvetica;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
