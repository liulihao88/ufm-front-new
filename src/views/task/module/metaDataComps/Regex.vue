<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const options = [
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
const form = ref({
  stringSource: options[0].value,
  // regex: proxy.$dev && proxy.uuid(),
  group: 0,
})
const formRef = ref(null)
const rules = {
  regex: [proxy.validate()],
  // group: [proxy.validate()],
  stringSource: [proxy.validate()],
}
watch(
  () => props.data,
  (val) => {
    form.value = Object.assign({}, form.value, val)
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
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" @submit.native.prevent>
    <el-form-item label="字符串来源" prop="stringSource">
      <o-select v-model="form.stringSource" :options="options" />
    </el-form-item>
    <el-form-item label="正则表达式" prop="regex">
      <o-input v-model="form.regex" v-focus />
    </el-form-item>
    <el-form-item label="组" prop="group">
      <o-input v-model.number="form.group" v-number type="number" />
    </el-form-item>
  </el-form>
</template>
