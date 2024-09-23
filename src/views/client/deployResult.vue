<template>
  <div class="content-box">
    <div class="card-box">
      <div v-for="(item, index) in statisticsData" :key="index" class="info-box">
        <div class="word-box">
          <h4>
            {{ item.name }}
            <h2 class="reach">{{ item.number }}</h2>
          </h4>
        </div>
      </div>
    </div>
    <div class="box-bottom">
      <div class="bot-top">
        <div class="bot-topL">
          <template v-for="(item, index) in BatchBtnDataV" :key="index">
            <o-tooltip :content="item.content" :disabled="!item.content || !item.isDisabled">
              <el-button class="shux" type="none" :disabled="item.isDisabled" @click="batchBtnClick(item, index)">
                <template v-if="item.icon" #icon>
                  <span class="image iconfont cl-blue m-lr-8" :class="[item.isDisabled && 'cl-45', item.icon]" />
                </template>
                {{ item.name }}
              </el-button>
            </o-tooltip>
          </template>
        </div>
        <div class="bot-topR">
          <el-button type="primary" @click="onTest(datas)">整体检测</el-button>
        </div>
      </div>
      <div class="bot-bot">
        <g-table
          ref="tableRef"
          v-loading="loading1"
          :columns="columns"
          :data="datas"
          :showPage="false"
          @selection-change="handleSelectionChange"
        >
          <template #state="{ scope, row }">
            <el-tag
              :type="row.reachable === true ? 'primary' : row.reachable === false ? 'danger' : 'info'"
              class="m-r-8 w-60"
              effect="dark"
            >
              {{ row.reachable === true ? '已连通' : row.reachable === false ? '未连通' : '未知' }}
            </el-tag>
            <el-tag
              :type="row.ctrl === true ? 'primary' : row.ctrl === false ? 'danger' : 'info'"
              class="m-r-8 w-60"
              effect="dark"
            >
              {{ row.ctrl === true ? '可控' : row.ctrl === false ? '不可控' : '未知' }}
            </el-tag>
            <el-tag
              :type="row.deployed === true ? 'primary' : row.deployed === false ? 'danger' : 'info'"
              effect="dark"
              class="w-60"
            >
              {{ row.deployed === true ? '已部署' : row.deployed === false ? '未部署' : '未知' }}
            </el-tag>
          </template>
          <template #operation="{ scope, row }">
            <o-tooltip content="开始检测">
              <span class="image iconfont icon-ufm-play cl-blue m-lr-8" @click="onTest([row])" />
            </o-tooltip>

            <o-tooltip content="安装">
              <o-popconfirm
                trigger="click"
                title="确定安装?"
                :reConfirm="!installDisabled(row)"
                @confirm="onTest([row], 'install')"
              >
                <span
                  class="image iconfont icon-ufm-download fs-100 cl-blue m-lr-8"
                  :class="{ 'cl-45': installDisabled(row) }"
                />
              </o-popconfirm>
            </o-tooltip>
            <o-tooltip content="升级">
              <o-popconfirm
                trigger="click"
                title="确定升级?"
                :reConfirm="!updateDisabled(row)"
                @confirm="onTest([row], 'update')"
              >
                <span
                  class="image iconfont icon-ufm-upload-btn fs-100 cl-blue m-lr-8"
                  :class="{ 'cl-45': updateDisabled(row) }"
                />
              </o-popconfirm>
            </o-tooltip>
            <o-tooltip content="卸载">
              <o-popconfirm
                trigger="click"
                title="确定卸载?"
                :reConfirm="!uninstallDisabled(row)"
                @confirm="onTest([row], 'uninstall')"
              >
                <span
                  class="image iconfont icon-ufm-xiezai fs-100 cl-blue m-lr-8"
                  :class="{ 'cl-45': uninstallDisabled(row) }"
                />
              </o-popconfirm>
            </o-tooltip>
            <o-tooltip content="停止安装或升级">
              <span class="image iconfont icon-ufm-stop cl-blue m-lr-8" @click="onTest([row], 'stop')" />
            </o-tooltip>
          </template>

          <template #progress="{ scope, row }">
            <template v-if="row.progress?.progress">
              <div class="f w-95%">
                <o-progress :percentage="row.progress.progress" />
                <el-tag type="primary">{{ progressStatus(row.progress) }}</el-tag>
              </div>
            </template>
          </template>
        </g-table>
      </div>
    </div>
    <g-yes-dialog ref="yesDialogRef" @confirm="confirm" />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, getCurrentInstance, onMounted, computed, onUnmounted } from 'vue'
