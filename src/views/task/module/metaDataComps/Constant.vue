<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const form = ref({})
const formRef = ref(null)
const rules = {
  constantValue: [proxy.validate()],
}

watch(
  () => props.data,
  (val) => {
    // form.value = val
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
  <el-form ref="formRef" :model="form" :rules="rules" @submit.native.prevent>
    <el-form-item label="常量文本" prop="constantValue">
      <o-input v-model="form.constantValue" v-focus />
    </el-form-item>
  </el-form>
</template>
