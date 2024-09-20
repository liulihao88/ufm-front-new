<template>
  <InputItem labelStr="请求路径模式" :clientConfig="clientConfig" type="radio3" @getRadioValFn="getPathValFn" />
  <InputItem labelStr="API版本" :clientConfig="clientConfig" type="radio4" @getRadioValFn="getAPIValFn" />
  <InputItem labelStr="桶检查" :clientConfig="clientConfig" type="checked3" @changeClientConfig="getBucketValFn" />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

type ClientConfig = {
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
    formState: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const clientConfig = ref<ClientConfig>({
      pathType: '1',
      API_Version: '1',
      isCheck: false,
    })
    watch(
      () => props.formState,
      (newVal: any) => {
        let data: object = newVal.conf
        if (data) {
          clientConfig['value'].pathType = data.pathStyleAccess ? '1' : '2'
          clientConfig['value'].API_Version = data.apiVersion
          clientConfig['value'].isCheck = data.checkBucketExistence
        }
        console.log(clientConfig, 'clientConfigclientConfig', newVal)
      },
      {
        immediate: true,
        deep: true,
      },
    )
    const commonFn = (name, val) => {
      clientConfig['value'][name] = val
      let data: object = {
        pathStyleAccess: clientConfig['value'].pathType == '1' ? true : false,
        apiVersion: clientConfig['value'].API_Version,
        checkBucketExistence: clientConfig['value'].isCheck,
      }
      emit('getFormState', data)
    }
    const getAPIValFn = (val) => {
      commonFn('API_Version', val)
    }
    const getPathValFn = (val) => {
      commonFn('pathType', val)
    }
    const getBucketValFn = (val) => {
      commonFn('isCheck', val)
    }
    return {
      getAPIValFn,
      clientConfig,
      getPathValFn,
      getBucketValFn,
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
