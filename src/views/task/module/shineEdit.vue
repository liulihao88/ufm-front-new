<template>
  <div class="btn-top-box">
    <p class="tips-box">
      <ExclamationCircleOutlined />
      左右映射请勿配置一样，否则将不生效！
    </p>
    <u-button icon="add-btn" type="" @click="handleAdd">添加映射</u-button>
    <u-button icon="guanbi" type="" style="margin-left: 16px" @click="clearFn">清空</u-button>
  </div>
  <a-table
    v-b-controlHeight
    bordered
    :data-source="dataSource"
    :sticky="true"
    :columns="columnsShine"
    :pagination="false"
    size="small"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'index'">
        <div class="editable-cell">
          {{ record.key - 0 + 1 }}
        </div>
      </template>
      <template v-if="column.dataIndex === 'leftSpace'">
        <div class="editable-cell">
          <a-form-item label="连接" name="leftlink" class="top-el">
            <o-select
              ref="leftSelectRef"
              v-model="record.left.linkVal"
              width="90%"
              class="h-100%"
              :clearable="false"
              :options="linkData"
              placeholder="请选择左侧连接"
              @changeSelect="configSelectFnLeft1(column, record, $event)"
            />
          </a-form-item>
          <a-form-item label="系统空间：" name="leftspace" class="right-el">
            <el-select v-model="record.left.spaceVal" :disabled="!record.left.linkVal">
              <el-option v-for="(v, i) in record.left.spaceData" :key="i" :value="v.value" :disabled="!v.available">
                <o-tooltip
                  :content="`系统空间[${v.label}]不可用，请检查主机是否可访问，并确保用户名/密码正确，同时确保系统空间存在`"
                  :disabled="v.available"
                >
                  {{ v.label }}
                </o-tooltip>
              </el-option>
            </el-select>
          </a-form-item>
        </div>
      </template>
      <template v-if="column.dataIndex === 'leftPath'">
        <a-input v-model:value="record.left.path" placeholder="请输入左侧路径" class="path-el" />
      </template>
      <template v-if="column.dataIndex === 'rightSpace'">
        <div class="editable-cell">
          <a-form-item label="连接" name="rightlink" class="top-el">
            <o-select
              ref="rightSelectRef"
              v-model="record.right.linkVal"
              width="90%"
              :clearable="false"
              :options="linkData"
              placeholder="请选择右侧连接"
              @changeSelect="configSelectFnRight1(column, record, $event)"
            />
          </a-form-item>
          <a-form-item label="系统空间：" name="rightspace" class="right-el">
            <el-select v-model="record.right.spaceVal" :disabled="!record.right.linkVal" class="w-90%">
              <el-option v-for="(v, i) in record.right.spaceData" :key="i" :value="v.value" :disabled="!v.available">
                <o-tooltip
                  :content="`系统空间[${v.label}]不可用，请检查主机是否可访问，并确保用户名/密码正确，同时确保系统空间存在`"
                  :disabled="v.available"
                >
                  {{ v.label }}
                </o-tooltip>
              </el-option>
            </el-select>
          </a-form-item>
        </div>
      </template>

      <template v-if="column.dataIndex === 'rightPath'">
        <a-input v-model:value="record.right.path" placeholder="请输入右侧路径" class="path-el" />
      </template>

      <template v-else-if="column.dataIndex === 'operation'">
        <div @click="onDelete(record)">
          <a>删除</a>
        </div>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { computed, ref, defineExpose, watch, getCurrentInstance, nextTick, onMounted } from 'vue'
