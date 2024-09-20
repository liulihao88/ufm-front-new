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
    labelStr="验证类型"
    :value="formStateV.testType"
    keyName="testType"
    type="select"
    :option="testData"
    @changeInputFn="getTestFn"
  />
  <InputItem
    labelStr="服务地址"
    :value="formStateV.serverType"
    :serverUrl="formStateV.serverUrl"
    keyName="serverUrl"
    type="radio"
    @changeCheckFn="getServerFn"
  />
  <InputItem
    labelStr="账户名"
    :value="formStateV.userName"
    keyName="userName"
    type="input"
    @changeInputFn="getNameValFn"
  />
  <!-- <InputItem
    labelStr="账户密钥"
    :value="formStateV.password"
    keyName="password"
    type="input"
    @changeInputFn="getPasswordValFn"
  /> -->
  <g-encryption-input v-model="formStateV.password" title="账户密钥" type="password" />
  <InputItem
    labelStr="TLS/SSL"
    :value="formStateV.isTLS_visit"
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
type AccountTypeData = {
  value: string
  name: string
}[]

type FormState = {
  name: string
  testType: string
  serverUrl: string
  serverType: string
  userName: string
  remark: string
  password: string
  isTLS_visit: boolean
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
    type: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const formStateV = ref<FormState>({
      name: '',
      testType: '',
      remark: '',
      serverUrl: '',
      serverType: '',
      password: '',
      userName: '',
      isTLS_visit: false,
    })
    formStateV['value'] = props.formState
    const accountTypeData = ref<AccountTypeData>([
      {
        value: '233',
        name: '33',
      },
    ])
    const isDisabled = ref()
    isDisabled['value'] = false
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

    const commonFn = (name, val) => {
      formStateV['value'][name] = val
      emit('getFormState', formStateV['value'])
    }
    const getInputValFn = (val: any) => {
      commonFn('name', val)
    }
    const getTestFn = (val: any) => {
      commonFn('testType', val)
    }
    const getServerFn = (val: any) => {
      commonFn('serverUrl', val)
    }
    const getNameValFn = (val: any) => {
      commonFn('userName', val)
    }
    const getPasswordValFn = (val: any) => {
      commonFn('passwordKey', val)
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
            testType: '',
            remark: '',
            serverUrl: '',
            serverType: '',
            password: '',
            userName: '',
            isTLS_visit: false,
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
      accountTypeData,
      isDisabled,
      testData,
      getInputValFn,
      getTestFn,
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
