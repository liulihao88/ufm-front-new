<template>
  <div>
    <div class="content-task-page">
      <btn-module
        ref="btnModuleRef"
        :isSelect="isSelect"
        :selectItem="selectItem"
        :selectedRowsArr="selectedRowsArr"
        :selectItemName="selectItemName"
        :tableData="tableData"
        @editFn="editFn"
        @showNewFn="showNewFn"
        @downLogFn="downLogFn"
        @changeFilterFn="changeFilterFn"
        @batchStartFn="batchStartFn"
        @batchStopedFn="batchStopedFn"
        @refreshFn="initFn(true)"
      />
      <a-table
        :columns="columns"
        sticky
        rowKey="id"
        :data-source="tableData"
        :bordered="false"
        :expandIcon="customExpandIcon"
        :expandedRowKeys="expandedRowKeys"
        :expandRowByClick="true"
        class="oct-task-table"
        :pagination="pagination"
        size="small"
        :row-selection="{
          selectedRowKeys: state.selectedRowKeys,
          onChange: onSelectChange,
          getCheckboxProps: getCheckboxProps,
        }"
        @expand="expandFn"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div class="cl-blue cp" style="max-width: 300px" @click.stop="editFn(record)">
              <o-tooltip :content="record.name" />
            </div>
          </template>
          <template v-if="column.key === 'lastStartTime'">
            {{ formatTime(record.lastStartTime) || '-' }}
          </template>
          <template v-if="column.key === 'serviceStatus'">
            <span v-if="record.runtimeName == 'Normal'">
              <span class="status-ufm-el status-tag-normal">{{ record.runtimeNameLabel }}</span>
            </span>
            <span v-else class="status-ufm-el status-tag-unkown">
              <span>{{ record.runtimeNameLabel }}</span>
            </span>
            <span class="m-lr-8">
              <span v-if="record.status.toUpperCase() == 'STOPED'" class="status-ufm-el status-tag-unkown">
                {{ record.statusLabel }}
              </span>
              <span v-else class="status-ufm-el status-tag-normal">{{ record.statusLabel }}</span>
            </span>

            <span v-if="record.serviceStatus == 'Online'">
              <span class="status-ufm-el status-tag-normal">{{ record.serviceStatusLabel }}</span>
            </span>
            <span v-else class="status-ufm-el status-tag-unkown">
              <span>{{ record.serviceStatusLabel }}</span>
            </span>
          </template>

          <template v-if="column.key === 'performanceObj'">
            <ul class="quota-box">
              <li class="info-3">
                <span>近期：</span>
                <span class="num">{{ record.performanceObj?.recentSucceedCount ?? '-' }}</span>
                <span class="num">{{ record.performanceObj?.recentSucceedBytes ?? '-' }}</span>
              </li>
              <li class="info-3">
                <span>平均：</span>
                <span class="num">{{ record.performanceObj?.averageSucceedBytesPerSec ?? '-' }}</span>
              </li>
            </ul>
          </template>

          <template v-if="column.key === 'runtimeInfoObj'">
            <div class="runtime-box">
              <div class="runtime-box-item">
                <span>已复制:</span>
                <span class="num">{{ record.runtimeInfoObj?.totalSucceedCount ?? '-' }}</span>
              </div>
              <div class="runtime-box-item">
                <span>失败次数:</span>
                <span class="num">{{ record.runtimeInfoObj?.totalFailedCount ?? '-' }}</span>
              </div>
              <div class="runtime-box-item">
                <span>忽略次数:</span>
                <span class="num">{{ record.runtimeInfoObj?.totalIgnoreCount ?? '-' }}</span>
              </div>
              <div class="runtime-box-item">
                <span>传输用时:</span>
                <span class="num">{{ record.runtimeInfoObj?.totalWorkSeconds ?? '-' }}</span>
              </div>
              <div class="runtime-box-item">
                <span>最后工作时间:</span>
                <span class="num">{{ record.runtimeInfoObj?.lastWorkTime ?? '-' }}</span>
              </div>
            </div>
          </template>

          <template v-if="column.key === 'operation'">
            <div class="f">
              <el-button v-if="$dev" size="small" link @click="startFn(record)">开始</el-button>
              <el-button v-if="$dev" size="small" link @click="stopedFn(record)">停止</el-button>
              <el-button v-if="$dev" size="small" link @click="onKill(record)">强制终止</el-button>
              <el-button v-if="$dev" size="small" link @click="onExport(record)">导出</el-button>
              <el-button v-if="$dev" size="small" link @click="restoreRow(record)">恢复</el-button>
              <el-button v-if="$dev" size="small" link @click="onDel(record, true)">强制删除</el-button>
              <el-button v-if="$dev" size="small" link @click="lookRunningFn(record)">查看运行状态</el-button>
              <el-button v-if="$dev" size="small" link @click="onDownload(record)">下载</el-button>
              <a-popover placement="bottomLeft" trigger="hover" class="custom-popVer" @click.stop>
                <template #content>
                  <ul class="btn-list-box">
                    <li @click="startFn(record)">开始</li>
                    <li @click="stopedFn(record)">停止</li>
                    <li @click="onKill(record)">强制终止</li>
                    <li @click="onDownload(record)">任务日志下载</li>
                    <o-popconfirm trigger="click" title="是否清除日志?" @confirm="onClearLog(record)">
                      <li>清除日志</li>
                    </o-popconfirm>
                    <li @click="lookRunningFn(record)">查看运行状态</li>
                    <li @click="restoreRow(record)">恢复</li>
                    <li @click="onDel(record)">删除</li>
                    <li @click="onDel(record, true)">强制删除</li>
                  </ul>
                </template>
                <div class="btn-more iconfont icon-ufm-shenglve" />
              </a-popover>
            </div>
          </template>
        </template>
      </a-table>
    </div>
    <o-dialog v-model="isVisible" title="新建" class="functional-box" @confirm="handleOk" @cancel="cancelFn">
      <div class="input-parent">
        <h3>模板</h3>
        <o-select v-model="moduleVal" :options="optionData" disabled width="100%" :emptyColor="false" />
      </div>
      <div class="input-parent">
        <h3>过滤器</h3>
        <o-select v-model="star" :options="optionData" disabled width="100%" :emptyColor="false" />
      </div>
      <div class="input-parent">
        <h3>
          所有者
          <span class="fs-12 fw-400">(双击所有者可直接新建)</span>
        </h3>
        <ul class="ip-list-box">
          <li
            v-for="(item, index) in listIP"
            :key="index"
            :class="item.isSelect ? 'select-el' : ''"
            @click="selectOwerFn(item)"
            @dblclick="handleOk"
          >
            {{ item.id }} ({{ item.hostname }})
          </li>
        </ul>
      </div>
    </o-dialog>
    <StatusModule ref="statusRef" :recordCurrentData="recordCurrentData" @closeFn="statusFn" />
  </div>
