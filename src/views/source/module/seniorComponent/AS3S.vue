<template>
  <InputItem labelStr="客户端配置" :clientConfig="clientConfig" type="checked2" @getConfigValFn="getConfigValFn" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

type ClientConfig = {
  isPath: boolean
  isDual: boolean
  isQuick: boolean
  isPayload: boolean
}
export default defineComponent({
  components: {},
  props: {
    setUpTypeName: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const clientConfig = ref<ClientConfig>({
      isPath: false,
      isDual: false,
      isQuick: false,
      isPayload: false,
    })
    const getConfigValFn = (val: any) => {
      emit('getFormState', val)
    }
    return {
      clientConfig,
      getConfigValFn,
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
