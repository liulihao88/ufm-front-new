<template>
  <InputItem
    labelStr="名称"
    :value="formStateV.name"
    keyName="name"
    type="nameInput"
    :valueKey="valueKey"
    @changeInputFn="getNameFn"
  />
  <InputItem
    labelStr="账户类型"
    :option="accountTypeData"
    :value="formStateV.accountType"
    keyName="accountType"
    type="select"
    @changeSelectFn="getAccountValFn"
  />
  <InputItem
    labelStr="区域"
    :value="formStateV.area"
    keyName="area"
    type="areaInput"
    :option="areaData"
    :isAll="formStateV.isAll"
    @changeSelectFn="getAreaValFn"
    @changeCheckFn="changeCheckFn"
  />
  <InputItem
    labelStr="访问键"
    :value="formStateV.visitKey"
    keyName="visitKey"
    type="input"
    @changeInputFn="getVistValFn"
  />
  <!-- <InputItem
    labelStr="密钥键"
    :value="formStateV.passwordKey"
    keyName="passwordKey"
    type="input"
    @changeInputFn="getKeyValFn"
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

type AccountTypeData = {
  value: string
  name: string
}[]

type FormStateV = {
  name: string
  accountType: string
  area: AccountTypeData
  remark: string
  visitKey: string
  passwordKey: string
  buckect: AccountTypeData
  isTLS_visit: boolean
  isTLS_book: boolean
  isAll: boolean
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
    const formStateV = ref<FormStateV>({
      name: '',
      accountType: '',
      area: '',
      remark: '',
      visitKey: '',
      passwordKey: '',
      buckect: '',
      isTLS_visit: true,
      isAll: true,
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

    const areaData: any = ref()
    areaData['value'] = [
      {
        name: 'US',
        value: 'US',
      },
      {
        name: 'China',
        value: 'China',
      },
    ]
    const commonFn = (name, val) => {
      formStateV['value'][name] = val
      emit('getFormState', formStateV['value'])
    }
    const getNameFn = (val: string) => {
      commonFn('name', val)
    }
    const getAccountValFn = (val: string) => {
      commonFn('accountType', val.value)
    }
    const getAreaValFn = (val: string) => {
      console.log(val, 'valval')
      commonFn('area', val.value)
    }
    const changeCheckFn = (val: any) => {
      if (val.checked) {
        isDisabled['value'] = true
      } else {
        isDisabled['value'] = false
      }
      commonFn('isAll', isDisabled['value'])
    }
    const getVistValFn = (val: string) => {
      commonFn('visitKey', val)
    }
    const getKeyValFn = (val: string) => {
      commonFn('passwordKey', val)
    }
    const getBuckectValFn = (val: string) => {
      commonFn('buckect', val)
    }
    const TLS_Fn = (val: boolean) => {
      commonFn('isTLS_visit', val)
    }
    const SSL_Fn = (val: boolean) => {
      commonFn('isTLS_book', val)
    }
    const changeTextareaFn = (val: boolean) => {
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
            accountType: '',
            area: '',
            remark: '',
            visitKey: '',
            passwordKey: '',
            buckect: '',
            isTLS_visit: true,
            isAll: true,
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
      accountTypeData,
      isDisabled,
      changeCheckFn,
      areaData,
      getNameFn,
      commonFn,
      getAccountValFn,
      getAreaValFn,
      getVistValFn,
      getKeyValFn,
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
