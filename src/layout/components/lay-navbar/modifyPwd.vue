<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { md5EncryptToBytes } from '@/utils/gFunc.ts'
const { proxy } = getCurrentInstance()

const model = ref({
  newPasword: '',
  oldPasword: '',
})
const isShow = ref(false)
const gFormRef = ref(null)
const rules = {
  oldPasword: [proxy.validate()],
  newPasword: [proxy.validate()],
}
const userInfo = ref({})
userInfo.value = proxy.getStorage('userInfo') ?? {}
const fieldList = [
  {
    label: '旧密码',
    prop: 'oldPasword',
  },
  {
    label: '新密码',
    prop: 'newPasword',
  },
]
const open = () => {
  isShow.value = true
}

const confirm = async () => {
  await gFormRef.value.validate()
  if (model.value.oldPasword === model.value.newPasword) {
    return proxy.$toast('新旧密码不能一致', 'e')
  }
  const pwdData = {
    userId: userInfo.value.id,
    username: userInfo.value.username,
    oldPasword: md5EncryptToBytes(model.value.oldPasword),
    newPasword: md5EncryptToBytes(model.value.newPasword),
  }
  let res = await proxy.request({
    url: '/security/changepwd',
    method: 'post',
    data: pwdData,
    custom: true,
  })
  if (res.data == '') {
    isShow.value = false
    proxy.$toast('修改密码成功')
  }
}
defineExpose({
  open,
})
</script>

<template>
  <o-dialog ref="dialogRef" v-model="isShow" title="修改密码" @confirm="confirm">
    <o-form ref="gFormRef" :model="model" :fieldList="fieldList" :rules="rules" />
  </o-dialog>
</template>
