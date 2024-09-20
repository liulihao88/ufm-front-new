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
    labelStr="HCP入口"
    :value="formStateV.HCP_enter"
    keyName="HCP_enter"
    type="select"
    @changeSelectFn="getHCPValFn"
  />
  <InputItem
    labelStr="查询方式"
    :value="formStateV.queryType"
    keyName="queryType"
    type="select"
    @changeSelectFn="getQueryValFn"
  />
  <InputItem
    labelStr="查询脚本"
    :value="formStateV.queryScript"
    keyName="queryScript"
    type="input"
    @changeInputFn="getScriptValFn"
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
  HCP_enter: string
  queryType: string
  queryScript: string
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
  setup(props, { emit }) {
    const formStateV = ref<FormState>({
      name: '',
      HCP_enter: '',
      remark: '',
      queryType: '',
      queryScript: '',
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
    const getHCPValFn = (val: any) => {
      commonFn('host', val)
    }
    const getQueryValFn = (val: any) => {
      commonFn('port', val)
    }
    const getScriptValFn = (val: any) => {
      commonFn('catalog', val)
    }
    const changeTextareaFn = (val: any) => {
      commonFn('testType', val)
    }

    watch(
      () => props.formState,
      (newVal: any) => {
        if (newVal) {
          formStateV['value'] = newVal
        } else {
          formStateV['value'] = {
            name: '',
            HCP_enter: '',
            remark: '',
            queryType: '',
            queryScript: '',
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
      testData,
      getInputValFn,
      getHCPValFn,
      getQueryValFn,
      getScriptValFn,
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