</template>
<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue'
import { h, ref, getCurrentInstance, onUnmounted, reactive } from 'vue'
import config from '@/config/baseConfig.ts'
import { useRouter } from 'vue-router'
import BtnModule from './module/btnModule.vue'
import StatusModule from './module/statusModule.vue'
import {
  getPublicTaskAPI,
  deletePublicTask,
  startTask,
  stopTaskAPI,
  checkStatusTaskAPI,
  killTaskAPI,
  uclientlistAPI,
} from '@/server/API/task'
const { proxy } = getCurrentInstance()

const timer = ref(null)
const star = ref('*')
//按钮相关
const optionData = []
const statusRef = ref(null)
const isVisible = ref(false)
const isVisibleAlert = ref(false)
const isSelect = ref(false)
const selectItem = ref('')
const selectItemName = ref('')
const selectedRowsArr = ref([])
const alertData = ref({
  text: '',
  value: '',
})
let tableData = ref([])
const state = reactive({
  selectedRowKeys: [],
})
let recodeTableData = ref([])
const recordCurrentData = ref({})
const restoreRow = (record) => {
  if (record.serviceStatus !== 'Online') {
    return proxy.$toast('该设备不可用', 'e')
  }
  proxy.clearStorage('tabsIndex')
  proxy.setStorage('nodeId', record.nodeId)
  setTaskName(record)
  router.push({ name: 'edit', query: { id: record.id, type: 'restore' } })
}
const btnModuleRef = ref(null)

