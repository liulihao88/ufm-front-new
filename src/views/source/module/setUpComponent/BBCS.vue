<template>
  <InputItem
    labelStr="名称"
    :value="formStateV.name"
    keyName="name"
    type="nameInput"
    :valueKey="valueKey"
    @changeInputFn="getInputValFn"
  />
  <InputItem labelStr="登录ID" :value="formStateV.loginID" keyName="loginID" type="input" @changeInputFn="getIDValFn" />
  <InputItem
    labelStr="登录密钥"
    :value="formStateV.loginPassword"
    keyName="loginPassword"
    type="input"
    @changeInputFn="getLoginValFn"
  />
  <InputItem
    labelStr="默认桶"
    :value="formStateV.buckect"
    keyName="buckect"
    type="input"
    @changeInputFn="getBuckectValFn"
  />
  <InputItem labelStr="" :valueTLS="formStateV.isTLS_visit" keyName="isTLS_visit" type="TLS" @TLS_Fn="TLS_Fn" />
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
  loginID: string
  loginPassword: string
  buckect: string
  remark: string
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
  },
  setup(props, { emit }) {
    const formStateV = ref<FormState>({
      name: '',
      loginID: '',
      remark: '',
      loginPassword: '',
      buckect: '',
      isTLS_visit: false,
    })
    const commonFn = (name, val) => {
      formStateV['value'][name] = val
      emit('getFormState', formStateV['value'])
    }
    const getInputValFn = (val: any) => {
      commonFn('name', val)
    }
    const getIDValFn = (val: any) => {
      commonFn('loginID', val)
    }
    const getLoginValFn = (val: any) => {
      commonFn('loginPassword', val)
    }
    const getBuckectValFn = (val: any) => {
      commonFn('buckect', val)
    }
    const TLS_Fn = (val: boolean) => {
      commonFn('isTLS_visit', val)
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
            loginID: '',
            remark: '',
            loginPassword: '',
            buckect: '',
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
      getInputValFn,
      getIDValFn,
      getLoginValFn,
      getBuckectValFn,
      TLS_Fn,
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
