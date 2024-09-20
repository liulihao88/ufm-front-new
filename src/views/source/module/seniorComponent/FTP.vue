<template>
  <InputItem labelStr="客户端配置" :clientConfig="clientConfig" type="checked5" @changeClientConfig="getClient1ValFn" />
  <InputItem labelStr="" :clientConfig="clientConfig" type="checked7" @changeClientConfig="getClient2ValFn" />
  <InputItem
    labelStr="编码"
    :value="clientConfig.code"
    type="select"
    :option="optionCode"
    @changeSelectFn="getCodeValFn"
  />
  <InputItem
    labelStr="本地数据传输方式"
    :value="clientConfig.transer"
    type="select"
    :option="optionTranser"
    @changeSelectFn="getTransValFn"
  />
  <InputItem
    labelStr="目录清单"
    :value="clientConfig.catalog"
    type="select"
    :option="optionCatalog"
    @changeSelectFn="getCatalogValFn"
  />
  <InputItem
    labelStr="传输文件类型"
    :value="clientConfig.fileType"
    type="select"
    :option="optionCatalog"
    @changeSelectFn="getFileValFn"
  />
  <InputItem labelStr="登录账户" :value="clientConfig.loginUser" type="input" @changeInputFn="getLoginFn" />
  <InputItem
    labelStr="缓冲区数据流空间"
    :valueNum="clientConfig.space"
    type="number"
    tipStr="KB"
    @changeNumberFn="getSpaceFn"
  />
  <InputItem labelStr="默认连接池数量" :valueNum="clientConfig.linkNum" type="number" @changeNumberFn="getLinkFn" />
  <InputItem
    labelStr="登录后执行命令"
    :value="clientConfig.order"
    type="textarea"
    @changeTextareaFn="changeTextareaFn"
  />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

type ClientConfig = {
  isMonitor: boolean
  isUTF_8: boolean
  code: string
  transer: string
  catalog: string
  fileType: string
  space: number
  linkNum: number
  order: string
  loginUser: string
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
      isMonitor: false,
      isUTF_8: false,
      code: '',
      transer: '',
      catalog: '',
      fileType: '',
      space: 0,
      linkNum: 0,
      order: '',
      loginUser: '',
    })

    if (props.formState) {
      clientConfig['value'] = props.formState
    }
    watch(
      () => props.formState,
      (valNew) => {
        clientConfig['value'] = valNew
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
    const optionCatalog = ref<CodeType>([
      {
        value: 'GBK',
        name: 'GBK',
      },
    ])
    const commonFn = (name, val) => {
      clientConfig['value'][name] = val
      emit('getFormState', clientConfig['value'])
    }
    const getClient1ValFn = (val: any) => {
      commonFn('isMonitor', val)
    }
    const getClient2ValFn = (val: any) => {
      commonFn('isUTF_8', val)
    }
    const getCodeValFn = (val: any) => {
      commonFn('code', val)
    }
    const getTransValFn = (val: any) => {
      commonFn('isMonitor', val)
    }
    const getCatalogValFn = (val: any) => {
      commonFn('catalog', val)
    }
    const getFileValFn = (val: any) => {
      commonFn('fileType', val)
    }
    const getLoginFn = (val: any) => {
      commonFn('loginUser', val)
    }
    const getSpaceFn = (val: any) => {
      commonFn('space', val)
    }
    const getLinkFn = (val: any) => {
      commonFn('linkNum', val)
    }
    const changeTextareaFn = (val: any) => {
      commonFn('order', val)
    }
    return {
      clientConfig,
      optionCode,
      optionTranser,
      optionCatalog,
      getClient1ValFn,
      getClient2ValFn,
      getCodeValFn,
      getTransValFn,
      getCatalogValFn,
      getFileValFn,
      getLoginFn,
      getSpaceFn,
      getLinkFn,
      changeTextareaFn,
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
