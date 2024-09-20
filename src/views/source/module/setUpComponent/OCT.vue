<script setup lang="ts">
/** @使用方式
{
    "systemId": "HSP90838309",
    "name": "oeos-zhou",
    "id": "",
    "version": "",
    "desc": "",
    "conf": {
        "endpoint": "10.0.11.101",
        "tenant": "zhou",
        "tenantID": "T07",
        "username": "admin",
        "password": "YWRtaW5hZG1pbg==",
        "isUserSSL": false,
        "ignoreSslCertification": false,
        "description": "",
        }
}
*/
import { ref, getCurrentInstance, watch, nextTick } from 'vue'
const { proxy } = getCurrentInstance()
const PORT = 3500
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

const options = ref([])

const originForm = ref({
  systemId: '',
  name: '',
  id: '',
  version: '',
  desc: '',
  conf: {
    endpoint: '',
    tenant: '',
    tenantID: '',
    username: '',
    password: '',
    isUserSSL: false,
    ignoreSslCertification: false,
    description: '',
    port: PORT,
  },
})

if (proxy.$dev) {
  originForm.value = {
    systemId: '',
    id: '',
    name: proxy.uuid('andy-oct-'),
    version: '',
    desc: '',
    conf: {
      endpoint: '10.0.11.33', // 10.0.11.101:9004
      tenantID: '',
      username: 'admin',
      password: btoa('adminadmin'),
      isUserSSL: false,
      ignoreSslCertification: false,
      description: proxy.uuid('description'),
      port: PORT,
    },
  }
  nextTick(() => {
    getTenantList()
  })
}
const form = ref({})

watch(
  () => props.formState,
  (newVal) => {
    if (!props.isNew) {
      form.value = newVal
      form.value.conf.port = PORT
      const copyTid = form.value.conf.tenantID
      getTenantList(copyTid)
    } else {
      form.value = proxy.clone(originForm.value)
    }
  },
  {
    immediate: true,
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
    port: [proxy.validate('port')],
    tenantID: [proxy.validate('请选择')],
    username: [proxy.validate()],
    password: [proxy.validate()],
  },
})

const getData = async () => {
  await proxy.validForm(formRef)
  let copyForm = proxy.clone(form.value)
  let otherObj = {
    pathStyleAccess: false,
    checkBucketExistence: false,
    proxyType: 'DIRECT',
    proxyStatus: 'DISABLED',
    proxyHost: '',
    proxyPort: 8080,
    proxyUserName: null,
    proxyPassword: '',
  }

  let res = Object.assign(copyForm.conf, otherObj)
  return copyForm
}

const changeSelect = (value, label) => {
  form.value.conf.tenantID = value
  form.value.conf.tenant = label
}

async function getTenantList(tId = '') {
  form.value.conf.tenantID = ''
  if (proxy.isEmpty(form.value.conf.endpoint)) {
    return proxy.$toast('服务器不能为空', 'e')
  }
  if (proxy.isEmpty(form.value.conf.port)) {
    return proxy.$toast('端口不能为空', 'e')
  }
  if (!proxy.validate('ip', form.value.conf.endpoint, true)) {
    options.value = []
    proxy.$toast('服务器有误', 'e')
    return
  }
  if (!proxy.validate('port', form.value.conf.port, true)) {
    proxy.$toast('端口有误', 'e')
    return (options.value = [])
  }
  form.value.conf.tenantID = tId
  console.log(`87 tId`, tId)
  let mergeURL = `http://${form.value.conf.endpoint}:${form.value.conf.port}/v1/admin/sys/tenant/tenants`
  const res = await proxy.request({
    baseURL: '',
    url: mergeURL,
    noToken: true,
    params: {
      filter: 'Actived',
    },
  })
  options.value = res.map((v) => {
    return {
      tenantId: v.value,
      ...v,
    }
  })
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
      <el-form-item label="服务器" prop="conf.endpoint">
        <o-input v-model="form.conf.endpoint" @blur="getTenantList()" />
      </el-form-item>
      <el-form-item label="端口" prop="conf.port">
        <o-input v-model="form.conf.port" @blur="getTenantList()" />
      </el-form-item>
      <el-form-item label="租户" prop="conf.tenantID">
        <o-select v-model="form.conf.tenantID" :options="options" label="name" @changeSelect="changeSelect" />
      </el-form-item>
      <el-form-item label="用户名" prop="conf.username">
        <o-input v-model="form.conf.username" />
      </el-form-item>
      <el-form-item label="密码" prop="conf.password">
        <g-encryption-input v-model="form.conf.password" type="password" />
      </el-form-item>
      <el-form-item label="TLS/SSL" prop="conf.isUserSSL">
        <el-checkbox v-model="form.conf.isUserSSL">使用 TLS/SSL 安全连接访问</el-checkbox>
        <el-checkbox v-model="form.conf.ignoreSslCertification" :disabled="!form.conf.isUserSSL">
          忽略 TLS/SSL 认证证书
        </el-checkbox>
      </el-form-item>
      <el-form-item label="备注" prop="conf.description">
        <o-input v-model="form.conf.description" type="textarea" />
      </el-form-item>
    </el-form>
  </div>
</template>
