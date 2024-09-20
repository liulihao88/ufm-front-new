<template>
  <div class="btn-edit-box">
    <div class="btn-box-1 clearfix">
      <o-select
        v-model="selectValue"
        :options="optionFilerArr"
        width="110"
        placeholder="任务状态"
        @change="changeFilterFn"
      />

      <o-select
        v-model="selectStrValue"
        :options="filterStrOptions"
        multiple
        width="180"
        class="m-l-8"
        collapse-tags
        placeholder="过滤属性"
        @change="changeFilterFn"
      />
      <o-input
        v-model="searchValue"
        v-throttle.300="changeFilterFn"
        width="210"
        class="m-l-8"
        placeholder="任务ID,任务名,所有者,主机"
        @clear="changeFilterFn"
      />
      <el-button type="primary" class="ml2 cp" @click="clear">清空</el-button>
    </div>
    <div class="right-btn-box">
      <div class="operation-btn-box">
        <u-button icon="add-btn" class="editable-add-btn" style="margin-left: 12px" type="primary" @click="newFn">
          新建
        </u-button>
        <g-upload :tableData="tableData" :on-change="onChange" access=".task">
          <u-button icon="zhengtiquanbujihua" type="line" style="margin-left: 12px">导入</u-button>
        </g-upload>
        <o-tooltip content="请选择一个任务导出" :disabled="props.selectedRowsArr?.length === 1">
          <u-button
            icon="zhengtiquanbujihua"
            type="line"
            style="margin-left: 12px"
            :disabled="exportDisabled"
            @click="onExport"
          >
            导出
          </u-button>
        </o-tooltip>

        <o-tooltip content="请选择任务" :disabled="props.selectedRowsArr?.length !== 0">
          <o-popconfirm title="是否批量停止?" :reConfirm="props.selectedRowsArr?.length !== 0" @confirm="stopFn">
            <u-button icon="stop" type="line" style="margin-left: 12px" :disabled="props.selectedRowsArr?.length === 0">
              批量停止
            </u-button>
          </o-popconfirm>
        </o-tooltip>
        <o-tooltip content="请选择任务" :disabled="props.selectedRowsArr?.length !== 0">
          <o-popconfirm title="是否批量开始?" :reConfirm="props.selectedRowsArr?.length !== 0" @confirm="startFn">
            <u-button icon="play" type="line" style="margin-left: 12px" :disabled="props.selectedRowsArr?.length === 0">
              批量开始
            </u-button>
          </o-popconfirm>
        </o-tooltip>
        <u-button icon="zhengtiquanbujihua" type="line" :disabled="isOK" style="margin-left: 12px" @click="statusFn">
          整体状态
        </u-button>
        <u-button icon="change-retry" style="margin-left: 12px" :disabled="isOK" type="line" @click="refreshFn">
          刷新
        </u-button>
      </div>
    </div>
    <WholeStatus ref="wholeStatusRef" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, getCurrentInstance, computed } from 'vue'
import WholeStatus from '@/views/task/module/wholeStatus.vue'
import { useGlobalStore } from '@/store/useGlobal.js'
const { taskSearch, taskSelect, taskStrSelect, changeTaskValue } = useGlobalStore()

