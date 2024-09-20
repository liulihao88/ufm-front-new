<script setup lang="ts">
import { ref, getCurrentInstance, watch, nextTick } from 'vue'
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
  id: '',
  name: '',
  host: '',
  port: '',
  user: '',
  password: '',
  maxActiveConn: 50,
})
if (proxy.$dev) {
  originForm.value = {
    id: '',
    name: proxy.uuid('andy-data-'),
    host: '10.0.11.99',
    port: 8306,
    user: 'root',
    password: btoa('Ak1010fbi!'),
    maxActiveConn: 0,
  }
}

const form = ref({})

watch(
  () => props.formState,
  async (newVal) => {
    console.log(`61 props.isNew`, props.isNew)
    if (!props.isNew) {
      form.value = newVal
    } else {
      form.value = proxy.clone(originForm.value)
      setTimeout(() => {
        formRef.value.clearValidate()
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

const rules = ref({
  name: [proxy.validate()],
  host: [proxy.validate('ip')],
  port: [proxy.validate('port')],
  user: [proxy.validate()],
  password: [proxy.validate()],
  maxActiveConn: [proxy.validate()],
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
      <el-form-item label="数据源名称" prop="name">
        <div class="f w-100%">
          <o-input v-model="form.name" class="m-r-8 f-1" />
          <div class="w-100 bg-gray f-ar">
            {{ form.id }}
          </div>
        </div>
      </el-form-item>
      <el-form-item label="主机" prop="host">
        <o-input v-model="form.host" />
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <o-input v-model="form.port" v-number type="number" />
      </el-form-item>
      <el-form-item label="用户" prop="user">
        <o-input v-model="form.user" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <g-encryption-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="最大活跃连接数" prop="maxActiveConn">
        <o-input v-model="form.maxActiveConn" v-number type="number" />
      </el-form-item>
    </el-form>
  </div>
</template>
