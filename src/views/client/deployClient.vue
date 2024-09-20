<template>
  <div class="box">
    <div class="box-ant">
      <u-button type="primary" icon="baocun" @click="saveInfoFn">保存</u-button>
    </div>
    <div class="card-box">
      <!-- 部署节点 -->
      <div class="info-box">
        <div class="info-word">
          <h3>部署节点</h3>
        </div>
        <div class="info-border">
          <a-form>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="IP地址">
                  <a-tooltip>
                    <template #title>IP地址之间请用英文逗号隔开</template>
                    <o-input
                      v-model="deployConfig.ipAddress"
                      type="textarea"
                      :rows="3"
                      placeholder="请输入部署节点的IP地址,IP地址之间请用英文逗号隔开, 示例: 10.0.11.34, 10.0.11.4*"
                    />
                  </a-tooltip>
                </a-form-item>
              </a-col>
              <a-col :span="24" class="inp-cen">
                <a-form-item label="地址区间">
                  <div class="f-bt">
                    <o-input
                      v-model="deployConfig.ipAddStart"
                      class="tc"
                      style="text-align: center"
                      placeholder="起始地址"
                      :options="['10.0.11.34', '10.0.11.99', '10.0.11.171', '10.0.11.80', '10.0.11.81']"
                    />
                    <div class="inp-cent">
                      <hr color="#A6A6A6" size="0.5px" />
                    </div>
                    <o-input
                      v-model="deployConfig.ipAddEnd"
                      class="tc"
                      :options="['10.0.11.40', '10.0.11.99', '10.0.11.171', '10.0.11.80', '10.0.11.81']"
                      placeholder="结束地址"
                    />
                  </div>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
      <!-- 例外节点 -->
      <div class="info-box">
        <div class="info-word">
          <h3>例外节点</h3>
        </div>
        <div class="info-border">
          <a-form>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="IP地址">
                  <a-tooltip>
                    <template #title>IP地址之间请用英文逗号隔开</template>
                    <o-input
                      v-model="deployConfig.exIpAddress"
                      type="textarea"
                      :rows="3"
                      placeholder="请输入例外节点的IP地址,IP地址之间请用英文逗号隔开, 示例: 10.0.11.34, 10.0.11.4*"
                    />
                  </a-tooltip>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item
                  label=" "
                  style=" font-family: PingFang; font-size: 14px; font-weight: 500; color: #323233a6;opacity: 1"
                >
                  IP地址示例: 10.0.11.34, 10.0.11.4*
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
      <!-- SSH认证 -->
      <div class="info-box">
        <div class="info-word">
          <h3>SSH认证</h3>
        </div>
        <div class="info-border">
          <a-form>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="账户名">
                  <o-input v-model="deployConfig.SSHAuthentication.authName" placeholder="请输入账户名" required />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="密码">
                  <o-input
                    v-model="deployConfig.SSHAuthentication.password"
                    type="password"
                    placeholder="请输入密码"
                    required
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="私钥">
                  <o-input
                    v-model="deployConfig.SSHAuthentication.key"
                    type="textarea"
                    :row="3"
                    placeholder="请输入私钥"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="口令">
                  <o-input
                    v-model="deployConfig.SSHAuthentication.command"
                    type="textarea"
                    :row="3"
                    placeholder="请输入口令"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>

      <!-- Remote Shell认证 -->
      <div class="info-box">
        <div class="info-word">
          <h3>Remote Shell认证</h3>
        </div>
        <div class="info-border">
          <a-form>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="端口">
                  <o-input v-model="deployConfig.shellAuthentication.port" placeholder="请输入端口" />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="授权码">
                  <o-input
                    v-model="deployConfig.shellAuthentication.authorization"
                    type="password"
                    placeholder="请输入授权码"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
    </div>
    <div class="box-bottom">
      <!-- 部署配置 -->
      <div class="info-box">
        <div class="info-word">
          <h3>部署配置</h3>
        </div>
        <div class="info-border">
          <a-form>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="处理单元数">
                  <o-input v-model="deployConfig.unitNum" type="number" />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-checkbox :checked="deployConfig.isKeepLog" @click="isChecked" />
                卸载时保留日志
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
      <!-- 客户端配置 -->
      <div class="info-box">
        <div class="info-word">
          <h3>客户端配置</h3>
        </div>
        <div class="info-border">
          <a-form>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="管理端口">
                  <div class="num">8112</div>
                </a-form-item>
              </a-col>
              <a-col :span="24" class="forb">
                <a-checkbox checked="true" disabled />
                <span>注册为系统服务</span>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
    </div>

    <o-dialog ref="dialogRef" v-model="isShow" title="执行客户端" fullscreen :showFooter="false" :enableConfirm="false">
      <DeployResult v-if="isShow" />
    </o-dialog>
  </div>
