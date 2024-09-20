<template>
  <InputItem
    labelStr="名称"
    :value="formStateV.name"
    keyName="name"
    type="nameInput"
    :valueKey="valueKey"
    @changeInputFn="getInputValFn"
  />
  <InputItem labelStr="主机" :value="formStateV.host" keyName="host" type="input" @changeInputFn="getHostValFn" />
  <InputItem labelStr="端口" :value="formStateV.port" keyName="port" type="input" @changeInputFn="getPortValFn" />
  <InputItem
    labelStr="默认目录"
    :value="formStateV.catalog"
    keyName="password"
    type="input"
    @changeInputFn="getCatalogValFn"
  />
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
  catalog: string
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
      catalog: '',
      remark: '',
    })
    const isDisabled = ref()
    isDisabled['value'] = false
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
    const getNameValFn = (val: any) => {
      commonFn('userName', val)
    }
    const getPasswordValFn = (val: any) => {
      commonFn('password', val)
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
            catalog: '',
            userName: '',
            password: '',
            remark: '',
          }
        }
      },
      {
        immediate: true,
        deep: true,
      },
    )
    const valueKey = ref('')
    return {
      formStateV,
      isDisabled,
      getInputValFn,
      getHostValFn,
      getPortValFn,
      getNameValFn,
      getPasswordValFn,
      changeTextareaFn,
      valueKey,
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
