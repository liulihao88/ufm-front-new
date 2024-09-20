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
    labelStr="登录URL"
    :value="formStateV.loginUrl"
    keyName="loginUrl"
    type="input"
    @changeInputFn="getURLValFn"
  />
  <InputItem
    labelStr="验证方式"
    :value="formStateV.testType"
    keyName="testType"
    type="select"
    @changeSelectFn="getTestValFn"
  />
  <InputItem
    labelStr="租户ID"
    :value="formStateV.tenantID"
    keyName="tenantID"
    type="input"
    @changeInputFn="getTenantValFn"
  />
  <InputItem
    labelStr="用户名"
    :value="formStateV.userName"
    keyName="userName"
    type="input"
    @changeInputFn="getUserValFn"
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
  loginUrl: string
  testType: string
  tenantID: string
  password: string
  userName: string
  isTLS_visit: boolean
  isTLS_book: boolean
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
  setup(props) {
    const formStateV = ref<FormState>({
      name: '',
      testType: '',
      remark: '',
      loginUrl: '',
      password: '',
      userName: '',
      tenantID: '',
      isTLS_visit: false,
      isTLS_book: false,
    })
    const systemEnterFn = (val: any, systemEnterType: string) => {
      formStateV['value'][systemEnterType] = val
    }

    const isDisabled = ref()
    isDisabled['value'] = false
    const changeCheckFn = (val: any) => {
      if (val.checked) {
        isDisabled['value'] = true
      } else {
        isDisabled['value'] = false
      }
    }

    const testData: any = ref()
    testData['value'] = [
      {
        name: 'Any',
        value: 'Any',
      },
      {
        name: '本地',
        value: 'Local',
      },
      {
        name: 'UCenter',
        value: 'UCenter',
      },
    ]

    const getInputValFn = (val: any) => {
      formStateV['value']['name'] = val
    }
    const getURLValFn = (val: any) => {
      formStateV['value']['host'] = val
    }
    const getTenantValFn = (val: any) => {
      formStateV['value']['port'] = val
    }
    const getTestValFn = (val: any) => {
      formStateV['value']['testType'] = val
    }
    const getUserValFn = (val: any) => {
      formStateV['value']['userName'] = val
    }
    const getPasswordValFn = (val: any) => {
      formStateV['value']['password'] = val
    }
    const changeTextareaFn = (val: any) => {
      formStateV['value']['name'] = val
    }
    const TLS_Fn = () => {
      //commonFn("isTLS_visit", val);
    }
    const SSL_Fn = () => {
      // commonFn("isTLS_book", val);
    }
    watch(
      () => props.formState,
      (newVal: any) => {
        if (newVal) {
          formStateV['value'] = newVal
        } else {
          formStateV['value'] = {
            name: '',
            testType: '',
            remark: '',
            loginUrl: '',
            password: '',
            userName: '',
            tenantID: '',
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
    const valueKey = ref('')
    return {
      formStateV,
      getInputValFn,
      isDisabled,
      changeCheckFn,
      systemEnterFn,
      testData,
      getTestValFn,
      getURLValFn,
      getTenantValFn,
      getUserValFn,
      changeTextareaFn,
      TLS_Fn,
      SSL_Fn,
      valueKey,
      getPasswordValFn,
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
