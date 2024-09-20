<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { omit } from 'lodash-es'
const { proxy } = getCurrentInstance()
import Constant from './Constant.vue'
import Contains from './Contains.vue'
import Concat from './Concat.vue'
import Regex from './Regex.vue'
import Replace from './Replace.vue'
import FileProperty from './FileProperty.vue'
import TextFileContentOfRow from './TextFileContentOfRow.vue'
import Substring from './Substring.vue'
import JavaCode from './JavaCode.vue'

const dynamicComp = ref()
const emits = defineEmits(['success'])
const dialogRef = ref(null)
const isShow = ref(false)
const compRef = ref(null)
// 动态组件映射
const componentMap = {
  Constant,
  Concat,
  Contains,
  Substring,
  Regex,
  Replace,
  FileProperty,
  TextFileContentOfRow,
  JavaCode,
}
const data = ref({})
const currentIndex = ref(0)
const currentInjector = ref()

const map = {
  Constant: '常量',
  Contains: '包含',
  Concat: '连接',
  Replace: '替换',
  Substring: '子字符串',
  Regex: '正则表达式',
  FileProperty: '文件属性',
  TextFileContentOfRow: '文本文件内容',
  JavaCode: 'java代码',
}

const open = async (row, idx) => {
  currentIndex.value = idx
  // let res = await proxy.request({
  //   url: '/task/public/metaInject/injectors',
  //   params: {
  //     value: row.injector,
  //   },
  // })
  // data.value = res
  let noValueRow = omit(row, ['value', 'key'])
  data.value = {
    injector: row.injector,
    ...noValueRow,
  }

  currentInjector.value = row.injector
  dynamicComp.value = componentMap[row.injector]
  isShow.value = true
}
const dialogConfirm = async () => {
  let formValue = proxy.clone(compRef.value.form)

  if (currentInjector.value === 'Contains') {
    if (!formValue.trueValue && !formValue.falseValue) {
      return proxy.$toast('如果包含 和 如果不包含 至少填写一个', 'e')
    }
  }

  if (currentInjector.value === 'FileProperty') {
    if (formValue.dateFormat === 'Millsecond') {
      formValue.dateFormat = ''
    }
  }

  if (currentInjector.value === 'JavaCode') {
    formValue.code = compRef.value.$refs.gScriptRef.scriptValue
  }

  if (compRef.value.$refs.formRef) {
    await proxy.validForm(compRef.value.$refs.formRef)
  }
  let detailRes = await proxy.request({
    url: 'task/public/metaInject/toParameter',
    method: 'post',
    data: formValue,
  })
  isShow.value = false
  emits('success', detailRes, currentIndex.value)
}

defineExpose({
  open,
})
</script>

<template>
  <div>
    <o-dialog
      ref="dialogRef"
      v-model="isShow"
      :title="'编辑' + map[currentInjector]"
      destroy-on-close
      width="1000"
      @confirm="dialogConfirm"
    >
      <component :is="dynamicComp" ref="compRef" :data="data" />
    </o-dialog>
  </div>
</template>
