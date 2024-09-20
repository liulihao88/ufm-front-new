<template>
  <div>
    <InputItem
      id="styleTypeEl"
      labelStr="类型"
      :value="formStateV.proxyType"
      type="select"
      :option="typeData"
      @changeSelectFn="changeTypeFn"
    />
    <!-- <a-select
    v-model:value="formStateV.proxyType"
    size="middle"
    style="width: 200px"
    :options="typeData"
    class="select-type-1"
    ></a-select> -->
    <InputItem
      labelStr="状态"
      :value="formStateV.proxyStatus"
      :option="statusData"
      type="select"
      @changeSelectFn="changeStatusFn"
    />
    <InputItem
      labelStr="主机"
      :value="formStateV.proxyHost"
      type="input"
      :isDisabled="isConfig"
      @changeInputFn="getHostValFn"
    />
    <InputItem
      labelStr="端口"
      :value="formStateV.proxyPort"
      type="number9"
      :isDisabled="isConfig"
      @changeInputFn="getPortValFn"
    />
    <InputItem
      labelStr=""
      :value="formStateV.useSsl"
      type="checked6"
      :isDisabled="isConfig"
      @changeClientConfig="getApproveValFn"
    />
    <InputItem
      labelStr="用户名"
      :value="formStateV.proxyUserName"
      type="input"
      :isDisabled="isApprove"
      @changeInputFn="getNameValFn"
    />
    <InputItem
      labelStr="密码"
      :value="formStateV.proxyPassword"
      type="input"
      :isDisabled="isApprove"
      @changeInputFn="getPaasswordValFn"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, inject } from 'vue'

import { message } from 'ant-design-vue'
interface FormState {
  proxyType: string
  proxyStatus: string
  proxyHost: string
  proxyPort: string
  useSsl: boolean
  proxyUserName: string
  proxyPassword: string
}
import { testIPFn } from '@/mixin/mixin'
export default defineComponent({
  components: {},
  props: {
    setUpTypeName: {
      type: String,
      default: null,
    },
    setUpData: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const statusData: any = ref()
    statusData['value'] = [
      {
        name: '使用以下代理配置',
        value: 'USE_PRIVATE_SETTING',
      },
      {
        name: '使用全局代理配置',
        value: 'USE_GLOBAL_SETTING',
      },
      {
        name: '不使用代理',
        value: 'DISABLED',
      },
    ]

    const typeData: any = ref()
    typeData['value'] = [
      {
        name: 'HTTP(S)',
        value: 'HTTP',
      },
      {
        name: 'DIRECT',
        value: 'DIRECT',
      },
      {
        name: 'SOCKS',
        value: 'SOCKS',
      },
    ]
    const isConfig = ref<boolean>(true)
    const isApprove = ref<boolean>(false)
    const formStateV = ref<FormState>({
      proxyType: '',
      proxyStatus: '',
      proxyHost: '',
      proxyPort: '',
      useSsl: false,
      proxyUserName: '',
      proxyPassword: '',
    })
    const formDataDeputy: any = inject('formDataDeputy')
    watch(
      () => props.setUpData,
      (newVal: any) => {
        let data: object = newVal.conf
        if (data) {
          Object.keys(formStateV['value']).forEach((name) => {
            Object.keys(data).forEach((el) => {
              if (el == name) {
                formStateV['value'][name] = data[el]
              }
            })
          })
        }
      },
      {
        immediate: true,
        deep: true,
      },
    )

    const commonFn = (name, val) => {
      formStateV['value'][name] = val
      formDataDeputy['value'] = formStateV['value']
      emit('isTestPassFn')
      console.log(formDataDeputy['value'], 'commonFncommonFncommonFn')
    }
    const changeTypeFn = (val: any) => {
      commonFn('proxyType', val.value)
    }

    const changeStatusFn = (val: any) => {
      if (val.value === 'USE_PRIVATE_SETTING') {
        isConfig['value'] = false
        isApprove['value'] = false
      } else {
        isConfig['value'] = true
        isApprove['value'] = true
      }
      commonFn('proxyStatus', val.value)
    }

    const getHostValFn = (val: any) => {
      console.log(val, '------val')
      if (testIPFn(val)) {
        formStateV['value'].proxyHost = val
      } else {
        message.warn('主机地址有误,请重新输入')
        setTimeout(() => {
          formStateV['value'].proxyHost = ''
        }, 10)
      }
      commonFn('proxyHost', val)
    }

    const getPortValFn = (val: any) => {
      commonFn('proxyPort', val)
    }
    const getApproveValFn = (val: any) => {
      commonFn('useSsl', val)
      isApprove['value'] = val
    }
    const getNameValFn = (val: any) => {
      commonFn('proxyUserName', val)
    }
    const getPaasswordValFn = (val: any) => {
      commonFn('proxyPassword', val)
    }
    return {
      formStateV,
      statusData,
      isConfig,
      formDataDeputy,
      typeData,
      changeTypeFn,
      changeStatusFn,
      isApprove,
      getApproveValFn,
      getHostValFn,
      getPortValFn,
      getNameValFn,
      getPaasswordValFn,
    }
  },
})
</script>
<style scoped lang="scss">
#styleTypeEl {
  position: relative;
  z-index: 600;
}
</style>
