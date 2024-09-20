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
    port: '',
    defaultDir: '/',
    username: '',
    password: '',
    transmissionMode: 'NO_ENCRYPTION',
    description: '',
  },
})
const form = ref({})

if (proxy.$dev) {
  originForm.value = {
    systemId: '',
    name: proxy.uuid('andy-ftp-'),
    id: '',
    version: '',
    desc: '',
    conf: {
      endpoint: '10.0.11.104',
      port: 21,
      defaultDir: '/',
      username: 'user-dev',
      password: btoa('password'),
      transmissionMode: 'NO_ENCRYPTION', // password
      description: '',
    },
  }
}

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

const rules = {
  name: [proxy.validate()],
  conf: {
    endpoint: [proxy.validate('ip')],
    port: [proxy.validate('port')],
    defaultDir: [proxy.validate()],
    username: [proxy.validate()],
    password: [proxy.validate()],
  },
}
const radioOptions = [
  { label: '无密', value: 'NO_ENCRYPTION' },
  { label: '隐式TLS/SSL', value: 'TLS_IMPLICIT' },
  { label: '显示TLS/SSL', value: 'TLS_EXPLICIT' },
]

const getData = async () => {
  await proxy.validForm(formRef)
  const copyForm = proxy.clone(form.value)
  if (isSecret.value) {
    copyForm.conf.password = ''
    copyForm.conf.username = ''
  }
  return copyForm
}
const isSecret = ref(false)
// watch(
//   isSecret,
//   (val) => {
//     if (val) {
//       form.value.conf.password = ''
//       form.value.conf.username = ''
//       formRef.value.clearValidate(['conf.username', 'conf.password'])
//     }
//   },
//   {
//     deep: true,
//     immediate: true,
//   },
// )

defineExpose({
  getData,
})
</script>

<script lang="ts">
/** @使用方式
// {
//     "systemId": "HSP03858729",
//     "name": "ftp-zhou",
//     "id": "",
//     "version": "",
//     "desc": "",
//     "conf": {
//         "endpoint": "10.0.11.104",
//         "port": 21,
//         "defaultDir": "/",
//         "username": "user-dev",
//         "password": "cGFzc3dvcmQ=",
//         "transmissionMode": null,
//         "description": ""
//     }
// }
*/
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
      <el-form-item label="端口" prop="conf.port">
        <o-input v-model="form.conf.port" />
      </el-form-item>
      <el-form-item label="默认目录" prop="conf.defaultDir">
        <o-input v-model="form.conf.defaultDir" disabled />
      </el-form-item>
      <el-form-item label="用户名" :prop="isSecret ? '' : 'conf.username'">
        <div class="f">
          <o-input v-model="form.conf.username" :disabled="isSecret" class="" />
          <el-checkbox v-model="isSecret" class="m-l-10">匿名</el-checkbox>
        </div>
      </el-form-item>
      <el-form-item label="密码" :prop="isSecret ? '' : 'conf.password'">
        <g-encryption-input v-model="form.conf.password" type="password" :disabled="isSecret" />
      </el-form-item>
      <el-form-item label="加密传输" prop="conf.transmissionMode">
        <o-radio v-model="form.conf.transmissionMode" :options="radioOptions" />
        <!-- =={{ form.conf.transmissionMode }}?? -->
        <!-- <o-input v-model="form.conf.transmissionMode" disabled /> -->
      </el-form-item>
      <el-form-item label="备注" prop="conf.description">
        <o-input v-model="form.conf.description" type="textarea" />
      </el-form-item>
    </el-form>
  </div>
</template>