const pagination = ref({
  current: 1,
  defaultPageSize: 20,
  total: () => tableData.value.length,
  showTotal: () => `共 ${tableData.value.length} 条`,
  showSizeChange: (num) => {
    console.log(`85 num`, num)
  },
  onChange: (num: number) => {
    pagination.value.current = num
  },
})

const columns: TableColumnsType = [
  { title: '任务ID', width: 50, dataIndex: 'id', key: 'id' },
  { title: '任务名', dataIndex: 'name', key: 'name', width: 120 },
  { title: '所有者', dataIndex: 'nodeId', key: 'nodeId', width: 120 },
  { title: '主机', dataIndex: 'hostname', key: 'hostname', width: 100 },
  {
    title: '开始时间',
    dataIndex: 'lastStartTime',
    key: 'lastStartTime',
    width: 150,
  },
  {
    title: '伺服 | 状态 | 所有者状态',
    dataIndex: 'serviceStatus',
    key: 'serviceStatus',
    width: 130,
  },
  {
    title: '性能',
    dataIndex: 'performanceObj',
    key: 'performanceObj',
    width: 220,
  },
  {
    title: '运行时信息',
    dataIndex: 'runtimeInfoObj',
    key: 'runtimeInfoObj',
    width: 300,
  },
  {
    title: '操作',
    fixed: 'right',
    key: 'operation',
    width: proxy.$dev ? 300 : 50,
  },
]
//初始化
const initFn = async (str) => {
  onSelectChange([], [])
  let res = await getPublicTaskAPI()
  if (str) {
    proxy.$toast('刷新成功！')
  }
  tableData.value = res || []
  recodeTableData.value = res || []
  btnModuleRef.value?.changeFilterFn?.()
}
initFn()
const isShowStatus = ref(false)
const moduleVal = ref('默认')
const formState: any = ref()
formState.value = {
  user: '',
  password: '',
}

const cancelBackFn = () => {
  isVisibleAlert.value = false
}

const showNewFn: void = () => {
  if (listIP.value.length <= 0) {
    proxy.$toast('请联系管理员，所有者列表为空，不能新建！', 'w')
    return false
  }

  isVisible.value = true
}

//查看整体状态

const statusFn = async (val) => {
  let res = await proxy.request('/task/public/runtime/info')
  recordCurrentData.value = res
  isShowStatus.value = val
}
const lookRunningFn = (data) => {
  recordCurrentData.value = proxy.clone(data)
  statusRef.value.open(recordCurrentData.value)
}
const editFn = (record) => {
  if (record.serviceStatus !== 'Online') {
    return proxy.$toast('该设备不可用', 'e')
  }
  proxy.setStorage('nodeId', record.nodeId)
  setTaskName(record)
  // proxy.clearStorage('tabsIndex')
  router.push({ name: 'edit', query: { id: record.id } })
}

const router = useRouter()
const expandedRowKeys: any = ref()
expandedRowKeys.value = ['']
const setTaskName = (record) => {
  localStorage.setItem('oeos_edit_name', record.name)
  localStorage.setItem('oeos_edit_ower', record.nodeId)
}

