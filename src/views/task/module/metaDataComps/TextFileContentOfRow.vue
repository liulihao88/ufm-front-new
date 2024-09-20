<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const form = ref({
  beginRow: 1,
  rowCount: 1,
})
const formRef = ref(null)
const rules = {
  filepath: [proxy.validate()],
  // beginRow: [proxy.validate()],
  // rowCount: [proxy.validate()],
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
    <el-form-item label="文件路径" prop="filepath">
      <o-input v-model="form.filepath" v-focus />
    </el-form-item>
    <el-form-item label="开始行" prop="beginRow">
      <o-input v-model.number="form.beginRow" type="number" />
    </el-form-item>
    <el-form-item label="读取行数" prop="rowCount">
      <o-input v-model.number="form.rowCount" type="number" />
    </el-form-item>
  </el-form>
</template>
