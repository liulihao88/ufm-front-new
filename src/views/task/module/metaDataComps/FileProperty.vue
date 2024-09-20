<script setup lang="ts">
import { ref, getCurrentInstance, watch, computed } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const regOptions = [
  {
    label: '文件名字',
    value: 'FileName',
  },
  {
    label: '文件路径',
    value: 'FilePath',
  },
  {
    label: '文件大小',
    value: 'FileSize',
  },
  {
    label: '文件拓展名',
    value: 'FileExtention',
  },
  {
    label: '最新更新时间',
    value: 'lastModifiedTime',
  },
  {
    label: '创建时间',
    value: 'CreateTime',
  },
]
const dateOptions = [
  {
    label: '毫秒',
    value: 'Millsecond',
  },
  {
    label: '年月日',
    value: 'yyyyMMdd',
  },
  {
    label: '年月日时',
    value: 'yyyyMMddHH',
  },
  {
    label: '年月日时分',
    value: 'yyyyMMddHHmm',
  },
  {
    label: '年月日时分秒',
    value: 'yyyyMMddHHmmss',
  },
]
const form = ref({
  pickProperty: regOptions[4].value,
  dateFormat: dateOptions[0].value,
})
const formRef = ref(null)
const dateDisabled = computed(() => {
  return form.value.pickProperty !== 'LastModifiedTime' && form.value.pickProperty !== 'CreateTime'
})
watch(
  () => props.data,
  (val) => {
    form.value = proxy.merge(form.value, val)
    // form.value = val
  },
  {
    immediate: true,
  },
)
defineExpose({
  form,
})
</script>

<template>
  <el-form ref="formRef" :model="form" label-width="auto" @submit.native.prevent>
    <el-form-item label="正则表达式" prop="pickProperty">
      <o-select v-model="form.pickProperty" :options="regOptions" :clearable="false" />
    </el-form-item>
    <el-form-item label="时间格式" prop="dateFormat">
      <o-select v-model="form.dateFormat" :options="dateOptions" :disabled="dateDisabled" />
    </el-form-item>
  </el-form>
</template>
