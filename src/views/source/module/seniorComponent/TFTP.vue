<template>
  <InputItem
    labelStr="文件编码"
    :valueString="clientConfig.codeType"
    type="select"
    :option="optionCode"
    @changeSelectFn="getCodeValFn"
  />
  <InputItem
    labelStr="传输文件类型"
    :valueString="clientConfig.codeType"
    type="select"
    :option="optionTranser"
    @changeSelectFn="getTransValFn"
  />
  <InputItem labelStr="连接超时" :valueNum="clientConfig.timeout" type="number" @changeNumberFn="getTimeoutFn" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

type ClientConfig = {
  codeType: string
  transType: string
  timeout: number
}
type CodeType = {
  value: string
  name: string
}[]
export default defineComponent({
  components: {},
  props: {
    setUpTypeName: {
      type: String,
      default: null,
    },
    formState: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const clientConfig = ref<ClientConfig>({
      codeType: 'GBK',
      transType: 'GBK',
      timeout: 10,
    })
    if (props.formState) {
      clientConfig['value'] = props.formState
    }
    watch(
      () => props.formState,
      (valNew) => {
        if (valNew) {
          clientConfig['value'] = valNew
        } else {
          clientConfig['value'] = {
            codeType: '',
            transType: '',
            timeout: 0,
          }
        }
      },
    )
    const optionCode = ref<CodeType>([
      {
        value: 'GBK',
        name: 'GBK',
      },
    ])
    const optionTranser = ref<CodeType>([
      {
        value: 'GBK',
        name: 'GBK',
      },
    ])
    const commonFn = (name, val) => {
      clientConfig['value'][name] = val
      emit('getFormState', clientConfig['value'])
    }
    const getTimeoutFn = (val: any) => {
      commonFn('timeout', val)
    }
    const getCodeValFn = (val: any) => {
      commonFn('codeType', val)
    }
    const getTransValFn = (val: any) => {
      commonFn('transType', val)
    }
    return {
      clientConfig,
      optionCode,
      optionTranser,
      getCodeValFn,
      getTransValFn,
      getTimeoutFn,
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
