<template>
  <div class="">
    <div class="">
      <el-form ref="formRef" :model="form" :rules="rules">
        <div class="label">用户</div>
        <el-form-item label="" prop="username">
          <o-input v-model="form.username" v-focus />
        </el-form-item>
        <div class="label">密码</div>
        <el-form-item label="" prop="password">
          <o-input v-model="form.password" type="password" />
        </el-form-item>
      </el-form>
    </div>
    <div class="tc login-btn-box">
      <el-button block type="primary" class="tc ma w-100% h-44" @click="submitFn">登录</el-button>
      <div v-if="proxy.$dev" class="mt2">
        <el-button block type="primary" class="tc ma w-100% h-44" @click="nativeLogin">本地登录</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { initRouter, getTopMenu } from '@/router/utils'
import { ref, onMounted, getCurrentInstance } from 'vue'
import { md5EncryptToBytes } from '@/utils/gFunc.ts'

import { useRouter } from 'vue-router'

import { loginAPI } from '@/server/API/login.ts'
console.log(`83 loginAPI`, loginAPI)
import { Base64 } from 'js-base64'
import JSEncrypt from 'jsencrypt'

const { proxy } = getCurrentInstance()
const formRef = ref()
const form = ref({})
const rules = ref({
  username: [proxy.validate('请输入用户名')],
  password: [proxy.validate('请输入密码')],
})
const router = useRouter()

const devTest = () => {
  if (proxy.$dev) {
    form.value.username = 'admin'
    form.value.password = 'admin'
  }
}
devTest()

/**
 *
 * {
    "id": "YWRtaW4=",
    "username": "YWRtaW4=",
    "roles": [
        "ROLE_ADMIN_SYSTEM"
    ],
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJZV1J0YVc0PSIsImlhdCI6MTcxODA5NTYxMiwiZXhwIjoxNzE4MTM4ODEyfQ.5gR5Jv0kzIqZBjmsWqdQ7QLNMfT3tud1pVcz16p9Srr5AWeshTUb6nBw2iNGqQMBZMNc2AzxTQAcO6D0Zd11IA"
}
 *  */
const passwordKeyFn = () => {
  const encryptor = new JSEncrypt()
  const copyForm = proxy.clone(form.value)
  copyForm.username = Base64.encode(copyForm.username)
  copyForm.password = md5EncryptToBytes(form.value.password, true)

  loginAPI(copyForm)
    .then((loginRes) => {
      initRouter().then(() => {
        proxy.$toast('登录成功！')
        proxy.setStorage('userInfo', loginRes.data)
        proxy.setStorage('ufm_token', `OCTSYSJA ${loginRes.data.accessToken}`)
        // router.push('/task/public')
        router.push('/task/public')
      })
    })
    .catch((err) => {
      if (err.response.data.message) {
        proxy.$toast(err.response.data.message, 'e')
      }
    })
}
const nativeLogin = () => {
  router.push('/t1')
}

const submitFn = async () => {
  await proxy.validForm(formRef, {
    message: !form.value.username ? '请输入用户名' : !form.value.password ? '请输入密码' : '',
    detail: false,
  })
  passwordKeyFn()
}
document.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    // 回车键按下后的操作
    submitFn()
  }
})
</script>
<style scoped lang="scss">
:deep(.el-form-item__label) {
  color: #fff;
}

:deep(.el-form-item) {
  margin-bottom: 18px;
  font-size: 14px;
}

.label {
  color: #fff;
}

.login-btn-box {
  margin-top: 50px !important;
}
</style>
