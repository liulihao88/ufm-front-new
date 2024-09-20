<template>
  <div v-if="setUpType_show_v == 'AS3S'">
    <a-form-item label="账户类型" v-bind="formState.area">
      <a-select v-model:value="formState.area" placeholder="please select your zone">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="区域" v-bind="formState.area">
      <a-form layout="inline" :model="formState">
        <a-form-item label="">
          <a-select v-model:value="formState.area" placeholder="please select your zone">
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="">
          <a-checkbox-group v-model:value="formState.type">
            <a-checkbox value="1" name="type">强制全局</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </a-form>
    </a-form-item>
  </div>

  <div v-if="setUpType_show_v == 'S3-OSS'">
    <a-form-item label="服务提供商">
      <a-form layout="inline" :model="formState">
        <a-form-item label="">
          <a-select
            v-model:value="formState.delivery"
            placeholder="请选择服务提供商"
            :disabled="formState.customize == '1'"
          >
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="">
          <a-checkbox-group v-model:value="formState.customize">
            <a-checkbox value="1" name="type">自定义</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </a-form>
    </a-form-item>
    <a-form-item label="系统入口类型 ">
      <a-checkbox-group v-model:value="formState.enterType" :disabled="formState.customize == '1'">
        <a-checkbox value="1" name="type">默认入口</a-checkbox>
        <a-checkbox value="2" name="type">加速入口</a-checkbox>
        <a-checkbox value="3" name="type">ECS入口</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="区域">
      <a-select v-model:value="formState.area" placeholder="请选择区域" :disabled="formState.customize == '1'">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="服务地址">
      <a-input v-model:value="formState.serverAddress" :disabled="formState.customize != '1'" />
    </a-form-item>
  </div>

  <div v-if="setUpType_show_v == 'S3-CS' || setUpType_show_v == 'S3-OSS' || setUpType_show_v == 'HCP-CS'">
    <a-form-item v-if="setUpType_show_v != 'S3-OSS'" label="服务器地址">
      <a-input v-model:value="formState.serverAddress" />
    </a-form-item>

    <a-form-item label="签名">
      <a-select v-if="setUpType_show_v == 'HCP-CS'" v-model:value="formState.sign" placeholder="请选择签名">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
      <a-input v-else v-model:value="formState.sign" />
    </a-form-item>
  </div>

  <div v-if="setUpType_show_v == 'MABS' || setUpType_show_v == 'MADLG'">
    <a-form-item label="验证类型">
      <a-select v-model:value="formState.testType" placeholder="请选择验证类型">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="服务器地址">
      <a-radio-group v-model:value="formState.enterType">
        <a-radio value="1">首选系统入口</a-radio>
        <a-radio value="2">次选系统入口</a-radio>
        <a-radio value="3">自定义入口</a-radio>
      </a-radio-group>
      <a-input v-model:value="formState.serverAddress" />
    </a-form-item>
    <a-form-item label="账户名">
      <a-input v-model:value="formState.account" />
    </a-form-item>
    <a-form-item label="账户密钥">
      <a-input v-model:value="formState.secreat" />
    </a-form-item>
  </div>

  <div v-if="setUpType_show_v == 'OS'">
    <a-form-item label="登录URL">
      <a-input v-model:value="formState.signUrl" />
    </a-form-item>
    <a-form-item label="验证方式">
      <a-select v-model:value="formState.testType" placeholder="请选择验证类型">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="租户ID">
      <a-input v-model:value="formState.tenantID" />
    </a-form-item>
    <a-form-item label="用户名">
      <a-input v-model:value="formState.account" />
    </a-form-item>
  </div>

  <div v-if="setUpType_show_v == 'MABS' || setUpType_show_v == 'MADLG' || setUpType_show_v == 'OS'">
    <a-form-item label="默认容器">
      <a-input v-model:value="formState.default" />
    </a-form-item>

    <a-form-item label="TLS/SSL">
      <a-checkbox v-model:value="formState.useTLS" name="type" disabled>使用 TLS/SSL 安全连接访问</a-checkbox>
      <a-checkbox v-model:value="formState.ignoreTLS" name="type">忽略 TLS/SSL 认证证书</a-checkbox>
    </a-form-item>
  </div>

  <div
    v-if="
      setUpType_show_v == 'AS3S' ||
      setUpType_show_v == 'S3-CS' ||
      setUpType_show_v == 'S3-OSS' ||
      setUpType_show_v == 'HCP-CS'
    "
  >
    <a-form-item label="访问键">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="密钥键">
      <a-input v-model:value="formState.name" />
    </a-form-item>

    <a-form-item label="默认桶">
      <a-input v-model:value="formState.name" />
    </a-form-item>
  </div>

  <div v-if="setUpType_show_v == 'OEOS1OS' || setUpType_show_v == 'HCP'">
    <a-form-item label="版本">
      <a-select :value="formState.edition" placeholder="请选择版本" disabled>
        <a-select-option value="edition">Auto delect</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="域名">
      <a-input v-model:value="formState.domainName" />
    </a-form-item>
    <a-form-item label="租户">
      <a-input v-model:value="formState.tenantName" />
    </a-form-item>
    <a-form-item label="空间名">
      <a-input v-model:value="formState.spaceName" />
    </a-form-item>
    <a-form-item label="认证">
      <a-select :value="formState.attestation" placeholder="请选择认证">
        <a-select-option value="shanghai">Zone one</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Base64用户名">
      <a-form layout="inline" :model="formState">
        <a-form-item label="">
          <a-input v-model:value="formState.base64" />
        </a-form-item>
        <a-form-item label="">
          <a-button html-type="submit">转换Base64</a-button>
        </a-form-item>
      </a-form>
    </a-form-item>
    <a-form-item label="MD5用户名">
      <a-form layout="inline" :model="formState">
        <a-form-item label="">
          <a-input v-model:value="formState.MD5" />
        </a-form-item>
        <a-form-item label="">
          <a-button html-type="submit">转换MD5</a-button>
        </a-form-item>
      </a-form>
    </a-form-item>
    <a-form-item label="TLS/SSL">
      <a-checkbox v-model:value="formState.useTLS" name="type">使用 TLS/SSL 安全连接访问</a-checkbox>
    </a-form-item>
  </div>

  <div v-if="setUpType_show_v == 'MQE'">
    <a-form-item label="HCP入口">
      <a-select :value="formState.HCP_Entry" placeholder="请选择版本">
        <a-select-option value="shanghai">Zone one</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="查询方式">
      <a-select :value="formState.queryType" placeholder="请选择版本">
        <a-select-option value="shanghai">Zone one</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="查询脚本">
      <a-textarea v-model:value="formState.queryScript" placeholder="" :auto-size="{ minRows: 2, maxRows: 5 }" />
    </a-form-item>
  </div>

  <div v-if="setUpType_show_v == 'BBCS'">
    <a-form-item label="登录ID">
      <a-input v-model:value="formState.signID" />
    </a-form-item>
    <a-form-item label="登录密钥">
      <a-input v-model:value="formState.secreat" />
    </a-form-item>
    <a-form-item label="默认桶">
      <a-input v-model:value="formState.default" />
    </a-form-item>
    <a-form-item label="TLS/SSL">
      <a-checkbox v-model:checked="formState.useTLS" name="type" disabled>使用 TLS/SSL 安全连接访问</a-checkbox>
    </a-form-item>
  </div>

  <div
    v-if="
      setUpType_show_v == 'FTP' ||
      setUpType_show_v == 'SFTP' ||
      setUpType_show_v == 'TFTP' ||
      setUpType_show_v == 'HDFS' ||
      setUpType_show_v == 'WEBDAV'
    "
  >
    <a-form-item label="主机">
      <a-input v-model:value="formState.post" />
    </a-form-item>
    <a-form-item v-if="setUpType_show_v != 'WEBDAV'" label="端口">
      <a-input v-model:value="formState.port" />
    </a-form-item>
    <a-form-item label="默认目录">
      <a-input v-model:value="formState.defaultList" :disabled="setUpType_show_v == 'TFTP' ? false : true" />
    </a-form-item>
  </div>

  <div v-if="setUpType_show_v == 'CIFS' || setUpType_show_v == 'NFS'">
    <a-form-item label="主机">
      <a-input v-model:value="formState.post" />
    </a-form-item>
    <a-form-item label="共享名称">
      <a-input v-model:value="formState.commonName" />
    </a-form-item>
  </div>

  <div
    v-if="
      setUpType_show_v == 'FTP' ||
      setUpType_show_v == 'SFTP' ||
      setUpType_show_v == 'CIFS' ||
      setUpType_show_v == 'NFS' ||
      setUpType_show_v == 'HDFS' ||
      setUpType_show_v == 'WEBDAV'
    "
  >
    <a-form-item label="用户名">
      <a-form layout="inline" :model="formState">
        <a-form-item label="">
          <a-input v-model:value="formState.account" />
        </a-form-item>
        <a-form-item v-if="setUpType_show_v == 'FTP'" label="">
          <a-checkbox v-model:checked="formState.anonymous" name="type" disabled>匿名</a-checkbox>
        </a-form-item>
      </a-form>
    </a-form-item>
    <a-form-item label="密码">
      <a-input v-model:value="formState.secreat" />
    </a-form-item>
  </div>

  <div v-if="setUpType_show_v == 'NFS'">
    <a-form-item label="GID">
      <a-input-number v-model:value="formState.GID" :min="0" :max="10" />
    </a-form-item>
    <a-form-item label="UID">
      <a-input-number v-model:value="formState.UID" :min="0" :max="10" />
    </a-form-item>
  </div>

  <a-form-item
    v-if="
      setUpType_show_v == 'AS3S' ||
      setUpType_show_v == 'S3-CS' ||
      setUpType_show_v == 'S3-OSS' ||
      setUpType_show_v == 'HCP-CS' ||
      setUpType_show_v == 'WEBDAV'
    "
    label="TLS/SSL"
  >
    <a-checkbox v-model:value="formState.useTLS" name="type">使用 TLS/SSL 安全连接访问</a-checkbox>
    <a-checkbox v-model:value="formState.ignoreTLS" name="type">忽略 TLS/SSL 认证证书</a-checkbox>
  </a-form-item>

  <a-form-item v-if="setUpType_show_v == 'FTP'" label="加密传输">
    <a-radio-group v-model:value="formState.transfer">
      <a-radio value="1">无密</a-radio>
      <a-radio value="2">隐式TLS/SSL</a-radio>
      <a-radio value="3">显示TLS/SSL</a-radio>
    </a-radio-group>
  </a-form-item>

  <div v-if="setUpType_show_v == 'LFS'">
    <a-form-item label="查看">
      <a-radio-group v-model:value="formState.view" @change="changeFn">
        <a-radio value="1">系统视图</a-radio>
        <a-radio value="2">用户视图(包含桌面文档等)</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="自定义盘符">
      <DiskTable />
    </a-form-item>
  </div>
  <div v-if="setUpType_show_v == 'MFS'">
    <a-form-item label="存储容量">
      <a-form layout="inline" :model="formState">
        <a-form-item label="">
          <a-input-number v-model:value="formState.storage" :min="1" :max="1000000000000000" />
        </a-form-item>
        <a-form-item label="">
          <a-select :value="formState.unit" placeholder="">
            <a-select-option value="GB">GB</a-select-option>
            <a-select-option value="TB">TB</a-select-option>
          </a-select>
        </a-form-item>
        <p class="tips-el">
          存储空间大小取决于您本机系统内存大小以及JVM可用内存空间配置（Xms）,
          <br />
          当前可用容量大致为 {{ ableNum }}GB。
        </p>
      </a-form>
    </a-form-item>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRaw, ref, toRefs, watch, nextTick, inject } from 'vue'

