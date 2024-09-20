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
    labelStr="数据库"
    :value="formStateV.database"
    keyName="testType"
    type="select"
    :option="database"
    @changeSelectFn="getDatabaseValFn"
  />
  <InputItem labelStr="主机" :value="formStateV.host" keyName="host" type="input" @changeInputFn="getHostValFn" />
  <InputItem labelStr="端口" :value="formStateV.port" keyName="port" type="input" @changeInputFn="getPortValFn" />
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
    type="password"
    :isDisabled="isDisabled"
    @changeInputFn="getPasswordValFn"
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
  database: string
  userName: string
  remark: string
  password: string
  host: string
  port: string
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
      name: '',
      database: '',
      userName: '',
      remark: '',
      password: '',
      host: '',
      port: '',
    })
    const database: any = ref()
    database['value'] = [
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
      (newVal: any) => {
        if (newVal) {
          formStateV['value'] = newVal
        } else {
          formStateV['value'] = {
            name: '',
            database: '',
            userName: '',
            remark: '',
            password: '',
            host: '',
            port: '',
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
      if (val.checked) {
        isDisabled['value'] = true
      } else {
        isDisabled['value'] = false
      }
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
    const getDatabaseValFn = (val: any) => {
      commonFn('testType', val)
    }
    const getUserValFn = (val: any) => {
      commonFn('userName', val)
    }
    const getPasswordValFn = (val: any) => {
      commonFn('password', val)
    }
    const changeTextareaFn = (val: any) => {
      commonFn('remark', val)
    }
    const valueKey = ref('')
    return {
      formStateV,
      database,
      commonFn,
      isDisabled,
      changeCheckFn,
      getInputValFn,
      getHostValFn,
      getPortValFn,
      getCatalogValFn,
      getDatabaseValFn,
      getUserValFn,
      getPasswordValFn,
      changeTextareaFn,
      valueKey,
    }
  },
})
</script>
