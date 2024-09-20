<template>
  <router-view id="app2" />
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

interface FormState {
  username: string
  password: string
  remember: boolean
}
export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      username: '',
      password: '',
      remember: true,
    })
    const onFinish = (values: any) => {
      console.log('Success:', values)
    }
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }
    return {
      formState,
      onFinish,
      onFinishFailed,
    }
  },
})
</script>
