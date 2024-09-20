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
    labelStr="默认目录"
    :value="formStateV.catalog"
    keyName="catalog"
    type="input"
    @changeInputFn="getCatalogValFn"
  />
  <InputItem
    labelStr="验证类型"
    :value="formStateV.testType"
    keyName="testType"
    type="select"
    :option="testData"
    @changeSelectFn="getTestValFn"
  />
  <InputItem
    labelStr="用户名"
    :checkAnonymous="formStateV.isAnonymous"
    :value="formStateV.userName"
    keyName="userName"
    type="input_checkbox"
    @changeUserFn="getUserValFn"
    @changeCheckFn="changeCheckFn"
  />
  <!-- <InputItem
    labelStr="密码"
    :value="formStateV.password"
    keyName="password"
    type="password"
    :isDisabled="isDisabled"
    @getPasswordFn="getPasswordValFn"
  /> -->
  <g-encryption-input v-model="formStateV.password" title="密码" type="password" :isDisabled="isDisabled" />
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
  testType: string
  userName: string
  remark: string
  password: string
  host: string
  port: string
  catalog: string
  isAnonymous: boolean
}
export default defineComponent({
  components: {},
  mixins: [],
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
      name: '223',
      testType: '1',
      userName: '',
      remark: '',
      password: '',
      host: '',
      port: '',
      catalog: '',
      isAnonymous: false,
    })
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

    watch(
      () => props.formState,
      (newVal: object) => {
        if (newVal) {
          formStateV['value'] = newVal
        } else {
          formStateV['value'] = {
            name: '',
            testType: '',
            userName: '',
            remark: '',
            password: '',
            host: '',
            port: '',
            catalog: '',
            isAnonymous: false,
          }
        }
      },
      {
        immediate: true,
        deep: true,
      },
    )

    const isDisabled = ref()
    isDisabled['value'] = false
    const changeCheckFn = (val: any) => {
      isDisabled['value'] = val
      formStateV['value']['isAnonymous'] = isDisabled['value']
    }

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
    const getPortValFn = (val: any) => {
      commonFn('port', val)
    }
    const getCatalogValFn = (val: any) => {
      commonFn('catalog', val)
    }
    const getTestValFn = (val: any) => {
      commonFn('testType', val)
    }
    const getUserValFn = (val: any) => {
      console.log(val, 'getUserValFn')
      commonFn('userName', val)
    }
    const getPasswordValFn = (val: any) => {
      console.log(val, '???getPasswordValFn')
      commonFn('password', val)
    }
    const changeTextareaFn = (val: any) => {
      commonFn('remark', val)
    }
    const valueKey = ref('')
    return {
      formStateV,
      testData,
      commonFn,
      isDisabled,
      changeCheckFn,
      getInputValFn,
      getHostValFn,
      getPortValFn,
      getCatalogValFn,
      getTestValFn,
      getUserValFn,
      getPasswordValFn,
      changeTextareaFn,
      valueKey,
    }
  },
})
</script>
