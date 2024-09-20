<template>
  <div class="discover-box">
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <div class="title-box flex-box">
        <h5>扫描配置</h5>
      </div>
      <div class="config-info">
        <div class="list-config flex-box">
          <h6 class="title-el">目录</h6>
          <div class="flex-grow-el">
            <a-textarea v-model:value="formState.folderPath" :disabled="true" />
            <a-checkbox-group v-model:value="formState.checkArr" :disabled="!isActive" @change="checkType">
              <a-checkbox value="1" name="type">在此目录全量扫描</a-checkbox>
              <a-checkbox value="2" name="type">包含子目录</a-checkbox>
              <a-checkbox value="3" name="type">自动检测删除</a-checkbox>
              <a-checkbox value="4" name="type" disabled>开启活跃目录检测与优先级检测</a-checkbox>
            </a-checkbox-group>
          </div>
        </div>
        <div class="list-config flex-box">
          <h6 class="title-el">触发周期</h6>
          <div class="flex-grow-el">
            <o-select
              v-model="timeValue"
              width="240"
              :options="timeConfigData"
              :clearable="false"
              @change="getTimeValFn"
            />
            <div class="cycleVal-box">
              <div v-if="timeValue === 'min'">
                每
                <a-input-number v-model:value="formState.minute" :min="1" :max="59" @change="changeMinFn" />
                分钟
              </div>
              <div v-if="timeValue === 'hour'">
                每
                <a-input-number v-model:value="formState.hour" :min="1" :max="23" @change="changeHourFn" />
                小时
              </div>
              <div v-if="timeValue === 'week'">
                <h6 class="title-el">周配置</h6>
                <o-select
                  v-model="weekValue"
                  :options="options"
                  multiple
                  width="600"
                  placeholder="请选择周配置"
                  @change="handleChange"
                />
                <h6 class="title-el title-el-2">时间配置</h6>
                <a-time-picker v-model:value="valueTime" format="HH:mm" :allowClear="false" @change="timeChangeFn" />
              </div>
              <div v-if="timeValue === 'only'">仅执行一次，不会周期性执行</div>
            </div>
          </div>
        </div>
      </div>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineExpose, getCurrentInstance, watch, onUnmounted } from 'vue'
import dayjs from 'dayjs'
const { proxy } = getCurrentInstance()

const props = defineProps({
  isNew: {
    type: Boolean,
    default: false,
  },
  discoverConf: {
    type: Object,
    default: null,
  },
  modelType: {
    type: String,
  },
})
const timeValue = ref('min')
const weekValue = ref([])
const valueTime = ref(dayjs('08:00:00', 'HH:mm:ss'))

let weekRecodeDate: object = {
  hour: '8',
  min: '0',
  week: '',
}
const triggerCroShow = ref(null)
const checkType = (val) => {}
const isActive = ref<boolean>(true)
const isActiveM = ref<boolean>(false)
const formState = ref({
  isSearch: true,
  folderPath: '',
  checkArr: [],
  minute: 1,
  hour: 1,
  weekArr: [],
  isMonitor: false,
  monitorinfo: '',
  monitorCatalog: [],
})

proxy.$mitt.on('taskData', (taskDataValue) => {
  let mapValue = taskDataValue.map((v) => {
    let path = v.left.path ?? '*'
    return `${v.left.spaceVal}:${path}`
  })
  let joinValue = mapValue.join(', ')
  formState.value.folderPath = joinValue
})

