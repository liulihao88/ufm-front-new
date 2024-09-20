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
    labelStr="存储容量"
    :valueString="formStateV.storage"
    :isDisabled="false"
    :option="optionV"
    keyName="storage"
    type="number4"
    @changeSelectFn="getStorageValFn"
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
type FormState = {
  name: string
  storage: number
  unit: string
  remark: string
}
type Option = {
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
    formState: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const formStateV = ref<FormState>({
      name: '',
      storage: 0,
      unit: '',
      remark: '',
    })
    const optionV = ref<Option>([
      {
        value: 'GB',
        name: 'GB',
      },
      {
        value: 'KB',
        name: 'KB',
      },
    ])

    const commonFn = (name, val) => {
      formStateV['value'][name] = val
      emit('getFormState', formStateV['value'])
    }
    const getInputValFn = (val: any) => {
      commonFn('name', val)
    }
    const getStorageValFn = (val: any) => {
      commonFn('host', val)
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
            storage: 0,
            unit: '',
            remark: '',
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
      changeTextareaFn,
      getStorageValFn,
      optionV,
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