import { cloneDeep } from 'lodash-es'
import { spaceQueryListAPINew } from '@/server/API/file.ts'
import { columnsShine } from '../js/textCommon.ts'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  isNew: {
    type: Boolean,
    default: false,
  },
  mapConfigs: {
    type: Array,
    default: () => [],
  },
  isConfigChange: {
    type: Boolean,
  },
})
const leftSelectRef = ref(null)
const rightSelectRef = ref(null)
const { proxy } = getCurrentInstance()
const dataSource = ref([])
const clearFn = () => {
  dataSource.value = []
}
const linkData = ref([])
init()
async function init() {
  let data = await proxy.request({
    url: `/task/public/${proxy.getStorage('nodeId')}/entries`,
  })
  linkData.value = []
  data.forEach((element) => {
    let obj = {
      value: element.id,
      label: element.name,
    }
    linkData.value.push(obj)
  })
}

const querySpaceDataFn = async (id, type, recordKey) => {
  let { res, err } = await proxy.asyncWrapper(spaceQueryListAPINew, id)
  let data = res || []
  let arr = []
  data.forEach((v) => {
    let obj = {
      value: v.name,
      label: v.name,
      available: v.available,
    }
    arr.push(obj)
  })
  dataSource.value.map((el, idx) => {
    if (el[type].linkVal === id && recordKey === idx) {
      el[type].spaceData = arr
      el[type].spaceVal = ''
    }
  })
}
watch(
  () => props.mapConfigs,
  (val) => {
    if (!props.isConfigChange) _handleMapConfigs()
  },
)

onMounted(() => {
  if (props.isNew) {
    clearFn()
  }
})

async function _handleMapConfigs() {
  dataSource.value = []
  if (props.mapConfigs?.length > 0) {
    props.mapConfigs.forEach(async (item, index) => {
      let newData = {
        key: index,
        left: {
          path: item.leftPath,
          linkVal: item.leftEntryConfId,
          spaceVal: item.leftSystemSpace,
          spaceData: [],
        },
        right: {
          path: item.rightPath,
          linkVal: item.rightEntryConfId,
          spaceVal: item.rightSystemSpace,
          spaceData: [],
        },
      }
      let { res: leftRes, err } = await proxy.asyncWrapper(spaceQueryListAPINew, item.leftEntryConfId)
      let leftData = leftRes || []
      newData.left.spaceData = leftData.map((v) => {
        return {
          value: v.name,
          label: v.name,
          available: v.available,
        }
      })
      let { res: rightRes, err2 } = await proxy.asyncWrapper(spaceQueryListAPINew, item.rightEntryConfId)
      let rightData = rightRes || []
      newData.right.spaceData = rightData.map((v) => {
        return {
          value: v.name,
          label: v.name,
          available: v.available,
        }
      })
      dataSource.value.push(newData)
    })
  }
}
const count: any = computed(() => dataSource.value.length + 1)
const editableData: any = ref<any>(dataSource.value)

const edit = (key: string) => {
  editableData[key] = cloneDeep(dataSource.value.filter((item: any) => key === item.key)[0])
}
const configSelectFnLeft1 = (column, record, value) => {
  dataSource.value[record.key].left.spaceVal = ''
  dataSource.value[record.key].left.spaceData = []
  querySpaceDataFn(value, 'left', record.key)
}
const configSelectFnRight1 = (column, record, value) => {
  dataSource.value[record.key].right.spaceVal = ''
  dataSource.value[record.key].right.spaceData = []
  querySpaceDataFn(value, 'right', record.key)
}

