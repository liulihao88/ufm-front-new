<template>
  <InputItem
    labelStr="名称"
    :value="formStateV.name"
    keyName="name"
    type="nameInput"
    :valueKey="valueKey"
    @changeInputFn="getInputValFn"
  />
  <InputItem
    labelStr="存储服务器"
    :value="formStateV.server"
    keyName="server"
    type="input"
    @changeInputFn="getServerFn"
  />
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
    @changeInputFn="getPasswordValFn"
  /> -->
  <g-encryption-input v-model="formStateV.password" title="密码" type="password" />
  <InputItem labelStr="默认卷" :value="formStateV.roll" keyName="roll" type="input" @changeInputFn="getRollValFn" />
  <InputItem
    labelStr="TLS/SSL"
    :valueTLS="formStateV.isTLS_visit"
    :valueSSL="formStateV.isTLS_book"
    keyName="isTLS_visit"
    type="TLS/SSL"
    @TLS_Fn="TLS_Fn"
    @SSL_Fn="SSL_Fn"
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
import mixinData from '@/mixin/mixinData'
const { valueKey } = mixinData.setup()

type FormState = {
  name: string
  roll: string
  server: string
  userName: string
  remark: string
  password: string
  isTLS_visit: boolean
  isTLS_book: boolean
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
      roll: '',
      remark: '',
      server: '',
      password: '',
      userName: '',
      isTLS_visit: false,
      isTLS_book: false,
    })
    formStateV['value'] = props.formState

    const commonFn = (name, val) => {
      formStateV['value'][name] = val
      emit('getFormState', formStateV['value'])
    }
    const getInputValFn = (val: any) => {
      commonFn('name', val)
    }
    const getRollValFn = (val: any) => {
      commonFn('roll', val)
    }
    const getServerFn = (val: any) => {
      commonFn('server', val)
    }
    const getNameValFn = (val: any) => {
      commonFn('userName', val)
    }
    const getPasswordValFn = (val: any) => {
      commonFn('password', val)
    }
    const TLS_Fn = (val: any) => {
      commonFn('isTLS_visit', val)
    }
    const SSL_Fn = (val: any) => {
      commonFn('isTLS_book', val)
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
            roll: '',
            remark: '',
            server: '',
            password: '',
            userName: '',
            isTLS_visit: false,
            isTLS_book: false,
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
      getRollValFn,
      getServerFn,
      getNameValFn,
      getPasswordValFn,
      TLS_Fn,
      SSL_Fn,
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
