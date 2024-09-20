<template>
  <a-form-item label="名称">
    <a-form layout="inline" :model="formState" @finish="handleFinish" @finishFailed="handleFinishFailed">
      <a-form-item>
        <a-input v-model:value="formState.user" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" disabled>Log in</a-button>
      </a-form-item>
    </a-form>
  </a-form-item>
  <a-form-item label="主机">
    <a-input v-model:value="formState.name" />
  </a-form-item>
  <a-form-item label="端口">
    <a-input v-model:value="formState.name" />
  </a-form-item>
  <a-form-item label="用户名">
    <a-input v-model:value="formState.name" />
  </a-form-item>
  <a-form-item label="密码">
    <a-input v-model:value="formState.name" />
  </a-form-item>
  <a-form-item label="最大活跃连接数">
    <a-input-number v-model:value="formState.storage" :min="1" :max="1000000000000000" />
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, reactive, toRaw, toRefs, watch, nextTick } from 'vue'
import type { UnwrapRef } from 'vue'
interface FormState {
  name: string
  delivery: boolean
  type: string[]
  resource: string
  desc: string
  storage: number
  user: string
}
export default defineComponent({
  components: {},
  props: {
    setUpTypeName: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const state = reactive({
      value_TLS: [],
      ableNum: '4',
      setUpType_show_v: '',
    })
    watch(
      () => props.setUpTypeName,
      (newVal) => {
        nextTick(() => {
          state.setUpType_show_v = newVal
        })
      },
      {
        immediate: true,
        deep: true,
      },
    )

    const formState: UnwrapRef<FormState> = reactive({
      name: '',
      user: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
      useTLS: true,
      ignoreTLS: '',
      GID: 0,
      UID: 0,
      TLS: [
        { label: '使用 TLS/SSL 安全连接访问', value: 'use' },
        { label: '忽略 TLS/SSL 认证证书', value: 'ignore', disabled: false },
      ],
      storage: 1,
    })
    const onSubmit = () => {
      console.log('submit!', toRaw(formState))
    }
    const handleFinish = () => {}
    const handleFinishFailed = () => {}
    return {
      labelCol: { style: { width: '150px' } },
      wrapperCol: { span: 14 },
      formState,
      onSubmit,
      ...toRefs(state),
      handleFinish,
      handleFinishFailed,
    }
  },
})
</script>
<style scoped lang="scss">
.tips-el {
  padding-top: 8px;
  font-size: 12px;
  color: #d9d9d9;
}
</style>
