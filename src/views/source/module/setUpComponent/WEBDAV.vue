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
  <InputItem
    labelStr="默认目录"
    :value="formStateV.catalog"
    keyName="catalog"
    type="input"
    @changeInputFn="getCatalogValFn"
  />
  <InputItem
    labelStr="用户名"
    :value="formStateV.userName"
    keyName="userName"
    type="input"
    @changeInputFn="getUserNameValFn"
  />
  <!-- <InputItem
    labelStr="密码"
    :value="formStateV.password"
    keyName="password"
    type="input"
    @changeInputFn="getPasswordValFn"
  /> -->
  <g-encryption-input v-model="formStateV.password" title="密码" type="password" />
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

type FormState = {
  name: string
  host: string
  userName: string
  password: string
  catalog: string
  remark: string
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
      host: '',
      userName: '',
      password: '',
      catalog: '',
      remark: '',
      isTLS_visit: false,
      isTLS_book: false,
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

    const getCatalogValFn = (val: any) => {
      commonFn('catalog', val)
    }
    const getPasswordValFn = (val: any) => {
      commonFn('testType', val)
    }
    const getUserNameValFn = (val: any) => {
      commonFn('userName', val)
    }
    const changeTextareaFn = (val: any) => {
      commonFn('remark', val)
    }
    const TLS_Fn = (val: boolean) => {
      commonFn('isTLS_visit', val)
    }
    const SSL_Fn = (val: boolean) => {
      commonFn('isTLS_book', val)
    }
    watch(
      () => props.formState,
      (newVal: any) => {
        if (newVal) {
          formStateV['value'] = newVal
        } else {
          formStateV['value'] = {
            host: '',
            userName: '',
            password: '',
            catalog: '',
            remark: '',
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
      getHostValFn,
      getCatalogValFn,
      getPasswordValFn,
      changeTextareaFn,
      getUserNameValFn,
      TLS_Fn,
      SSL_Fn,
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
