<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  isNew: {
    type: Boolean,
    required: true,
  },
  formState: {
    type: Object,
    default: () => {},
  },
})

const formRef = ref(null)
const emits = defineEmits(['isTestPassFn'])

const originForm = ref({
  systemId: '',
  name: '',
  id: '',
  version: '',
  desc: '',
  conf: {
    endpoint: '',
    shareName: '',
    username: '',
    password: '',
    description: '',
  },
})
if (proxy.$dev) {
  originForm.value = {
    systemId: 'HSP019811212',
    name: proxy.uuid('andy-cifs-'),
    id: '',
    version: '',
    desc: '',
    conf: {
      endpoint: '10.0.11.236',
      shareName: 'sharefile',
      username: 'fuzhizhou',
      // password: btoa('Ak1010fbi!'), // 'Ak1010fbi!',
      password: 'Ak1010fbi!',
      description: '',
    },
  }
}

const form = ref({})

watch(
  () => props.formState,
  (newVal) => {
    if (!props.isNew) {
      form.value = newVal
    } else {
      form.value = proxy.clone(originForm.value)
    }
  },
  {
    immediate: true,
    deep: true,
  },
)

watch(
  form,
  (val) => {
    emits('isTestPassFn')
  },
  {
    deep: true,
    immediate: true,
  },
)

const rules = ref({
  name: [proxy.validate()],
  conf: {
    endpoint: [proxy.validate('ip')],
    shareName: [proxy.validate()],
    username: [proxy.validate()],
    password: [proxy.validate()],
  },
})

const getData = async () => {
  await proxy.validForm(formRef)
  return form.value
}

defineExpose({
  getData,
})
</script>

<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="名称" prop="name">
        <o-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="主机" prop="conf.endpoint">
        <o-input v-model="form.conf.endpoint" />
      </el-form-item>
      <el-form-item label="共享名称" prop="conf.shareName">
        <o-input v-model="form.conf.shareName" />
      </el-form-item>
      <el-form-item label="用户名" prop="conf.username">
        <o-input v-model="form.conf.username" />
      </el-form-item>
      <el-form-item label="密码" prop="conf.password">
        <g-encryption-input v-model="form.conf.password" type="password" />
      </el-form-item>
      <el-form-item label="备注" prop="conf.description">
        <o-input v-model="form.conf.description" type="textarea" />
      </el-form-item>
    </el-form>
  </div>
</template>
