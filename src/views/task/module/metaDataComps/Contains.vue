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
  stringSource: options[0],
  findString: '',
  trueValue: '',
  falseValue: '',
})
const formRef = ref(null)
const rules = {
  stringSource: [proxy.validate()],
  findString: [proxy.validate()],
}
watch(
  () => props.data,
  (val) => {
    form.value = Object.assign({}, form.value, val)
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
    <el-form-item label="包含文本" prop="findString">
      <o-input v-model="form.findString" v-focus />
    </el-form-item>
    <el-form-item label="如果包含" prop="trueValue">
      <o-input v-model="form.trueValue" />
    </el-form-item>
    <el-form-item label="如果不包含" prop="falseValue">
      <o-input v-model="form.falseValue" />
    </el-form-item>
  </el-form>
</template>
