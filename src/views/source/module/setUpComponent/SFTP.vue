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
    labelStr="用户名"
    :value="formStateV.userName"
    keyName="userName"
    type="input"
    @changeInputFn="getNameValFn"
  />
  <!-- <InputItem
    labelStr="密码"
    :value="formStateV.password"
    keyName="password"
    type="input"
    :isDisabled="isDisabled"
    @changeInputFn="getPasswordValFn"
  /> -->
  <g-encryption-input v-model="formStateV.password" title="密码" type="password" :isDisabled="isDisabled" />
  <InputItem labelStr="默认目录" :value="formStateV.catalog" keyName="password" type="input" />
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
  userName: string
  password: string
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
      userName: '',
      password: '',
      remark: '',
    })
    const isDisabled = ref()
    isDisabled['value'] = false
    const changeCheckFn = (val: any) => {
      if (val.checked) {
        isDisabled['value'] = true
      } else {
        isDisabled['value'] = false
      }
    }

    const commonFn = (name: string, val: object) => {
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
      getInputValFn,
      isDisabled,
      changeCheckFn,
      getPortValFn,
      getHostValFn,
      getNameValFn,
      getPasswordValFn,
      changeTextareaFn,
      valueKey,
    }
  },
})
</script>
<style lang="scss" scoped>
.tips-el {
  padding-top: 8px;
  font-size: 12px;
  color: #d9d9d9;
}
</style>