const { proxy } = getCurrentInstance()
import { loading1 } from '@/utils/request'

const ipTimers = ref({})
const yesDialogRef = ref(null)
const selectedIps = ref([])
const selectedAllRows = ref([])
const tableRef = ref(null)

const deployConfig = ref(proxy.getStorage('deployConfig'))

const dialogTitle = ref('')

const datas = ref([])

const selectableFn = (val, index) => {
  return isCheckedRow(val)
}
function isCheckedRow(row) {
  return isBoolean(row.reachable) || isBoolean(row.ctrl) || isBoolean(row.deployed)
}

const columns = [
  {
    type: 'selection',
    key: 'name',
    selectable: selectableFn,
  },
  {
    label: '主机IP',
    prop: 'host',
    sortable: true,
    width: 120,
  },
  {
    label: '节点ID',
    prop: 'nodeId',
    width: 200,
  },
  {
    label: '系统',
    prop: 'system',
    width: 100,
  },
  {
    label: '状态',
    prop: 'state',
    useSlot: true,
    width: 300,
  },
  {
    label: '安装进度',
    prop: 'progress',
    useSlot: true,
  },
  {
    label: '操作',
    prop: 'operation',
    width: 250,
    useSlot: true,
  },
]
// 联通数量
const listItemModuleData = {
  host: '',
  deployed: '',
  ctrl: '',
  reachable: '',
}

const countListDataFn = (arr) => {
  datas.value = arr.map((v) => {
    let obj = proxy.clone(listItemModuleData)
    obj.host = v
    return obj
  })
}
countListDataFn(deployConfig.value.ips)

const selectType = ref('')

const confirm = async (title) => {
  onTest(selectedAllRows.value, selectType.value)
}

const batchBtnClick = (v, i) => {
  if (v.type !== 'deployed' && v.type !== 'unDeployed') {
    dialogTitle.value = v.name
    selectType.value = v.type
    if (proxy.$dev || v.type === 'stop' || v.type === 'test') {
      onTest(selectedAllRows.value, selectType.value)
    } else {
      yesDialogRef.value.open(dialogTitle.value)
    }
  } else {
    toggleSelection(v.type)
  }
}
const toggleSelection = (type) => {
  let isDeployed = type === 'deployed'
  datas.value.forEach((row) => {
    let rowDeployed = row.deployed
    if (isCheckedRow(row)) {
      if (isDeployed && rowDeployed) {
        tableRef.value.$refs.tableRef.toggleRowSelection(row, true)
      } else if (!isDeployed && !rowDeployed) {
        tableRef.value.$refs.tableRef.toggleRowSelection(row, true)
      } else {
        tableRef.value.$refs.tableRef.toggleRowSelection(row, false)
      }
    } else {
      tableRef.value.$refs.tableRef.toggleRowSelection(row, false)
    }
  })
}
const publicPutData = {
  keepLog: true,
  nodeId: 'string',
  remoteClient: {
    authVersion: 'string',
    authorization: {},
    host: 'string',
    port: 0,
    protocol: 'string',
  },
}

function isBoolean(val) {
  return typeof val === 'boolean'
}

onMounted(() => {
  // devTest()
  // onTest(datas.value, 'test')
})

