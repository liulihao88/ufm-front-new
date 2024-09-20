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
    labelStr="服务提供商"
    :value="formStateV.serverOffer"
    keyName="serverOffer"
    type="select"
    @changeSelectFn="getServerOfferValFn"
  />
  <InputItem
    labelStr="系统入口类型"
    :value="formStateV.systemEnterType"
    keyName="systemEnterType"
    type="radio6"
    @changeCheckFn="systemEnterFn"
  />

  <InputItem
    labelStr="区域"
    :value="formStateV.area"
    keyName="area"
    type="select"
    :option="areaData"
    @changeSelectFn="getAreaValFn"
  />

  <InputItem labelStr="服务器地址" :value="formStateV.host" keyName="host" type="input" @changeInputFn="getHostValFn" />
  <InputItem
    labelStr="签名"
    :value="formStateV.sign"
    keyName="sign"
    type="select"
    :option="signData"
    @changeInputFn="getSignValFn"
  />
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
    type="password"
    @changeInputFn="getPasswordValFn"
  /> -->
  <g-encryption-input v-model="formStateV.passwordKey" title="秘钥键" type="password" />
  <InputItem
    labelStr="默认桶"
    :value="formStateV.buckect"
    keyName="buckect"
    type="input"
    @changeInputFn="getBucketValFn"
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

type FormState = {
  name: string
  serverOffer: string
  area: string
  sign: string
  remark: string
  visitKey: string
  passwordKey: string
  buckect: string
  host: string
  isTLS_visit: boolean
  isTLS_book: boolean
  systemEnterType: string
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
      serverOffer: '',
      area: '',
      sign: '',
      remark: '',
      visitKey: '',
      passwordKey: '',
      buckect: '',
      host: '',
      isTLS_visit: false,
      isTLS_book: false,
      systemEnterType: '',
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

    const systemEnterFn = (val: any) => {
      commonFn('systemEnterType', val)
    }

    const getInputValFn = (val: any) => {
      commonFn('name', val)
    }
    const getHostValFn = (val: any) => {
      commonFn('host', val)
    }
    const getSignValFn = (val: any) => {
      commonFn('sign', val)
    }
    const getVisitValFn = (val: any) => {
      commonFn('visitKey', val)
    }
    const getPasswordValFn = (val: any) => {
      commonFn('passwordKey', val)
    }
    const getBucketValFn = (val: any) => {
      commonFn('buckect', val)
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
    const getServerOfferValFn = (val: any) => {
      commonFn('serverOffer', val)
    }
    const getAreaValFn = (val: any) => {
      commonFn('area', val)
    }
    watch(
      () => props.formState,
      (newVal: any) => {
        if (newVal) {
          formStateV['value'] = newVal
        } else {
          formStateV['value'] = {
            name: '',
            serverOffer: '',
            area: '',
            sign: '',
            remark: '',
            visitKey: '',
            passwordKey: '',
            buckect: '',
            host: '',
            isTLS_visit: false,
            isTLS_book: false,
            systemEnterType: '',
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
      accountTypeData,
      isDisabled,
      changeCheckFn,
      areaData,
      systemEnterFn,
      getHostValFn,
      getSignValFn,
      getVisitValFn,
      getPasswordValFn,
      getBucketValFn,
      TLS_Fn,
      SSL_Fn,
      changeTextareaFn,
      getServerOfferValFn,
      getAreaValFn,
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