const itemDetails = ref({})
const openOp_fn = (obj: object) => {
  checkStatusTaskAPI(obj, (res: any) => {
    let data: object = res.data.details
    if (data.performance) {
      let _data: object = data
      _data.performance = JSON.parse(JSON.parse(JSON.stringify(data.performance)))
      itemDetails.value = _data
    }
  })
}
//展开操作
const expandFn = (expanded: boolean, record: any) => {
  isSelect.value = expanded
  selectItem.value = record.id
  selectItemName.value = record.name
  setTaskName(record)
  expandedRowKeys.value = []
  if (expanded) {
    expandedRowKeys.value.push(record.key)
    openOp_fn(record)
  }
}
const customExpandIcon = (pro: any) => {
  let { expanded, record } = pro
  return h('div', {
    class: `oct-table-row-icon ${expanded ? 'oct-table-row-expanded' : 'oct-table-row-collapsed'}`,
    onClick: () => {
      if (expanded) {
        if (expandedRowKeys.value[0] != record.key) {
          expandedRowKeys.value.push(record.key)
        } else {
          expandedRowKeys.value = []
        }
      } else {
        expandedRowKeys.value = []
        expandedRowKeys.value.push(record.key)
      }
    },
  })
}

const backCommonFn = () => {
  setTimeout(() => {
    initFn()
  }, 3000)
}
function formatTime(time, cFormat = '{y}-{m}-{d} {h}:{i}:{s}') {
  if (!time) {
    return time
  }
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = cFormat.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key] // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
//批量
const batchBackFn = (fn: any) => {
  if (selectedRowsArr.value && selectedRowsArr.value.length > 0) {
    selectedRowsArr.value?.forEach((item: object) => {
      fn(item)
    })
    proxy.$toast('操作成功！')
    backCommonFn()
  } else {
    proxy.$toast('请至少选择一个任务！', 'w')
  }
}
const batchStartFn = () => {
  batchBackFn((data: object) => {
    startTask(data)
  })
}
const batchStopedFn = () => {
  batchBackFn((data: object) => {
    stopTaskAPI(data, () => {})
  })
}
// 表格单条数据操作请求
const onDel = async (row, isForce = false) => {
  alertData.value.text = isForce
    ? '确定要强制删除选定的任务吗，确保此任务没有在运行，并且没有更多的资源被使用'
    : '确定要删除选定的任务吗，资源也将会被释放'
  !proxy.$dev && (await proxy.confirm(`${alertData.value.text}`))
  isVisibleAlert.value = false
  let res = await deletePublicTask(row, isForce)
  proxy.$toast(res)
  backCommonFn()
}
const startFn = async (data) => {
  if (data.serviceStatus != 'Online') {
    proxy.$toast('离线任务，不可开始！', 'w')
    return false
  }
  await startTask(data)
  proxy.$toast('操作成功!')
  backCommonFn()
}
const stopedFn = (data: object) => {
  if (data.status.toUpperCase() == 'STOPED') {
    proxy.$toast('任务已是停止状态！', 'w')
    return false
  }
  stopTaskAPI(data, () => {
    proxy.$toast('停止成功！')
    backCommonFn()
  })
}
const onKill = (data) => {
  if (data.status.toUpperCase() == 'STOPED') {
    proxy.$toast('任务已是停止状态，无需关闭！', 'w')
    return false
  }
  killTaskAPI(data, () => {
    proxy.$toast('强制关闭成功！')
    backCommonFn()
  })
}
const downLogFn = () => {}
const onDownload = (row) => {
  const accessToken = proxy.getStorage('ufm_token')
  let encodeToken = encodeURI(accessToken)
  let url = `/admin/task/public/${row.nodeId}/${row.id}/log/download?Authorization=${encodeToken}`
  let parseOrigin = proxy.$local ? config.url : location.origin
  let openUrl = parseOrigin + url
  window.location.href = openUrl
}

