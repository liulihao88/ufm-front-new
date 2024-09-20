<template>
  <InputItem
    labelStr="文件编码"
    :value="formDataV.codeType"
    type="select"
    :option="optionCode"
    @changeSelectFn="getCodeValFn"
  />
  <InputItem
    labelStr="SSH私钥文件"
    :value="formDataV.SSH"
    type="selectFile"
    @changeSelectFn="getSSHValFn"
    @getFileDataFn="getFileDataFn"
  />
  <InputItem labelStr="密码" :value="formDataV.password" type="input" @changeInputFn="getPasswordValFn" />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

type FormData = {
  codeType: string
  SSH: string
  password: string
}
type CodeType = {
  value: string
  name: string
}[]
export default defineComponent({
  components: {},
  props: {
    setUpTypeName: {
      type: String,
      default: null,
    },
    formData: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const formDataV = ref<FormData>({
      codeType: '',
      SSH: '',
      password: '',
    })
    if (props.formState) {
      formDataV['value'] = props.formState
    }
    const optionCode = ref<CodeType>([
      {
        value: 'GBK',
        name: 'GBK',
      },
    ])
    const commonFn = (name, val) => {
      formDataV['value'][name] = val
      emit('getFormState', formDataV['value'])
    }
    const getCodeValFn = (val: any) => {
      commonFn('code', val)
    }
    const getSSHValFn = (val: any) => {
      commonFn('SSH', val)
    }
    const getPasswordValFn = (val: any) => {
      commonFn('password', val)
    }
    const getFileDataFn = (val: any) => {
      commonFn('SSH', val.name)
    }
    watch(
      () => props.formState,
      (valNew) => {
        formDataV['value'] = valNew
      },
    )
    return {
      optionCode,
      formDataV,
      getCodeValFn,
      getSSHValFn,
      getPasswordValFn,
      getFileDataFn,
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
