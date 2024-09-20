<template>
  <InputItem
    labelStr="文件数范围"
    :valueNumRange1="formDataV.fileNum1"
    :valueNumRange2="formDataV.fileNum2"
    type="number2"
    @getRageValFn="getFileNumValFn"
  />
  <InputItem
    labelStr="文件大小范围"
    value=""
    type="number3"
    :valueNumRange1="formDataV.fileSize1"
    :valueNumRange2="formDataV.fileSize2"
    :valueUnit1="formDataV.fileSizeUnit1"
    :valueUnit2="formDataV.fileSizeUnit2"
    :option="unitData"
    @getUnitValFn="getUnitValFn"
    @getRageValFn="getFileSizeValFn"
  />
  <InputItem
    labelStr="文件名称长度范围"
    type="number2"
    :valueNumRange1="formDataV.fileName1"
    :valueNumRange2="formDataV.fileName2"
    @getRageValFn="getFileNameValFn"
  />
  <InputItem
    labelStr="文件夹数量范围"
    type="number2"
    :valueNumRange1="formDataV.folderNum1"
    :valueNumRange2="formDataV.folderNum2"
    @getRageValFn="getFolderNumValFn"
  />
  <InputItem labelStr="文件夹层级" value="" type="number" />
  <InputItem labelStr="" value="" type="btn" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

type FormData = {
  fileNum1: number
  fileNum2: number
  fileSize1: number
  fileSize2: number
  fileSizeUnit1: string
  fileSizeUnit2: string
  fileName1: number
  fileName2: number
  folderNum1: number
  folderNum2: number
  folderLayer1: number
  folderLayer2: number
}
type UnitData = {
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
  },
  setup(props, { emit }) {
    const unitData = ref<UnitData>([
      {
        value: 'Bytes',
        name: 'Bytes',
      },
      {
        value: 'KB',
        name: 'KB',
      },
      {
        value: 'MB',
        name: 'MB',
      },
      {
        value: 'GB',
        name: 'GB',
      },
      {
        value: 'TB',
        name: 'TB',
      },
      {
        value: 'PB',
        name: 'PB',
      },
    ])
    const formDataV = ref<FormData>({
      fileNum1: 0,
      fileNum2: 0,
      fileSize1: 0,
      fileSize2: 0,
      fileSizeUnit1: 'KB',
      fileSizeUnit2: 'KB',
      fileName1: 0,
      fileName2: 0,
      folderNum1: 0,
      folderNum2: 0,
      folderLayer1: 0,
      folderLayer2: 0,
    })
    const commonFn = (name, val) => {
      formDataV['value'][name] = val
      emit('getFormState', formDataV['value'])
    }
    const getFileNumValFn = (val: number, type: string) => {
      if (type == '1') {
        commonFn('fileNum1', val)
      } else {
        commonFn('fileNum2', val)
      }
    }
    const getFileNameValFn = (val: number, type: string) => {
      if (type == '1') {
        commonFn('fileName1', val)
      } else {
        commonFn('fileName2', val)
      }
    }
    const getFolderNumValFn = (val: number, type: string) => {
      if (type == '1') {
        commonFn('folderNum1', val)
      } else {
        commonFn('folderNum2', val)
      }
    }
    const getUnitValFn = (val: string, type: string) => {
      if (type == '1') {
        commonFn('fileSizeUnit1', val)
      } else {
        commonFn('fileSizeUnit2', val)
      }
    }
    const getFileSizeValFn = (val: number, type: string) => {
      if (type == '1') {
        commonFn('fileSize1', val)
      } else {
        commonFn('fileSize2', val)
      }
    }
    return {
      getFileNumValFn,
      formDataV,
      getFileNameValFn,
      getFolderNumValFn,
      getUnitValFn,
      getFileSizeValFn,
      unitData,
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