</template>
<script lang="ts" setup>
import DeployResult from '@/views/client/deployResult.vue'

import { ref, onMounted, getCurrentInstance } from 'vue'
const emits = defineEmits(['changeTab'])
const { proxy } = getCurrentInstance()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

// 部署配置
const isShow = ref(false)

const originDeployConfig = {
  ipAddress: '',
  ipAddStart: '',
  ipAddEnd: '',
  exIpAddress: '',
  unitNum: '',
  ips: [],
  isKeepLog: false,
  shellAuthentication: {
    port: 2290,
    authorization: 'zV8OURdsIBwtVGky',
  },
  SSHAuthentication: {
    authName: 'root',
    password: 'password',
    key: '',
    command: '',
  },
}

const deployConfig = ref({})
deployConfig.value = proxy.getStorage('deployConfig') ?? originDeployConfig

const genIp = async (ip) => {
  return new Promise(async (resolve, reject) => {
    if (!ip) {
      return resolve([])
    }
    let splitIp = ip.split(',')
    let finalIps = []
    let trimSplitIp = splitIp.map((v) => v.trim()).filter((v) => v) ?? []
    for (let i = 0; i < trimSplitIp.length; i++) {
      let isIp = proxy.validate('ip', trimSplitIp[i], true)
      if (isIp) {
        finalIps.push(trimSplitIp[i])
      } else {
        let res = await parseIp(trimSplitIp[i])
        finalIps.push(...res)
      }
    }
    let sortIpts = Array.from(new Set(finalIps)).sort()
    resolve(sortIpts)

    function parseIp(ip) {
      return new Promise((resolve, reject) => {
        let genArr = []
        for (let i = 0; i < 10; i++) {
          let genIp = ip.replace(/\*/, i)
          let isIp = proxy.validate('ip', genIp, true)
          if (isIp) {
            genArr.push(genIp)
          } else {
            proxy.$toast(
              `${ip}的ip格式不正确, 正确的ip地址为准确的ip地址, 或者最多只允许通过一个*去匹配单个数字`,
              'e',
              { duration: 5000 },
            )
            reject()
            break
          }
        }
        resolve(genArr)
      })
    }
  })
}

const saveInfoFn = async () => {
  if (!deployConfig.value.SSHAuthentication.authName || !deployConfig.value.SSHAuthentication.password) {
    proxy.$toast('账户和密码必填！', 'w')
    return false
  }
  let ipAddressArr = await genIp(deployConfig.value.ipAddress)
  let exIpAddressArr = await genIp(deployConfig.value.exIpAddress)
  let ipRangeArr = await starEnd()
  let ipAddressRangeArr = ipAddressArr.concat(ipRangeArr)
  let sendIpAddress = [...new Set(ipAddressRangeArr.filter((v) => !exIpAddressArr.includes(v)))]
  sendIpAddress.sort()
  if (proxy.isEmpty(sendIpAddress)) {
    return proxy.$toast('无有效可部署节点,无法保存', 'e')
  }
  deployConfig.value.ips = sendIpAddress

  // isShow.value = true
  proxy.setStorage('deployConfig', deployConfig.value)
  router.push({ name: 'deployResult' })
}

const isChecked = () => {
  deployConfig.value.isKeepLog = !deployConfig.value.isKeepLog
}

const starEnd = async () => {
  return new Promise(async (resolve, reject) => {
    let ipAddStart = deployConfig.value.ipAddStart
    let ipAddEnd = deployConfig.value.ipAddEnd
    if ((!ipAddEnd && ipAddStart) || (!ipAddStart && ipAddEnd)) {
      proxy.$toast('地址区间不合法,地址区间将不生效！', 'e')
      return reject()
    }
    if (!ipAddStart.trim() && !ipAddEnd.trim()) {
      return resolve([])
    }
    if (!proxy.validate('ip', ipAddStart, true)) {
      proxy.$toast(`起始地址${ipAddStart}不合法, 只允许输入真实IP地址`, 'e')
      return reject()
    }
    if (!proxy.validate('ip', ipAddEnd, true)) {
      proxy.$toast(`结束地址${ipAddEnd}不合法, 只允许输入真实IP地址`, 'e')
      return reject()
    }

    let ipStart = ipToInteger(ipAddStart)
    let ipEnd = ipToInteger(ipAddEnd)
    if (ipEnd < ipStart && ipEnd && ipStart) {
      proxy.$toast('起始地址不能 小于 结束地址!', 'e')
      return reject()
    }

    const start = ipAddStart.split('.')
    const end = ipAddEnd.split('.')
    let ipRangeArr = []
    // 用来遍历区间中的每一个ip
    for (let i = Number(start[3]); i <= Number(end[3]) && i <= 255; i++) {
      let ip = `${start[0]}.${start[1]}.${start[2]}.${i}`
      ipRangeArr.push(ip)
    }
    resolve(ipRangeArr)
  })
}

