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

const signData = ref([
  {
    value: 'Default',
    label: 'Default',
  },
  {
    value: 'SignatureVersion4',
    label: 'Signature Version 4',
  },
  {
    value: 'SignatureVersion2',
    label: 'Signature Version 2',
  },
])

const originForm = ref({
  systemId: '',
  id: '',
  name: '',
  version: '',
  desc: '',
  conf: {
    endPoint: '',
    apiVersion: null,
    pathStyleAccess: false,
    checkBucketExistence: false,
    useSsl: false,
    ignoreSslCertification: false,
    user: '',
    password: '',
    host: '',
    port: '',
    home: '',
    proxyType: '',
    proxyStatus: '',
    proxyHost: '',
    proxyPort: '',
    proxyUserName: '',
    proxyPassword: '',
    signerType: 'Default',
  },
})
if (proxy.$dev) {
  originForm.value = {
    systemId: '',
    id: '',
    name: proxy.uuid('andy-s3cs-'),
    version: '',

    desc: '',
    conf: {
      endPoint: '10.0.11.33:9003', // 10.0.11.101:9004
      apiVersion: null,
      pathStyleAccess: false,
      checkBucketExistence: false,
      useSsl: false,
      ignoreSslCertification: false,
      user: 'admin',
      password: btoa('adminadmin'), // adminadmin
      host: '',
      port: '',
      home: '',
      proxyType: '',
      proxyStatus: '',
      proxyHost: '',
      proxyPort: '',
      proxyUserName: '',
      proxyPassword: '',
      signerType: 'Default',
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
  userName: [proxy.validate()],
  encryptionTransmission: [proxy.validate()],
  // "conf.signerType": [proxy.validate('请选择')],
  conf: {
    signerType: [proxy.validate('请选择')],
    password: [proxy.validate()],
    endPoint: [proxy.validate()],
    user: [proxy.validate()],
  },
})
const radioOptions = [
  { label: '无密', value: '1' },
  { label: '隐式TLS/SSL', value: '2' },
  { label: '显示TLS/SSL', value: '3' },
]

const getData = async () => {
  await proxy.validForm(formRef)
  form.value.conf.host = form.value.conf.endPoint.split(':')[0]
  form.value.conf.port = Number(form.value.conf.endPoint.split(':')[1])
  if (!form.value.conf.proxyStatus || !form.value.conf.proxyPort) {
    form.value.conf.proxyStatus = 'DISABLED'
    form.value.conf.proxyPort = 8080
    form.value.conf.proxyType = null
  }
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
      <el-form-item label="服务器地址" prop="conf.endPoint">
        <o-input v-model="form.conf.endPoint" />
      </el-form-item>
      <el-form-item label="签名" prop="conf.signerType">
        <o-select v-model="form.conf.signerType" :options="signData" />
      </el-form-item>
      <el-form-item label="访问键" prop="conf.user">
        <o-input v-model="form.conf.user" />
      </el-form-item>
      <el-form-item label="秘钥键" prop="conf.password">
        <g-encryption-input v-model="form.conf.password" type="password" />
      </el-form-item>
      <el-form-item label="默认桶" prop="buckect">
        <o-input v-model="form.buckect" />
      </el-form-item>
      <el-form-item label="TLS/SSL" prop="conf.ignoreSslCertification">
        <el-checkbox v-model="form.conf.ignoreSslCertification">使用 TLS/SSL 安全连接访问</el-checkbox>
        <el-checkbox v-model="form.conf.useSsl" :disabled="!form.conf.ignoreSslCertification">
          忽略 TLS/SSL 认证证书
        </el-checkbox>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <o-input v-model="form.desc" type="textarea" />
      </el-form-item>
    </el-form>
  </div>
</template>