const props = defineProps({
  detailsInfo: {
    type: Object,
    default: null,
  },
  isSelect: {
    type: Boolean,
    default: false,
  },
  selectItem: {
    type: String,
    default: null,
  },
  selectItemName: {
    type: String,
    default: null,
  },
  selectedRowsArr: {
    type: Array,
  },
  tableData: {
    type: Array,
    default: null,
  },
})
const { proxy } = getCurrentInstance()
const emits = defineEmits(['refreshFn', 'batchStartFn', 'batchStopedFn', 'changeFilterFn'])
const wholeStatusRef = ref(null)
const selectValue = ref(taskSelect)
const selectStrValue = ref(taskStrSelect)
const searchValue = ref(taskSearch)
const optionFilerArr = ref([
  { label: '运行中', value: 'Running' },
  { label: '停止', value: 'Stoped' },
  { label: '在线', value: 'Online' },
  { label: '离线', value: 'Offline' },
  { label: '停止;在线', value: 'StopedOnline' },
])
const filterStrOptions = [
  { value: 'id', label: '任务ID' },
  { value: 'name', label: '任务名' },
  { value: 'nodeId', label: '所有者' },
  { value: 'hostname', label: '主机' },
]
const newFn = () => {
  emits('showNewFn')
}
const isOK = ref()
const isSelectV = ref<boolean>(props.isSelect)
watch(
  () => props.tableData,
  (newVal) => {
    newVal.length > 0 ? (isOK.value = false) : (isOK.value = true)
  },
  {
    immediate: true,
  },
)
watch(
  () => props.isSelect,
  (newVal) => {
    isSelectV.value = newVal
  },
)
async function onChange(file) {
  let fileId = file.name.replace('.task', '')
  let hasId = props.tableData?.some((v) => v.id === fileId)
  hasId && (await proxy.confirm(`确定要覆盖${fileId}吗?`))
  const formData = new FormData()
  formData.append('file', file.raw)
  let res = await proxy.request({
    url: '/task/public/import',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data', // 虽然 Axios 会自动设置，但显式设置可以避免一些兼容性问题
    },
  })
  refreshFn()
}
const selectCommonFn = (fn: any) => {
  if (!isSelectV.value) {
    proxy.$toast('请至少选择一个任务', 'e')
  } else {
    if (fn) {
      fn()
    }
  }
}
const refreshFn = () => {
  emits('refreshFn')
}
const statusFn = () => {
  wholeStatusRef.value?.open()
}
const startFn = () => {
  selectCommonFn(() => {
    emits('batchStartFn')
  })
}
const stopFn = () => {
  selectCommonFn(() => {
    emits('batchStopedFn')
  })
}

const exportDisabled = computed(() => {
  return !props.selectedRowsArr || props.selectedRowsArr.length !== 1
})

const changeFilterFn = () => {
  changeTaskValue(selectValue.value, selectStrValue.value, searchValue.value)
  emits('changeFilterFn', selectValue.value, selectStrValue.value, searchValue.value)
}
const clear = () => {
  selectValue.value = ''
  selectStrValue.value = []
  searchValue.value = ''
  changeFilterFn()
}
const onExport = async () => {
  let row = props.selectedRowsArr[0]
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
defineExpose({
  changeFilterFn,
})
</script>

<style lang="scss">
.btn-edit-box {
  position: relative;
  width: 100%;
  padding: 24px 0 8px 18px;

  .btn-box-1 {
    .link-box {
      width: 20%;
    }

    .ant-btn {
      float: left;
    }

    .btn-more {
      float: left;
    }
  }

  .right-btn-box {
    position: absolute;
    top: 24px;
    right: 16px;
    width: calc(100% - 650px);

    .link-box {
      @mixin img-el {
        display: inline-block;
        flex: 1;
        width: 28px;
        height: 28px;
        margin-right: 16px;
      }

      position: absolute;
      top: 0;
      right: 240px;
      display: flex;
      width: 350px;

      .img-el-1 {
        @include img-el;

        background: url("../../../assets/image/task/common.png") no-repeat center;
        background-size: 100%;
      }

      .img-el-2 {
        @include img-el;

        background: url("../../../assets/image/task/link.png") no-repeat center;
        background-size: 100%;
      }

      .img-el-3 {
        @include img-el;

        background: url("../../../assets/image/task/break.png") no-repeat center;
        background-size: 100%;
      }
    }

    .operation-btn-box {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      overflow: auto;
      text-align: right;
      white-space: nowrap;

      .ant-btn-primary {
        display: inline-block;

        span {
          padding-left: 4px;
        }
      }

      .start-el {
        margin-left: 12px;
      }
    }
  }

  .btn-box {
    > div {
      float: left;
      margin-right: 12px;
    }
  }
}

.ant-popover {
  width: 140px;

  .ant-popover-inner-content {
    padding: 4px;
  }

  .btn-list-box {
    width: 100%;

    li {
      width: 100%;
      padding-left: 12px;
      margin-bottom: 8px;
      font-size: 14px;
      line-height: 30px;
      color: rgb(0 0 0 / 50%);
      cursor: pointer;
      background: #fff;

      &:hover {
        background: $bg-line;
        border-right: 1px solid #5c6cc0;
      }
    }
  }
}
</style>