const onClearLog = async (row) => {
  await proxy.request({
    url: `/task/public/${row.nodeId}/${row.id}/log`,
    method: 'delete',
  })
  proxy.$toast(`日志${row.id}清除成功`)
}
const changeFilterFn = (selectValue, selectStrValue, searchValue) => {
  onSelectChange([], [])
  let selectFilterTable = []
  if (!selectValue) {
    selectFilterTable = recodeTableData.value
  } else if (selectValue === 'StopedOnline') {
    selectFilterTable = recodeTableData.value.filter((v) => {
      return v.status === 'Stoped' && v.serviceStatus === 'Online'
    })
  } else {
    selectFilterTable = recodeTableData.value.filter((v) => {
      let res = v.status == selectValue || v.serviceStatus == selectValue
      return res
    })
  }
  console.log(`45 selectStrValue`, selectStrValue)
  console.log(`44 selectFilterTable`, selectFilterTable)
  // let selectFilterValue = []
  if (!searchValue && (selectStrValue.length === 0 || selectStrValue.length === 4)) {
    tableData.value = proxy.clone(selectFilterTable)
  } else {
    tableData.value = selectFilterTable.filter((v) => {
      if ((selectStrValue.includes('id') || selectStrValue.length === 0) && v.id.includes(searchValue)) {
        return true
      }
      if ((selectStrValue.includes('name') || selectStrValue.length === 0) && v.name.includes(searchValue)) {
        return true
      }
      if ((selectStrValue.includes('nodeId') || selectStrValue.length === 0) && v.nodeId.includes(searchValue)) {
        return true
      }
      if ((selectStrValue.includes('hostname') || selectStrValue.length === 0) && v.hostname.includes(searchValue)) {
        return true
      }
      return false
    })
  }
}

//新建相关
let listIP = ref<object[]>([])
const defaultListIPFn = () => {
  listIP.value.map((el) => {
    el.isSelect = false
  })
}
const initNewOwer = async () => {
  let res = await uclientlistAPI()
  listIP.value = res ?? []
  defaultListIPFn()
  if (listIP.value.length > 0) {
    selectOwerFn(listIP.value[0])
  }
}
initNewOwer()
let currentOwer: object = {}
const selectOwerFn = (item) => {
  listIP.value.map((el) => {
    el.isSelect = false
    if (item.id === el.id) {
      el.isSelect = true
      currentOwer = item
    }
  })
}
const handleOk = () => {
  if (!currentOwer.name) {
    proxy.$toast('请先选择所有者！', 'w')
    return false
  }
  // proxy.clearStorage('tabsIndex')
  isVisible.value = false
  proxy.setStorage('nodeId', currentOwer.nodeId)
  router.push({ name: 'edit' })
}
const cancelFn = () => {
  isVisible.value = false
  defaultListIPFn()
}
const onExport = async (row) => {
  let res = await proxy.request({
    url: `/task/public/${row.nodeId}/${row.id}/export`,
    responseType: 'blob',
    custom: true,
  })
  let fileName = res.headers['content-disposition'].split('filename=')[1]
  fileName = JSON.parse(fileName)
  const a = document.createElement('a')
  // 兼容webkix浏览器，处理webkit浏览器中href自动添加blob前缀，默认在浏览器打开而不载
  const URL = window.URL || window.webkitURL
  // 根据解析后的blob对象创建URL 对象
  const herf = URL.createObjectURL(res.data)
  // 下载链接
  a.href = herf
  // 下载文件名,如果后端没有返回，可以自己写a.download = '文件.pdf'
  a.download = fileName
  document.body.appendChild(a)
  // 点击a标签，进行下载
  a.click()
  // 收尾工作，在内存中移除URL 对象
  document.body.removeChild(a)
  window.URL.revokeObjectURL(herf)
}

function onSelectChange(selectedRowKeys, selectedRows) {
  state.selectedRowKeys = selectedRowKeys
  if (selectedRows.length == 0) {
    selectedRowsArr.value = []
    isSelect.value = false
    return false
  }
  isSelect.value = true
  selectedRowsArr.value = []
  selectedRows.forEach((item) => {
    let obj = {
      nodeId: item.nodeId,
      id: item.id,
    }
    selectedRowsArr.value.push(obj)
  })
}
const getCheckboxProps = (record) => {
  return {
    disabled: record.name === 'Disabled User',
    name: record.name,
  }
}

