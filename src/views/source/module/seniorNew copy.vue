<template>
  <div v-if="setUpType_show_v == 'AS3S'">
    <InputItem labelStr="客户端配置" value="!122" type="checked2" />
  </div>

  <div v-if="setUpType_show_v == 'S3-CS' || setUpType_show_v == 'S3-OSS'">
    <InputItem labelStr="请求路径模式" value="!122" type="radio3" />
    <InputItem labelStr="API版本" value="!122" type="radio4" />
    <InputItem labelStr="桶检查" value="!122" type="checked3" />
  </div>

  <div v-if="setUpType_show_v == 'OEOS1OS' || setUpType_show_v == 'HCP'">
    <InputItem labelStr="删除配置" value="!122" type="checked4" />
  </div>
  <div v-if="setUpType_show_v == 'FTP'">
    <InputItem labelStr="客户端配置" value="!122" type="checked5" />
    <InputItem labelStr="编码" value="!122" type="select" />
    <InputItem labelStr="本地数据传输方式" value="!122" type="select" />
    <InputItem labelStr="目录清单" value="!122" type="select" />
    <InputItem labelStr="传输文件类型" value="!122" type="select" />
    <InputItem labelStr="缓冲区数据流空间" value="!122" type="number" tipStr="KB" />
    <InputItem labelStr="默认连接池数量" value="!122" type="number" />
    <InputItem labelStr="登录后执行命令" value="!122" type="textarea" />
  </div>
  <div v-if="setUpType_show_v == 'SFTP'">
    <InputItem labelStr="文件编码" value="!122" type="select" />
    <InputItem labelStr="SSH私钥文件" value="!122" type="selectFile" />
    <InputItem labelStr="密码" value="!122" type="input" />
  </div>

  <div v-if="setUpType_show_v == 'TFTP'">
    <InputItem labelStr="文件编码" value="!122" type="select" />
    <InputItem labelStr="传输文件类型" value="!122" type="selectFile" />
    <InputItem labelStr="连接超时" value="!122" type="number" />
  </div>

  <div v-if="setUpType_show_v == 'VFS'">
    <InputItem labelStr="文件数范围" value="!122" type="number2" />
    <InputItem labelStr="文件大小范围" value="!122" type="number3" />
    <InputItem labelStr="文件名称长度范围" value="!122" type="number2" />
    <InputItem labelStr="文件夹数量范围" value="!122" type="number2" />
    <InputItem labelStr="文件夹层级" value="!122" type="number" />
    <InputItem labelStr="" value="!122" type="btn" />
  </div>

  <div v-if="setUpType_show_v == 'HMS'">
    <InputItem labelStr="请求方式" value="!122" type="radio5" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'

export default defineComponent({
  components: {},

  props: {
    setUpTypeName: {
      type: String,
      default: null,
    },
  },
  setup() {
    const state: any = ref()
    state['value'] = {
      value_TLS: [],
      ableNum: '4',
    }
    const setUpType_show_v: any = ref()
    setUpType_show_v['value'] = ''
    const areaData: any = ref()
    areaData['value'] = [
      {
        name: '112',
        value: '22',
      },
      {
        name: '112',
        value: '22',
      },
    ]

    const formState: any = ref()
    formState['value'] = {}

    return {
      formState,
      ...toRefs(state['value']),

      setUpType_show_v,
      areaData,
    }
  },
})
</script>