const handleSelectionChange = (val) => {
  selectedIps.value = val.map((v) => v.host)
  selectedAllRows.value = val
}
const multipleInstall = ref(false)
const multipleUpdate = ref(false)
watch(
  selectedAllRows,
  (val) => {
    if (proxy.isEmpty(val)) {
      multipleInstall.value = false
      multipleUpdate.value = false
    } else {
      multipleInstall.value = val.some((v) => {
        return v.ctrl && v.reachable
      })
      multipleUpdate.value = val.some((v) => {
        return v.ctrl && v.reachable && v.deployed
      })
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

const updateDisabled = (row) => {
  return !row.reachable || !row.ctrl || !row.deployed
}
const installDisabled = (row) => {
  return !row.reachable || !row.ctrl
}
const uninstallDisabled = (row) => {
  return !row.reachable || !row.ctrl || !row.deployed
}

const BatchBtnDataV = computed(() => [
  {
    name: '已部署项',
    type: 'deployed',
  },
  {
    name: '未部署项',
    type: 'unDeployed',
  },
  {
    name: '批量检测',
    isDisabled: selectedAllRows.value.length === 0,
    type: 'test',
    icon: 'icon-ufm-icon_ceshi',
  },
  {
    name: '批量安装',
    isDisabled: !multipleInstall.value,
    type: 'install',
    content: '请选择一个有效的节点进行安装!',
    icon: 'icon-ufm-download',
  },
  {
    name: '批量升级',
    type: 'update',
    isDisabled: !multipleUpdate.value,
    content: '请选择一个已部署的节点进行升级!',
    icon: 'icon-ufm-upload-btn',
  },
  {
    name: '批量卸载',
    type: 'uninstall',
    isDisabled: !multipleUpdate.value,
    content: '请选择一个已部署的节点进行卸载!',
    icon: 'icon-ufm-xiezai',
  },
  // {
  //   name: '批量停止',
  //   isDisabled: selectedAllRows.value.length === 0,
  //   type: 'stop',
  //   icon: 'icon-ufm-stop',
  // },
])

const statisticsData = computed(() => {
  let baseArr = ref([
    {
      name: '已连通',
      number: 0,
      value: 'link',
    },
    {
      name: '可控',
      number: 0,
      value: 'control',
    },
    {
      name: '已部署',
      number: 0,
      value: 'deplay',
    },
  ])

  datas.value.forEach((v) => {
    if (v.reachable === true) {
      baseArr.value[0].number = baseArr.value[0].number + 1
    }
    if (v.ctrl === true) {
      baseArr.value[1].number = baseArr.value[1].number + 1
    }
    if (v.deployed === true) {
      baseArr.value[2].number = baseArr.value[2].number + 1
    }
  })
  return baseArr.value
})
const isChecked = computed(() => {
  let res = datas.value.some((v) => {
    return isBoolean(v.reachable) || isBoolean(v.ctrl) || isBoolean(v.deployed)
  })
  console.log(`16 res`, res)
  return res
})

const chengedatas = (host, prop, changeStatus = true) => {
  datas.value = datas.value.map((v) => {
    if (v.host === host) {
      v[prop] = changeStatus
    }
    return v
  })
}

/**
 * <!-- INITIALIZING, HANDLING, STOPED, ERROR, PENDING -->
 */
const progressStatus = (progress) => {
  if (progress.status === 'ERROR') {
    return '安装错误'
  }
  if (progress.status === 'INITIALIZING' || progress.status === 'HANDLING' || progress.status === 'PENDING') {
    return '安装中'
  }
  if (progress.status === 'STOPED' && progress.progress === 100) {
    return '安装成功'
  }
}

/**
 *
 * {
  "starttime": 1720755656742,
  "status": "HANDLING",
  "progress": 1,
  "summary": "Remote Control Testing...",
  "details": null,
  "lastUpdateTime": 1720755656748
}
 * @param type
 * @param row
 * @param results
 */
const handleInstall = (row, results) => {
  let host = row.host
  ipTimers.value[row.host] = setInterval(() => {
    proxy
      .request({
        url: `/client/deploy/${host}/progress`,
      })
      .then((res) => {
        datas.value = datas.value.map((v) => {
          let obj = proxy.clone(v)
          if (v.host === row.host) {
            obj = {
              ...v,
              ...{
                progress: res,
              },
            }
          }
          return obj
        })
        if (res.status === 'STOPED' || res.status === 'ERROR') {
          clearInterval(ipTimers.value[row.host])
        }
        if (res.progress === 100) {
          onTest([row])
        }
      })
      .catch((err) => {
        clearInterval(ipTimers.value[row.host])
      })
  }, 5000)
}

/**
 *
 * @param rowOrSelected 可以传递选中的数组或者行的对象
 * @param type
 */
const onTest = async (selectArr, type = 'test') => {
  publicPutData.keepLog = deployConfig.value.isKeepLog

  // linux
  let sshAuthData = {
    authVersion: '',
    authorization: {
      ignoreHostKeyChecking: true,
      knownHosts: '',
      location: '',
      passphrase: deployConfig.value.SSHAuthentication.command, //口令
      password: btoa(deployConfig.value.SSHAuthentication.password),
      privateKey: deployConfig.value.SSHAuthentication.key,
      username: deployConfig.value.SSHAuthentication.authName,
    },
    port: 22, //固定端口
    protocol: '',
  }

  // windows
  let rsAuthData = {
    authVersion: '',
    authorization: btoa(deployConfig.value.shellAuthentication.authorization), // zV8OURdsIBwtVGky
    port: deployConfig.value.shellAuthentication.port,
    protocol: '',
  }
  // 如果是测试, 先走测试接口
  if (type === 'test') {
    let postData = {
      hosts: selectArr.map((v) => v.host),
      rsAuth: rsAuthData,
      sshAuth: sshAuthData,
    }
    let res = await proxy.request({
      url: '/client/deploy/test',
      method: 'put',
      data: postData,
      loading: 'loading1',
    })
    datas.value = datas.value.map((v) => {
      let obj = v
      res.forEach((val, idx) => {
        if (val.host === v.host) {
          obj = Object.assign({}, v, val)
        }
      })
      return obj
    })
    return
  }

  const urlMap = {
    install: '/client/deploy/install',
    update: '/client/deploy/upgrade',
    uninstall: '/client/deploy/uninstall',
  }
  let filterSelectArr = proxy.clone(selectArr)
  filterSelectArr = filterSelectArr.filter((v) => {
    if (type === 'install' || type === 'stop') {
      return v.reachable && v.ctrl
    }
    if (type === 'update' || type === 'uninstall') {
      return v.reachable && v.ctrl && v.deployed
    }
  })
  let promiseRemoteShell = []
  for (let i = 0; i < filterSelectArr.length; i++) {
    sshAuthData.host = filterSelectArr[i].host
    rsAuthData.host = filterSelectArr[i].host
    let sendData = {
      nodeId: filterSelectArr[i].nodeId,
      remoteClient: filterSelectArr[i].system === 'LINUX' ? sshAuthData : rsAuthData,
    }
    if (type === 'uninstall') {
      sendData.keepLog = true
    }
    if (type === 'stop') {
      sendData = []
    }
    let requestParams = {
      url: urlMap[type],
      method: 'put',
      data: sendData,
    }
    if (type === 'stop') {
      requestParams = {
        url: `/client/deploy/${filterSelectArr[i].host}/stop`,
        method: 'put',
      }
    }
    let req = proxy.request(requestParams)
    promiseRemoteShell.push(req)
  }
  Promise.allSettled(promiseRemoteShell).then((results) => {
    for (let i = 0; i < results.length; i++) {
      if (results[i].status === 'fulfilled') {
        if (type === 'install' || type === 'update') {
          handleInstall(filterSelectArr[i], results[i])
        } else if (type === 'stop') {
          onTest(filterSelectArr[i])
          ipTimers.value[filterSelectArr[i].host] = null
        } else if (type === 'uninstall') {
          // console.log(`39 filterSelectArr`, filterSelectArr);
          onTest(filterSelectArr)
          proxy.$toast('卸载成功')
        }
      }
    }
  })
}

const devTest = () => {
  if (proxy.$dev) {
    // toggleSelection('unDeployed')
    onTest(datas.value, 'test')
  }
}
// devTest()

onUnmounted(() => {
  Object.entries(ipTimers.value).forEach(([key, value]) => {
    if (value) {
      clearInterval(key)
    }
  })
})
</script>
<style scoped lang="scss">
.content-box {
  padding: 8px;

  .card-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
    margin: 0 !important;
    margin-top: 20px !important;

    .info-box {
      width: 33%;
      height: 52px;
      border-radius: 4px;

      .word-box {
        padding-left: 26px;
        line-height: 48px;

        h4 {
          color: #8b8686;
        }

        h2 {
          // margin-top: 16px;
          display: inline;
          margin-left: 40%;
          font-weight: 600;
        }
      }
    }

    .info-box:nth-child(1) {
      background: #dae2fc80;

      h2 {
        color: rgb(209 117 231);
      }
    }

    .info-box:nth-child(2) {
      background: #cdf0ff80;

      h2 {
        color: rgb(0 179 255);
      }
    }

    .info-box:nth-child(3) {
      background: #d2fae080;

      h2 {
        color: rgb(48 163 88);
      }
    }
  }

  .box-bottom {
    padding: 16px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #f5f7fa;

    .bot-top {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-bottom: 16px;

      .bot-topL {
        button {
          margin-right: 16px;
        }
      }

      .bot-topR {
        button {
          margin-left: 16px;
          border: 1px solid #5c6bbf;
          border-color: #5c6bbf;
        }
      }
    }

    .bot-bot {
      .ant-table.ant-table-small .ant-table-tbody > tr > td,
      .ant-table.ant-table-small .ant-table-thead > tr > th {
        padding: 7px 4px !important;
      }

      .ant-pagination-options {
        padding-right: 38px;

        .ant-pagination-options-size-changer {
          color: #fff;
          background: #5c6cc0;
          border-radius: 4px;

          .ant-select-selection-item {
            padding: 0;
          }
        }
      }

      .ant-table-wrapper .ant-table-thead > tr > th {
        border: none;
      }

      :deep(.ant-table-wrapper .ant-table-cell) {
        padding: 7px 4px !important;
      }

      :deep(.ant-table-thead > tr > th) {
        font-family: PingFangSC-Regular;
        font-size: $fontSize1;
        font-weight: 400;
        color: #000000d9;
        letter-spacing: 0;
        background-color: rgb(27 73 165 / 10%);
        border: none;
      }

      :deep(.ant-checkbox-indeterminate .ant-checkbox-inner::after) {
        background-color: white;
      }

      // 状态
      .ant-tag {
        width: 30%;
        height: 32px;
        padding: 0 !important;
        margin-right: 8px !important;
        font-size: $fontSize1;
        line-height: 30px;
        text-align: center;
      }

      :deep(.ant-progress-inner) {
        height: 16px;
      }

      :deep(.ant-progress-bg) {
        height: 16px !important;
        background-color: #33f11a;
        opacity: 0.2;
      }

      .ant-btn {
        margin-right: 8px;
        border: none;
      }

      .textXQ {
        display: inline-block;
      }

      a {
        color: #5c6cc0;
      }

      a:hover {
        color: #6478eb;
      }

      // 操作列图片的间距
      .image {
        width: 18px;
        margin-right: 8px;
        font-size: 18px;
        vertical-align: middle;
      }

      .image:hover {
        color: #6478eb;
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }
}

.modal {
  .ant-modal-content .ant-modal-footer .ant-btn[data-v-146fa6c9] {
    width: 60px;
  }

  .handleOk {
    width: 60px;
  }
}
</style>