onUnmounted(() => {
  clearInterval(timer.value)
})
</script>
<style lang="scss">
.custom-popVer {
  position: relative;
  color: $bg-color;
  background: $bg-line-2;

  &::before {
    @include center-c;
  }

  &:hover {
    color: $bg-btn-2;
    background: $bg-input;
  }
}

.slot-box {
  background: #fff;
}

.ufm-pagination-box {
  padding: 12px 16px;
  text-align: right;
}

.content-task-page {
  background: #fff;

  .ant-table.ant-table-small .ant-table-tbody > tr > td,
  .ant-table.ant-table-small .ant-table-thead > tr > th {
    padding: 5px 4px !important;
  }

  .ant-pagination-options {
    padding-right: 38px;

    .ant-pagination-options-size-changer {
      color: #fff;
      background: $bg-color;
      border-radius: 4px;

      .ant-select-selection-item {
        padding: 0;
      }
    }
  }

  .ant-table-wrapper .ant-table-thead > tr > th {
    border: none;
  }
}

.functional-box {
  color: $frontColor2;

  .input-parent {
    padding-top: 20px;

    &:nth-child(1) {
      padding-top: 10px;
    }

    h3 {
      font-size: 14px;
    }

    .ip-list-box {
      max-height: 314px;
      padding: 13px 0;
      overflow-y: auto;
      border: 1px solid #0003;
      border-radius: 2px;

      li {
        padding-left: 12px;
        font-size: 14px;
        line-height: 32px;
        color: #323233;

        &:hover {
          color: #5c6cc0;
          cursor: pointer;
          background: #f5f7fa;
        }

        &.select-el {
          font-weight: 600;
          color: #5c6cc0;
          background: #f5f7fa;
        }
      }
    }
  }

  .ant-modal-content .ant-modal-footer {
    text-align: right;
  }

  .ant-modal-header {
    padding: 8px 16px;

    .ant-modal-title {
      text-align: left;
    }
  }

  .ant-modal-close-x {
    height: 40px;

    .ant-modal-close-icon {
      vertical-align: 0.5rem;
    }
  }

  .input-box {
    display: flex;
    justify-content: space-between;
  }
}

.oct-task-table {
  padding: 10px 16px;

  .common-btn {
    display: inline-block;
    color: $bg-btn-2;
    cursor: pointer;

    &.common-btn-1 {
      padding-right: 16px;
    }
  }

  .ant-table-pagination.ant-pagination {
    padding: 16px 0;
  }

  .ant-table-content {
    overflow-y: auto;
  }

  .status-el {
    position: relative;
    padding-left: 18px;

    svg {
      @include center-l;

      left: 0;
    }
  }

  .ant-table-tbody {
    .ant-table-expanded-row {
      .ant-table-cell {
        padding: 0;
      }
    }
  }
}

.oct-table-row-icon {
  width: 16px;
  height: 16px;
  text-align: center;
  cursor: pointer;
  background: url("../../assets/image/icon_arrow@2x.png") no-repeat center;
  background-size: 100%;
}

.oct-table-row-collapsed {
  transform: rotate(0deg);
  animation: identifier2 200ms;
}

.oct-table-row-expanded {
  transform: rotate(-180deg);
  animation: identifier 200ms;
}

@keyframes identifier {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-180deg);
  }
}

@keyframes identifier2 {
  from {
    transform: rotate(-180deg);
  }

  to {
    transform: rotate(0deg);
  }
}

.num {
  display: inline-block;
  padding: 0 4px;
  margin: 4px;
  background: $bg-line;
}

.runtime-box {
  display: flex;
  flex-wrap: wrap;

  .runtime-box-item {
    min-width: 50px;
  }
}
</style>
