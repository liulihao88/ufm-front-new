<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
import DiskModule from '@/views/source/module/diskModule.vue'
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
const diskModuleRef = ref(null)
const emits = defineEmits(['isTestPassFn'])

const originForm = ref({
  systemId: '',
  id: '',
  name: '',
  version: null,
  desc: '',
  conf: {
    checkExisting: false,
    includeSystemDrivers: true,
    localFileSystemView: 'DEFAULT_FILE_SYSTEM_VIEW',
    customDrives: [],
    signerType: '',
    proxyStatus: '',
    proxyPort: '',
    proxyType: null,
  },
})
const form = ref({})

if (proxy.$dev) {
  originForm.value = {
    systemId: '',
    id: '',
    name: proxy.uuid('andy-lfs-'),
    version: null,
    desc: '',
    conf: {
      checkExisting: false,
      includeSystemDrivers: true,
      localFileSystemView: 'DEFAULT_FILE_SYSTEM_VIEW',
      customDrives: [],
      signerType: '',
      proxyStatus: '',
      proxyPort: '',
      proxyType: null,
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
      setTimeout(() => {
        formRef.value?.clearValidate?.()
      }, 0)
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
  { label: '无密', value: null },
  { label: '隐式TLS/SSL', value: '2' },
  { label: '显示TLS/SSL', value: '3' },
]

const getData = async () => {
  await proxy.validForm(formRef)
  let res = await diskModuleRef.value.changeDisk()
  const copyForm = proxy.clone(form.value)
  copyForm.conf.customDrives = res
  return copyForm
}

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
//         "desc": ""
//     }
// }
*/
</script>

<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120">
      <el-form-item label="名称" prop="name">
        <div class="f w-100%">
          <o-input v-model="form.name" class="m-r-8 f-1" />
          <div class="w-100 bg-gray f-ar">
            {{ form.id }}
          </div>
        </div>
      </el-form-item>
      <el-form-item label="查看" prop="conf.includeSystemDrivers">
        <el-checkbox v-model="form.conf.includeSystemDrivers">包含根目录</el-checkbox>

        <el-radio-group
          v-model="form.conf.localFileSystemView"
          :disabled="!form.conf.includeSystemDrivers"
          class="m-l-16"
        >
          <el-radio label="DEFAULT_FILE_SYSTEM_VIEW">系统视图</el-radio>
          <el-radio label="USER_FILE_SYSTEM_VIEW">用户视图(包含桌面文档)</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="" label-width="0">
        <DiskModule
          ref="diskModuleRef"
          v-model="form.conf.checkExisting"
          class="w-100%"
          :tableData="form.conf.customDrives"
        />
      </el-form-item>

      <el-form-item label="备注" prop="conf.desc">
        <o-input v-model="form.conf.desc" type="textarea" />
      </el-form-item>
    </el-form>
  </div>
</template>