watch(
  () => props.discoverConf,
  (val) => {
    let data = props.discoverConf
    if (proxy.notEmpty(data)) {
      formState.value.isSearch = data.enableSourceFolderSearch
      formState.value.isMonitor = data.enableSourceFolderSearch ? false : true
      formState.value.checkArr[2] = data.enableAutoCheckDel ? '3' : ''
      formState.value.checkArr[1] = data.includeSubFolder ? '2' : ''
      formState.value.checkArr[0] = data.enableFullScan ? '1' : ''
      formState.value.folderPath = data.folderPath
      formState.value.monitorinfo = data.monitorFolder
      triggerCroShow.value = data.triggerCron
      // null 这是单次
      // 0 0/23 * * * ? 这是分
      // * * 0/34 * * ? 这是时
      // 0 7 15 ? * 1,4,3 这是周
      if (proxy.isEmpty(data.triggerCron)) {
        timeValue.value = 'only'
        return false
      }
      let arr = data.triggerCron.split(' ')
      if (arr[1].startsWith('0/')) {
        timeValue.value = 'min'
        formState.value.minute = arr[1].split('/')[1]
      } else if (arr[2].startsWith('0/')) {
        timeValue.value = 'hour'
        formState.value.hour = arr[2].split('/')[1]
      } else {
        timeValue.value = 'week'
        weekValue.value = arr[arr.length - 2].split(',')
        weekRecodeDate.min = arr[1]
        weekRecodeDate.hour = arr[2]
        weekRecodeDate.week = arr[arr.length - 2]
        valueTime.value = dayjs(`${arr[2]}:${arr[1]}:00`, 'HH:mm:ss')
      }
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

watch(
  () => props.modelType,
  (val) => {
    proxy.$toast('提示: 修改模式会自动更改发现配置下目录的选择项', 'warning')
    if (val === 'SYNC') {
      formState.value.checkArr[2] = '3'
      formState.value.checkArr[1] = '2'
      formState.value.checkArr[0] = '1'
    } else {
      formState.value.checkArr[2] = ''
      formState.value.checkArr[1] = '2'
      formState.value.checkArr[0] = '1'
    }
  },
)

const openCatalogMFn = (val) => {
  if (val) {
    isActiveM.value = true
  } else {
    isActiveM.value = false
  }
}
const timeConfigData = ref([
  {
    value: 'min',
    label: '分钟',
  },
  {
    value: 'hour',
    label: '小时',
  },
  {
    value: 'week',
    label: '周',
  },
  {
    value: 'only',
    label: '单次',
  },
])

const getTimeValFn = (val) => {
  timeValue.value = val
  if (val === 'only') {
    triggerCroShow.value = null
  } else if (val === 'min') {
    formState.value.minute = 1
    changeMinFn(1)
  } else if (val === 'hour') {
    formState.value.hour = 1
    changeHourFn(1)
  } else {
    triggerCroShow.value = '0 0 8 ? * *'
  }
}

const weekCommonFn = () => {
  triggerCroShow.value = `0 ${weekRecodeDate.min} ${weekRecodeDate.hour} ? * ${weekRecodeDate.week} *`
}
const handleChange = (value) => {
  weekRecodeDate.week = value.join(',')
  weekCommonFn()
}
const timeChangeFn = () => {
  const _fn = (h, m) => {
    weekRecodeDate.hour = h
    weekRecodeDate.min = m
  }
  if (valueTime.value) {
    _fn(valueTime.value.$H, valueTime.value.$m)
  } else {
    _fn(0, 0)
  }
  weekCommonFn()
}

const options = ref([
  {
    value: '2',
    label: '星期一',
  },
  {
    value: '3',
    label: '星期二',
  },
  {
    value: '4',
    label: '星期三',
  },
  {
    value: '5',
    label: '星期四',
  },
  {
    value: '6',
    label: '星期五',
  },
  {
    value: '7',
    label: '星期六',
  },
  {
    value: '1',
    label: '星期日',
  },
])

const postDataFn = async () => {
  let enableAutoCheckDel = false
  let enableFullScan = false
  let includeSubFolder = false
  formState.value.checkArr.forEach((item) => {
    if (item === '3') {
      enableAutoCheckDel = true
    }
    if (item === '1') {
      enableFullScan = true
    }
    if (item === '2') {
      includeSubFolder = true
    }
  })

  let discoverConf: object = {
    enableActiveFolderAndPriorityCheck: false,
    enableAutoCheckDel: enableAutoCheckDel,
    enableFullScan: enableFullScan,
    enableSourceFolderMonitor: formState.value.isMonitor,
    enableSourceFolderSearch: formState.value.isSearch,
    folderPath: formState.value.folderPath,
    includeSubFolder: includeSubFolder,
    monitorFolder: formState.value.monitorinfo,
    triggerCron: triggerCroShow.value,
  }
  return new Promise<void>((resolve, reject) => {
    if (timeValue.value === 'week' && proxy.isEmpty(weekValue.value)) {
      proxy.$toast('请至少选择一个周配置', 'e')
      reject()
    } else {
      resolve({ discoverConf })
    }
  })
}

const changeMinFn = (val: number) => {
  triggerCroShow.value = `0 0/${val} * 1/1 * ? *`
}
const changeHourFn = (val: number) => {
  triggerCroShow.value = `0 0 0/${val} 1/1 * ? *`
}
onUnmounted(() => {
  proxy.$mitt.off('taskData')
})
defineExpose({
  postDataFn,
})
</script>
<style lang="scss">
.list-config {
  .ant-picker {
    padding: 4px 6px;
  }

  .ant-select {
    width: 50%;
    border: 1px solid #dcdfe4;
    border-radius: 2px;
  }
}

.discover-box {
  .switch-el {
    margin-top: 3px;
  }
}
</style>
<style scoped lang="scss">
.discover-box {
  padding: 16px 6px 150px;

  .seat-el {
    padding-top: 25px;
  }

  .ant-form-horizontal {
    .title-box {
      padding-bottom: 11px;

      > h5 {
        font-family: PingFang;
        font-size: $fontSize1;
        color: #333;
      }

      h5,
      .ant-form-item {
        flex: 1;
      }

      .ant-form-item {
        text-align: right;
      }

      .open-list {
        h5 {
          padding-left: 7px;
        }
      }
    }
  }

  .config-info {
    width: 100%;
    background: #f5f7fa;
    border: 1px solid $bg-line;
    border-radius: 4px;
    opacity: 1;

    .list-config {
      padding: 15px;

      .cycleVal-box {
        padding: 12px;
        margin-top: 16px;
        background: #fff;
        border: 1px solid #dcdfe4;
        border-radius: 4px;

        .title-el {
          padding-bottom: 6px;
          font-size: 14px;

          &.title-el-2 {
            padding-top: 12px;
          }
        }
      }

      .title-el {
        width: 60px;
        margin-right: 17px;
        font-size: $fontSize1;
        color: $frontColor2;
      }

      .ant-input {
        border: 1px solid $bg-input-2;
      }

      .ant-checkbox-group {
        padding-top: 12px;
      }
    }
  }
}
</style>