// 将IP地址转化为数字
const ipToInteger = (ip: any) => {
  if (ip) {
    const parts = ip.split('.')
    const integers = parts.map((part: any) => parseInt(part))
    const result = (integers[0] << 24) | (integers[1] << 16) | (integers[2] << 8) | integers[3]
    return result
  }
}
//将ip区间的每个地址依次存入一个数组中
</script>
<style scoped lang="scss">
.box {
  .box-ant {
    position: fixed;
    top: 99px;
    right: 40px;
    z-index: 1;

    button {
      border: 1px solid #5c6bbf;
    }
  }

  .card-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
    margin: 0 !important;
    margin-top: 20px !important;
    background: #f5f7fa;

    .info-box {
      align-content: center;
      align-items: center;
      width: 49.5%;
      margin-bottom: 30px;
      background: #f5f7fa;
      border-radius: 4px;
      opacity: 1;

      .info-word {
        padding-left: 16px;
        margin-top: 8px;
        margin-bottom: 8px;
        color: #000000d9;
        opacity: 0.6;

        h3 {
          font-size: 16px;
          font-weight: 600;
        }
      }

      .info-border {
        height: 168px;
        padding: 12px 26px 16px 16px;
        border: 1px solid #eeeffd;

        .inp-cen {
          .inp-cent {
            display: inline-block;
            width: 20%;
            padding-right: 5%;
            padding-bottom: 5px;
            padding-left: 5%;
          }

          :deep(input.ant-input) {
            width: 40%;
            background-color: white;
          }
        }

        :deep(.ant-form-item) {
          margin-bottom: 12px !important;
        }

        :deep(.ant-form-item-label) {
          width: 80px;
          text-align: left;
        }

        :deep(.ant-form-item-label > label) {
          font-family: PingFang;
          font-size: $fontSize1;
          font-weight: 500;
          color: #323233d9;
          text-align: left;
          opacity: 1;
        }

        :deep(.ant-form-item-label > label::after) {
          content: '';
        }

        :deep(textarea.ant-input) {
          height: 99px;
          padding: 10px;
          padding-top: 8px;
          // 删除 文本域中右下角的斜线
          resize: none;
          border: 1px solid #d8d9e6;
          border-radius: 4px;
          opacity: 1;
        }

        :deep(input.ant-input) {
          height: 28px;
          padding-left: 10px;
          background-color: white;
          border: 1px solid #d8d9e6;
          border-radius: 4px;
          opacity: 1;
        }
      }
    }
  }

  .box-bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
    background: #f5f7fa;

    .info-box {
      align-content: center;
      align-items: center;
      // margin-bottom: 30px;
      width: 49.5%;
      margin-bottom: 16px;
      background: #f5f7fa;
      border-radius: 4px;

      .info-word {
        padding-left: 16px;
        margin-top: 8px;
        margin-bottom: 8px;
        color: #000000d9;
        opacity: 0.6;

        h3 {
          font-size: 16px;
          font-weight: 600;
        }
      }

      .info-border {
        height: 97px;
        padding: 12px 26px 12px 16px;
        border: 1px solid #eeeffd;

        .num {
          width: 57px;
          height: 28px;
          font-family: PingFang;
          font-size: $fontSize1;
          font-weight: sc;
          line-height: 28px;
          color: #5c6bbfd9;
          text-align: center;
          background-color: rgb(55 96 179 / 10%);
          border-radius: 4px;
        }

        .forb {
          :deep(.ant-checkbox-checked .ant-checkbox-inner) {
            background-color: white;
            border: 1px solid #00000026;
            border-radius: 2px;
            opacity: 1;
          }

          span {
            font-family: PingFang;
            font-size: $fontSize1;
            font-weight: sc;
            color: #bcbdbe;
            text-align: left;
            opacity: 1;
          }
        }

        :deep(.ant-form-item) {
          margin-bottom: 16px !important;
        }

        :deep(.ant-form-item-label) {
          width: 90px;
          text-align: left;
        }

        :deep(.ant-form-item-label > label) {
          font-family: PingFang;
          font-size: $fontSize1;
          font-weight: 500;
          color: #323233d9;
          text-align: left;
          opacity: 1;
        }

        :deep(.ant-form-item-label > label::after) {
          content: '';
        }

        :deep(input.ant-input) {
          width: 57px;
          height: 28px;
          padding-left: 10px;
          color: #5c6bbf;
          background: #3760b3;
          background-color: rgb(55 96 179 / 10%);
          border-radius: 4px;

          :deep(input.ant-input::-webkit-outer-spin-button,) :deep(input.ant-input::-webkit-inner-spin-button) {
            appearance: none;
          }
        }

        :deep(span.ant-checkbox) {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
