<template>
  <div class="content-box">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="部署客户端"><DeployClient @changeTab="changeTabFn" /></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Deploy2 from './deployResult.vue'
import DeployClient from './deployClient.vue'

let activeKey = ref('1')
let ipArr = ref([])
let deployEl: any = ref(null)
const changeTabFn = (key, newArr) => {
  activeKey.value = key
  ipArr.value = newArr
}
</script>
<style scoped lang="scss">
.content-box {
  width: 100%;
  height: 100%;
  padding-top: 24px !important;
  padding-right: 16px !important;
  padding-left: 16px !important;
  overflow-y: auto;
  background-color: #fff;

  :deep(.ant-tabs-nav) {
    margin-bottom: -4px;
  }
}
</style>
