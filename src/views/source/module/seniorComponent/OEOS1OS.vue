<template>
  <InputItem labelStr="删除配置" :clientConfig="clientConfig" type="checked4" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

type ClientConfig = {
  isPath: boolean
  isDual: boolean
  isQuick: boolean
  isPayload: boolean
  pathType: string
  API_Version: string
  isCheck: boolean
}
export default defineComponent({
  components: {},
  props: {
    setUpTypeName: {
      type: String,
      default: null,
    },
  },
  setup() {
    const clientConfig = ref<ClientConfig>({
      pathType: '1',
      API_Version: '1',
      isCheck: false,
      isPath: false,
      isDual: false,
      isQuick: false,
      isPayload: false,
    })
    const emitDataFn = () => {
      return clientConfig['value']
    }
    return {
      emitDataFn,
      clientConfig,
    }
  },
})
</script>
<style scoped lang="scss">
.tips-el {
  padding-top: 8px;
  font-size: 12px;
  color: #d9d9d9;
}
</style>