import DiskTable from './diskTable.vue'

const LFS_FormData = {
  view: '1',
  tableData: [],
}
const AS3S_FormData = {
  account: '',
  accountOption: [],
  area: '',
  areaOption: [],
  visit: '',
  secreat: '',
  default: '',
  useTLS: false,
  ignoreTLS: false,
}
const S3_CS_FormData = {
  serverAddress: '',
  sign: '',
  signOption: [],
  visit: '',
  secreat: '',
  default: '',
}

const S3_OSS_FormData = {
  customize: false,
  delivery: '',
  deliveryOption: [],
  enterType: '',
  serverAddress: '',
  sign: '',
  signOption: [],
  visit: '',
  secreat: '',
  default: '',
}
const MABS_FormData = {
  //MADLG  一样
  testType: '',
  testOption: [],
  enterType: '',
  serverAddress: '',
  secreat: '',
  account: '',
  default: '',
  useTLS: true,
  ignoreTLS: false,
}

const OEOS1OS_FormData = {
  //HCP 一样
  edition: 'edition',
  editionOptiop: '',
  domainName: '',
  tenantName: '',
  spaceName: '',
  attestation: '',
  attestationOption: '',
  base64: '',
  MD5: '',
  useTLS: false,
}

const MQE_FormData = {
  HCP_Entry: '',
  HCP_EntryOption: [],
  queryType: '',
  queryTypeOption: [],
  queryScript: '',
}

