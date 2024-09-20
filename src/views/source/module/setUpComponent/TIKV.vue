<template>
  <InputItem
    labelStr="名称"
    :value="formStateV.name"
    keyName="name"
    type="nameInput"
    valueKey=""
    @changeInputFn="getInputValFn"
  />
  <InputItem labelStr="主机" :value="formStateV.host" keyName="host" type="input" @changeInputFn="getHostValFn" />
  <InputItem labelStr="端口" :value="formStateV.port" keyName="port" type="input" @changeInputFn="getPortValFn" />
  <InputItem
    labelStr="默认键前缀"
    :value="formStateV.prefix"
    keyName="userName"
    type="input"
    @changeInputFn="getPrefixValFn"
  />
  <InputItem
    labelStr="默认扫描限制"
    :valueNum="formStateV.limit"
    keyName="password"
    type="number"
    @changeInputFn="getPreLimitValFn"
  />
  <InputItem labelStr="客户端方式" :valueView="formStateV.client" type="radio8" @changeCheckFn="changeClientFn" />
  <InputItem
    labelStr="备注"
    :value="formStateV.remark"
    keyName="remark"
    type="textarea"
    @changeTextareaFn="changeTextareaFn"
  />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
type FormState = {
  name: string
  host: string
  port: string
  prefix: string
  limit: number
  client: string
  remark: string
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
    const formStateV = ref<FormState>({
      name: '',
      host: '',
      port: '',
      prefix: '',
      limit: 0,
      client: '',
      remark: '',
    })
    const commonFn = (name, val) => {
      formStateV['value'][name] = val
      emit('getFormState', formStateV['value'])
    }
    const getInputValFn = (val: any) => {
      commonFn('name', val)
    }
    const getHostValFn = (val: any) => {
      commonFn('host', val)
    }
    const getPortValFn = (val: any) => {
      commonFn('port', val)
    }
    const getPrefixValFn = (val: any) => {
      commonFn('userName', val)
    }
    const getPreLimitValFn = (val: any) => {
      commonFn('password', val)
    }
    const changeClientFn = (val: any) => {
      commonFn('client', val)
    }
    const changeTextareaFn = (val: any) => {
      commonFn('remark', val)
    }
    watch(
      () => props.formState,
      (newVal: any) => {
        if (newVal) {
          formStateV['value'] = newVal
        } else {
          formStateV['value'] = {
            name: '',
            host: '',
            port: '',
            prefix: '',
            limit: 0,
            client: '',
            remark: '',
          }
        }
      },
      {
        immediate: true,
        deep: true,
      },
    )
    return {
      formStateV,
      getInputValFn,
      getHostValFn,
      getPortValFn,
      getPrefixValFn,
      getPreLimitValFn,
      changeTextareaFn,
      changeClientFn,
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
