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
    labelStr="版本"
    :value="formStateV.edition"
    keyName="edition"
    type="select"
    @changeSelectFn="getEditionValFn"
  />
  <InputItem
    labelStr="租户"
    :value="formStateV.tenantID"
    keyName="tenantID"
    type="input"
    @changeInputFn="getTenantValFn"
  />
  <InputItem labelStr="域名" :value="formStateV.domain" keyName="domain" type="input" @changeInputFn="getDomainValFn" />
  <InputItem
    labelStr="空间名"
    :value="formStateV.spaceName"
    keyName="spaceName"
    type="input"
    @changeInputFn="getSpaceNameValFn"
  />
  <InputItem
    labelStr="认证"
    :value="formStateV.approve"
    keyName="approve"
    type="select"
    @changeSelectFn="getApproveValFn"
  />
  <InputItem
    labelStr="Base64用户名"
    :value="formStateV.base64Name"
    keyName="base64Name"
    type="changeBtn"
    btnStr="Base64用户名"
    @changeInputFn="getBase64NameValFn"
  />
  <InputItem
    labelStr="MD5密码"
    :value="formStateV.MD5"
    keyName="MD5"
    type="changeBtn"
    btnStr="MD5密码"
    @changeInputFn="getMD5ValFn"
  />
  <InputItem
    labelStr="TLS/SSL"
    :valueTLS="formStateV.isTLS_visit"
    keyName="isTLS_visit"
    type="TLS"
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
  edition: string
  tenantID: string
  domain: string
  remark: string
  spaceName: string
  approve: string
  base64Name: string
  MD5: string
  isTLS_visit: boolean
}
export default defineComponent({
  components: {},
  props: {
    setUpTypeName: {
      type: String,
      default: null,
    },
    type: {
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
      edition: '',
      remark: '',
      tenantID: '',
      domain: '',
      spaceName: '',
      approve: '',
      base64Name: '',
      MD5: '',
      isTLS_visit: false,
    })
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
    const getEditionValFn = (val: any) => {
      commonFn('host', val)
    }
    const getTenantValFn = (val: any) => {
      commonFn('port', val)
    }
    const getDomainValFn = (val: any) => {
      commonFn('catalog', val)
    }
    const getSpaceNameValFn = (val: any) => {
      commonFn('testType', val)
    }
    const getApproveValFn = (val: any) => {
      commonFn('userName', val)
    }
    const getBase64NameValFn = (val: any) => {
      commonFn('password', val)
    }
    const getMD5ValFn = (val: any) => {
      commonFn('password', val)
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
            name: '',
            edition: '',
            remark: '',
            tenantID: '',
            domain: '',
            spaceName: '',
            approve: '',
            base64Name: '',
            MD5: '',
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
      getEditionValFn,
      getTenantValFn,
      getDomainValFn,
      getSpaceNameValFn,
      getApproveValFn,
      getBase64NameValFn,
      getMD5ValFn,
      changeTextareaFn,
      TLS_Fn,
      SSL_Fn,
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