const HCP_CS_FormData = {
  serverAddress: '',
  sign: '',
  signOption: [],
  visit: '',
  secreat: '',
  default: '',
  useTLS: true,
  ignoreTLS: false,
}

const OS_FormData = {
  signUrl: '',
  testType: '',
  testOption: [],
  tenantID: '',
  account: '',
  secreat: '',
  default: '',
  useTLS: true,
  ignoreTLS: false,
}
const BBCS_FormData = {
  signID: '',
  secreat: '',
  default: '',
  useTLS: true,
}

const FTP_FormData = {
  post: '',
  port: '',
  defaultList: '',
  account: '',
  anonymous: false,
  secreat: '',
  transfer: '',
}
const SFTP_FormData = {
  post: '',
  port: '',
  defaultList: '',
  account: '',
  secreat: '',
}

const TFTP_FormData = {
  post: '',
  port: '',
  defaultList: '',
}

const CIFS_FormData = {
  post: '',
  commonName: '',
  account: '',
  secreat: '',
}

const NFS_FormData = {
  post: '',
  commonName: '',
  account: '',
  secreat: '',
  GID: '',
  UID: '',
}

const HDFS_FormData = {
  post: '',
  port: '',
  defaultList: '',
  account: '',
  secreat: '',
}
const WEBDAV_FormData = {
  post: '',
  defaultList: '',
  account: '',
  secreat: '',
  useTLS: true,
  ignoreTLS: false,
}
const MFS_FormData = {
  storge: '',
  unit: '',
}

