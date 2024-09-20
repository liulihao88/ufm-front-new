<template>
  <InputItem
    labelStr="名称"
    :value="formStateV.name"
    keyName="name"
    type="nameInput"
    :valueKey="valueKey"
    @changeInputFn="getInputValFn"
  />
  <InputItem labelStr="服务器地址" :value="formStateV.host" keyName="host" type="input" @changeInputFn="getHostValFn" />
  <InputItem labelStr="签名" :value="formStateV.sign" keyName="sign" type="select" @changeSelectFn="getSignValFn" />
  <InputItem
    labelStr="访问键"
    :value="formStateV.visitKey"
    keyName="visitKey"
    type="input"
    @changeInputFn="getVisitValFn"
  />
  <!-- <InputItem
    labelStr="密钥键"
    :value="formStateV.passwordKey"
    keyName="passwordKey"
    type="input"
    @changeInputFn="getPasswordValFn"
  /> -->
  <g-encryption-input v-model="formStateV.passwordKey" title="秘钥键" type="password" />
  <InputItem
    labelStr="默认桶"
    :value="formStateV.buckect"
    keyName="buckect"
    type="input"
    @changeInputFn="getBuckectValFn"
  />
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
type AccountTypeData = {
  value: string
  name: string
}[]

type FormState = {
  name: string
  host: string
  sign: string
  visitKey: string
  remark: string
  passwordKey: string
  buckect: string
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
      remark: '',
      sign: '',
      visitKey: '',
      passwordKey: '',
      buckect: '',
      isTLS_visit: false,
      isTLS_book: false,
    })
    const accountTypeData = ref<AccountTypeData>([
      {
        value: '233',
        name: '33',
      },
    ])
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
    const getSignValFn = (val: any) => {
      commonFn('port', val)
    }
    const getVisitValFn = (val: any) => {
      commonFn('catalog', val)
    }
    const getPasswordValFn = (val: any) => {
      commonFn('testType', val)
    }
    const getBuckectValFn = (val: any) => {
      commonFn('userName', val)
    }
    const TLS_Fn = (val: boolean) => {
      commonFn('isTLS_visit', val)
    }
    const SSL_Fn = (val: boolean) => {
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
            host: '',
            remark: '',
            sign: '',
            visitKey: '',
            passwordKey: '',
            buckect: '',
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
      accountTypeData,
      isDisabled,
      changeCheckFn,
      testData,
      getInputValFn,
      getHostValFn,
      getSignValFn,
      getVisitValFn,
      getPasswordValFn,
      getBuckectValFn,
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
