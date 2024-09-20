<script setup lang="ts">
/** @使用方式
  <g-yes-dialog ref="yesDialogRef" @confirm="confirm"></g-yes-dialog>

  yesDialogRef.value.open(dialogTitle.value)
*/
import { ref, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance()
const form = ref({
  text: '',
})
const isShow = ref(false)
const rules = {
  text: [proxy.validate('custom', { reg: /yes/i, message: '请输入yes' })],
}
const formRef = ref(null)
const inputRef = ref(null)
const emits = defineEmits(['confirm'])
const title = ref()
const open = async (sendTitle) => {
  title.value = sendTitle
  isShow.value = true
  form.value = {}
  if (proxy.$dev) {
    form.value.text = 'yes'
  }
}
const dialogConfirm = async () => {
  await proxy.validForm(formRef, { details: false })
  isShow.value = false
  emits('confirm', title.value)
}

defineExpose({
  open,
})
</script>

<template>
  <div>
    <o-dialog ref="dialogRef" v-model="isShow" destroy-on-close @confirm="dialogConfirm">
      <template #header>
        <div>
          <span>确定</span>
          <span class="cl-blue bold">
            {{ title }}
          </span>
          <span>请输入YES</span>
        </div>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" @submit.native.prevent>
        <el-form-item label="" prop="text">
          <el-input ref="inputRef" v-model="form.text" v-focus placeholder="请输入yes" clearable />
        </el-form-item>
      </el-form>
    </o-dialog>
  </div>
</template>
