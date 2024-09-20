<template>
  <InputItem
    labelStr="数据源名称"
    :value="formState.name"
    type="nameInput"
    :maxlength="50"
    :valueKey="formState.id"
    @changeInputFn="getNameFn"
  />
  <div v-if="setUpType_show_v == 'DMC'">
    <InputItem labelStr="主机" :value="formState.host" type="input" testType="host" @changeInputFn="getHostFn" />
    <InputItem labelStr="端口" :value="formState.port" type="number9" :maxlength="6" @changeInputFn="getPortFn" />
    <InputItem labelStr="用户" :value="formState.user" type="input" :maxlength="30" @changeInputFn="getUserFn" />
    <g-encryption-input v-model="formState.password" title="密码" type="password" :maxlength="20" />
    <InputItem
      labelStr="最大活跃连接数"
      :valueNum="formState.maxActiveConn"
      type="number"
      @changeNumberFn="getLinkNumValFn"
    />
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  setUpTypeName: {
    type: String,
    default: null,
  },
  queryData: {
    type: Object,
    default: null,
  },
})
const emits = defineEmits(['getFormState'])

const formState = ref({
  name: '',
  host: '',
  port: '',
  user: '',
  password: '',
  maxActiveConn: 0,
})
formState.value = {}
const setUpType_show_v = ref(props.setUpTypeName)
const commonFn = (name, val) => {
  formState.value[name] = val
  emits('getFormState', formState.value)
}
const getNameFn = (val) => {
  commonFn('name', val)
}
const getHostFn = (val) => {
  commonFn('host', val)
}
const getPortFn = (val) => {
  console.log(val, '???val')
  commonFn('port', val)
}
const getUserFn = (val) => {
  commonFn('user', val)
}
const getLinkNumValFn = (val) => {
  commonFn('maxActiveConn', val)
}
watch(
  () => props.queryData,
  (newVal) => {
    formState.value = newVal
  },
)
</script>
<style scoped lang="scss">
.tips-el {
  padding-top: 8px;
  font-size: 12px;
  color: #d9d9d9;
}
</style>