const onDelete = (key: string) => {
  dataSource.value.splice(key.key, 1)
  dataSource.value.forEach((item: object, index: number) => {
    item.key = index
  })
}
const handleAdd = async () => {
  let newData = {
    key: dataSource.value.length,
    left: {
      path: '',
      linkVal: '',
      spaceVal: '',
    },
    right: {
      path: '',
      linkVal: '',
      spaceVal: '',
    },
  }

  dataSource.value.push(newData)
  let localLinkValue = linkData.value[0]?.value ?? ''
  let localLinkValue2 = linkData.value[1]?.value ?? ''
  if (localLinkValue) {
    if (proxy.$dev) {
      newData.left.linkVal = localLinkValue
      newData.right.linkVal = localLinkValue2
      await proxy.sleep(200)
      leftSelectRef.value.$refs.selectRef.$emit('change', newData.left.linkVal)
      await proxy.sleep(200)
      rightSelectRef.value.$refs.selectRef.$emit('change', newData.right.linkVal)
      await proxy.sleep(200)
      dataSource.value[dataSource.value.length - 1].left.spaceVal =
        dataSource.value[dataSource.value.length - 1].left.spaceData?.[0]?.value ?? ''
      await proxy.sleep(200)
      dataSource.value[dataSource.value.length - 1].right.spaceVal =
        dataSource.value[dataSource.value.length - 1].right.spaceData?.[0]?.value ?? ''
    }
  }
}
const postDataFn = async () => {
  let cloneDataSource = proxy.clone(dataSource.value) ?? []
  let isDataSame = false
  let mapCloneDataSource = cloneDataSource.map((v) => {
    let obj = {
      leftEntryConfId: v.left.linkVal ?? '',
      leftPath: v.left.path,
      leftSystemSpace: v.left.spaceVal ?? '',
      rightEntryConfId: v.right.linkVal ?? '',
      rightPath: v.right.path,
      rightSystemSpace: v.right.spaceVal ?? '',
    }
    if (obj.leftEntryConfId === obj.rightEntryConfId && obj.leftSystemSpace === obj.rightSystemSpace) {
      isDataSame = true
    }
    return obj
  })

  return new Promise((resolve, reject) => {
    if (isDataSame) {
      proxy.$toast('映射配置中左侧数据空间和右侧数据空间配置不能完全相同', 'e')
      return reject()
    } else {
      return resolve({
        mapConfigs: mapCloneDataSource,
      })
    }
  })
}
const resetFn = (key: string) => {
  dataSource.value.map((item: object, index: number) => {
    if (key.key == index + '') {
      item.left = {
        path: '',
        linkVal: undefined,
        spaceVal: undefined,
      }
      item.right = {
        path: '',
        linkVal: undefined,
        spaceVal: undefined,
      }
    }
  })
}
const reflushFn = () => {}
const customLabel = (item) => {
  if (item.available) {
    return item.label
  }
  return `${item.label} 系统空间[${item.label}]不可用，请检查主机是否可访问，并确保用户名/密码正确，同时确保系统空间存在`
}

watch(
  dataSource,
  (val) => {
    proxy.$mitt.emit('taskData', val)
  },
  {
    immediate: true,
    deep: true,
  },
)

defineExpose({
  postDataFn,
})
</script>

<style lang="scss">
.editable-cell {
  display: flex;

  .ant-form-item {
    flex: 1;
    margin: 0;
  }

  .ant-form-item-label {
    text-align: left;
  }

  .right-el {
    .ant-form-item-label {
      width: 68px !important;
    }
  }

  .top-el {
    .ant-form-item-label {
      width: 42px !important;
    }
  }

  .ant-form-item-control {
    width: 100px !important;
  }
}

.path-el {
  padding-left: 12px !important;
  background: #fff !important;
  border: 1px solid #eee;
}
</style>
<style scoped lang="scss">
.btn-top-box {
  position: relative;
  width: 100%;
  padding-bottom: 12px;
  text-align: right;

  .tips-box {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 11px;
    color: #ccc;
  }
}

.seat-el {
  height: 32px;
}

.ant-table-wrapper {
  @include scrollbar-style;

  padding-bottom: 300px;
  overflow-y: auto;
}

.editable-cell {
  .top-el {
    padding-bottom: 4px;
  }
}

.operation-box {
  text-align: center;

  a {
    font-size: 12px;
    color: $bg-color;

    &:hover {
      color: $bg-btn-2;
    }

    &.reflush-el {
      position: relative;
      padding-left: 15px;

      &::after {
        position: absolute;
        top: 3px;
        left: 7px;
        width: 1px;
        height: 11px;
        content: '';
        background: rgb(112 131 237 / 40%);
      }
    }
  }
}
</style>
