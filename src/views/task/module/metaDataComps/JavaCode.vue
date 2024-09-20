<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()

const props = defineProps({
  data: {
    required: true,
  },
})
const gScriptRef = ref(null)
const form = ref({
  code: `// value=source.getPath();
// value=source.getName();
// int i = value.lastIndexOf('.');
// if (i > 0) {
//    value = value.substring(i, value.length() - 5);
// } else {
//    value = "The Index is "+String.valueOf(i);
// }`,
})
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
  <g-script ref="gScriptRef" :value="form.code" />
</template>
