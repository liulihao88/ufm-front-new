<template>
  <div class="deplayment-item-box">
    <a-form
      :model="formState"
      layout="inline"
      name="basic"
      autocomplete="off"
      class="deplayment-item-box"
      :rules="ipRules"
    >
      <a-page-header title="部署节点" />
      <a-form-item label="IP地址" name="IP" :wrapper-col="{ span: 24, offset: 0 }" class="ip-el">
        <a-input v-model:value="formState.IP" @change="IP_changeFn(formState.IP)" />
      </a-form-item>
      <div class="section-box">
        <a-form-item label="IP地址区间" :wrapper-col="{ span: 24, offset: 0 }" name="sectionStart">
          <a-input v-model:value="formState.sectionStart" />
        </a-form-item>
        <span>至</span>
        <a-form-item label="" :wrapper-col="{ span: 24, offset: 0 }" name="sectionEnd">
          <a-input v-model:value="formState.sectionEnd" />
        </a-form-item>
      </div>
      <a-page-header title="列外节点" sub-title="异常IP地址示例：192.168.1.100,192.168.1.1*，192.168.1.172" />
      <a-form-item label="列外的IP地址" name="ex_IP">
        <a-input v-model:value="formState.ex_IP" />
      </a-form-item>
      <a-page-header title="SSH认证" />
      <a-form-item label="管理账户名" name="SSH">
        <a-input v-model:value="formState.SSH" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input v-model:value="formState.password" />
      </a-form-item>
      <a-form-item label="私钥" name="privateKey">
        <a-input v-model:value="formState.privateKey" />
      </a-form-item>
      <a-form-item label="口令" name="command">
        <a-input v-model:value="formState.command" />
      </a-form-item>
      <a-page-header title="Remove Shell 认证" />
      <a-form-item label="端口" name="port">
        <a-input v-model:value="formState.port" />
      </a-form-item>
      <a-form-item label="授权码" name="code">
        <a-input v-model:value="formState.code" />
      </a-form-item>
      <a-page-header title="部署配置" />
      <a-form-item label="处理单元数" name="unitNum">
        <a-input-number v-model:value="formState.unitNum" :min="1" :max="1000000000000000" />
      </a-form-item>
      <a-form-item name="isKeepLog">
        <a-checkbox v-model:checked="formState.isKeepLog">卸载时保留日志</a-checkbox>
      </a-form-item>
      <a-page-header title="客户端配置" />
      <a-form-item label="管理端口" name="manage_port">
        <a-input v-model:value="formState.manage_port" />
      </a-form-item>
      <a-form-item name="isRegister">
        <a-checkbox v-model:checked="formState.isRegister" disabled>注册为系统服务</a-checkbox>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
interface FormState {
  IP: string
  sectionStart: string
  sectionEnd: string
  ex_IP: string
  SSH: string
  password: string
  privateKey: string
  command: string
  port: string
  code: string
  unitNum: string
  isKeepLog: boolean
  manage_port: string
  isRegister: boolean
}
export default defineComponent({
  components: {},
  setup() {
    const formState = ref<FormState>({
      IP: '',
      sectionStart: '',
      sectionEnd: '',
      ex_IP: '',
      SSH: '',
      password: '',
      privateKey: '',
      command: '',
      port: '',
      code: '',
      unitNum: '',
      isKeepLog: false,
      manage_port: '',
      isRegister: false,
    })
    const IP_changeFn = () => {}

    let ipTestRex1 = async (_rule: Rule, value: string) => {
      console.log(value, 'value', _rule)
      if (value === '') {
        //return Promise.reject('请输入IP地址');
      } else {
        let reg =
          /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/
        if (!reg.test(value)) {
          return Promise.reject('请输入正确的IP地址')
        }
      }
    }
    let portTestRex = async (_rule: Rule, value: string) => {
      console.log(value, 'portTestRex', _rule)
      if (value === '') {
        //return Promise.reject('请输入IP地址');
      } else {
        let reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
        if (!reg.test(value)) {
          return Promise.reject('请输入正确的端口号')
        }
      }
    }

    const ipRules: Record<string, Rule[]> = {
      IP: [{ validator: ipTestRex1, trigger: 'blur' }],
      sectionStart: [{ validator: ipTestRex1, trigger: 'blur' }],
      sectionEnd: [{ validator: ipTestRex1, trigger: 'blur' }],
      ex_IP: [{ validator: ipTestRex1, trigger: 'blur' }],
      port: [{ validator: portTestRex, trigger: 'blur' }],
      manage_port: [{ validator: portTestRex, trigger: 'blur' }],
    }
    return {
      formState,
      IP_changeFn,
      ipRules,
    }
  },
})
</script>
<style lang="scss">
.deplayment-item-box {
  padding: 10px 30px;

  .ant-page-header {
    display: block;
    width: 100%;
  }

  .ant-input-number-input-wrap {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }

  .ant-page-header-heading-title {
    font-size: 14px;
  }

  .ip-el {
    margin-right: 120px;
  }

  .section-box {
    display: flex;
    width: 50%;

    .ant-form-item {
      flex: 1;
    }

    span {
      flex: 1;
      line-height: 32px;
      text-align: center;
    }
  }
}
</style>