export default defineComponent({
  components: {
    DiskTable,
  },

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
    const formState: any = ref(null)
    formState['value'] = {
      area: '',
      delivery: false,
      type: [],
      resource: '',
      storage: '',
    }
    watch(
      () => props.setUpTypeName,
      (newVal) => {
        nextTick(() => {
          state.setUpType_show_v = newVal
          switch (newVal) {
            case 'LFS':
              formState['value'] = LFS_FormData
              break
            case 'AS3S':
              formState['value'] = AS3S_FormData

              break
            case 'S3-CS':
              formState['value'] = S3_CS_FormData

              break
            case 'S3-OSS':
              formState['value'] = S3_OSS_FormData

              break
            case 'MABS':
              formState['value'] = MABS_FormData

              break
            case 'MADLG':
              formState['value'] = MABS_FormData

              break
            case 'OEOS1OS':
              formState['value'] = OEOS1OS_FormData

              break
            case 'HCP':
              formState['value'] = OEOS1OS_FormData
              break
            case 'MQE':
              formState['value'] = MQE_FormData
              break
            case 'HCP-CS':
              formState['value'] = HCP_CS_FormData
              break
            case 'OS':
              formState['value'] = OS_FormData
              break
            case 'BBCS':
              formState['value'] = BBCS_FormData
              break
            case 'FTP':
              formState['value'] = FTP_FormData
              break
            case 'SFTP':
              formState['value'] = SFTP_FormData
              break
            case 'TFTP':
              formState['value'] = TFTP_FormData
              break
            case 'CIFS':
              formState['value'] = CIFS_FormData
              break
            case 'NFS':
              formState['value'] = NFS_FormData
              break

            case 'HDFS':
              formState['value'] = HDFS_FormData
              break
            case 'WEBDAV':
              formState['value'] = WEBDAV_FormData
              break
            case 'MFS':
              formState['value'] = MFS_FormData
              break
          }
        })
      },
      {
        immediate: true,
        deep: true,
      },
    )

    const onSubmit = () => {
      console.log('submit!', toRaw(formState))
    }

    const formDataAll: any = inject('formDataAll')
    const changeFn = () => {
      formDataAll['value'] = formState
    }

    return {
      labelCol: { style: { width: '150px' } },
      wrapperCol: { span: 14 },
      formState,
      onSubmit,
      ...toRefs(state),
      changeFn,
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
