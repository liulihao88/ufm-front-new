<template>
  <InputItem
    labelStr="名称"
    :value="formStateV.name"
    keyName="name"
    type="nameInput"
    :valueKey="formStateV.id"
    @changeInputFn="getInputValFn"
  />
  <InputItem
    labelStr="查看"
    :valueView="formStateV.conf.localFileSystemView"
    type="radio7"
    :isAllG="formStateV.conf.includeSystemDrivers"
    @changeCheckFn="includeFn"
    @changeViewFn="changeViewFn"
  />
  <DiskModule
    :tableData="formStateV.conf.customDrives"
    :checkExisting="formStateV.conf.checkExisting"
    @changeFn="LFS_fn"
    @changeCheckFn="changeCheckExistFn"
  />
  <InputItem
    labelStr="备注"
    :value="formStateV.desc"
    keyName="remark"
    type="textarea"
    @changeTextareaFn="changeTextareaFn"
  />
</template>
<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from 'vue'
import { CommonArray } from '@/mixin/common.d'
import DiskModule from '../diskModule.vue'

export default defineComponent({
  components: {
    DiskModule,
  },
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
    const { proxy } = getCurrentInstance()
    const defaultData: object = {
      systemId: '',
      id: '',
      name: '',
      version: '',
      desc: '',
      conf: {
        checkExisting: false,
        includeSystemDrivers: false,
        localFileSystemView: '',
        customDrives: [],
      },
    }
    const formStateV = ref<object>(JSON.parse(JSON.stringify(defaultData)))
    const commonFn = () => {
      emit('getFormState', formStateV['value'])
    }
    const changeTextareaFn = (val: any) => {
      formStateV['value']['desc'] = val
      commonFn()
    }
    const getInputValFn = (val: any) => {
      formStateV['value']['name'] = val
      commonFn()
    }
    const changeViewFn = (val: string) => {
      formStateV['value']['conf']['localFileSystemView'] = val
      commonFn()
    }
    const includeFn = (val: boolean) => {
      formStateV['value']['conf']['includeSystemDrivers'] = val
      commonFn()
    }
    const LFS_fn = (val: any) => {
      let arr: CommonArray['items'][] = []
      val.forEach((item: object) => {
        let obj: object = {
          name: item.name,
          path: item.path,
        }
        arr.push(obj)
      })

      formStateV['value']['conf']['customDrives'] = arr

      commonFn()
    }
    const changeCheckExistFn = (val: any) => {
      formStateV['value']['conf']['checkExisting'] = val
      commonFn()
    }
    watch(
      () => props.formState,
      (newVal: any) => {
        if (!props.isNew) {
          formStateV['value'] = newVal
        } else {
          formStateV['value'] = JSON.parse(JSON.stringify(defaultData))
          formStateV['value']['systemId'] = newVal.systemId
          formStateV['value']['conf']['customDrives'] = null
        }
      },
      {
        immediate: true,
        deep: true,
      },
    )
    return {
      formStateV,
      changeViewFn,
      LFS_fn,
      commonFn,
      getInputValFn,
      changeTextareaFn,
      changeCheckExistFn,
      includeFn,
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
