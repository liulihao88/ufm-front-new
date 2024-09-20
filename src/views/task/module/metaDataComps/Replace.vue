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
  regex: false,
  replaceWith: '',
})
const formRef = ref(null)
const rules = {
  findString: [proxy.validate()],
  // replaceWith: [proxy.validate()],
  // stringSource: [proxy.validate()],
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
    <el-form-item label="查找" prop="findString">
      <o-input v-model="form.findString" v-focus />
    </el-form-item>
    <el-form-item label="正则表达式" prop="regex">
      <el-switch v-model="form.regex" />
    </el-form-item>
    <el-form-item label="替换为" prop="replaceWith">
      <o-input v-model="form.replaceWith" />
    </el-form-item>
  </el-form>
</template>
