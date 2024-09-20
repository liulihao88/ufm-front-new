<template>
  <div class="move-info-box">
    <!-- <el-button @click="$getData">查看迁移配置的值</el-button> -->
    <a-form :model="formState">
      <div class="config-middle-box">
        <div class="flex-el sp-el">
          <h5 class="line-title">复制配置</h5>
          <div class="config-box config-el">
            <a-form-item v-for="(item, index) in copyConfig" :key="index" labelAlign="left">
              <template #label>
                <o-tooltip :content="parseLabel(item)" />
              </template>
              <a-select v-if="item.type === 'select'" v-model:value="item.value" :options="item.options" />
              <a-switch v-else v-model:checked="item.value" size="small" />
            </a-form-item>
            <i class="line-el" />
            <a-form-item label="复制顺序" labelAlign="left" class="copy-sort">
              <a-cascader
                v-model:value="CascaderPropsoptionsVal"
                :options="CascaderPropsoptions"
                placeholder="请选择复制顺序/优先级"
                style="width: 200px !important"
              />
            </a-form-item>
          </div>
        </div>

        <div class="flex-el">
          <h5 class="line-title">缓冲配置</h5>
          <div class="buffer-box config-box">
            <div v-for="(item, index) in bufferData" :key="index" class="ufm-number-box">
              <h5 class="line-title">{{ item.lable }}</h5>
              <a-form :model="formState">
                <template v-for="(val, idx) in item.children" :key="idx">
                  <a-form-item>
                    <template #label>
                      <o-tooltip :content="parseLabel(val)" />
                    </template>
                    <a-row>
                      <a-col :span="2">
                        <a-input-number
                          v-model:value="val.value"
                          :min="1"
                          :max="5000"
                          style="margin-left: 16px"
                          :disabled="isBack && item.disabled"
                        />
                      </a-col>
                      <a-col :span="22">
                        <a-slider v-model:value="val.value" :min="1" :max="5000" :disabled="isBack && item.disabled" />
                      </a-col>
                    </a-row>
                  </a-form-item>
                </template>
              </a-form>
            </div>
          </div>
        </div>
      </div>

      <div class="config-middle-box">
        <div class="flex-el sp-el padding-b-el">
          <h5 class="line-title">工作线程配置</h5>
          <div class="config-box">
            <a-form-item v-for="(item, index) in lineConfig" :key="index" labelAlign="left">
              <template #label>
                <o-tooltip :content="parseLabel(item)" />
              </template>
              <a-input-number
                v-if="item.type === 'number'"
                v-model:value="item.value"
                :min="1"
                :max="1000000000000000"
                :disabled="isBack && item.disabled"
              />
              <!-- <a-select v-model:value="item.value" :options="item.options" :disabled="isBack && item.disabled" v-else /> -->
              <o-select
                v-else
                v-model="item.value"
                class="po-r t--3"
                :options="item.options"
                :clearable="false"
                :disabled="isBack && item.disabled"
                width="100"
              />
            </a-form-item>
          </div>
        </div>
        <div class="flex-el">
          <h5 class="line-title sp-el">一体化加速</h5>
          <div class="config-box config-box-2">
            <a-form-item v-for="(item, index) in speedConfig" :key="index" labelAlign="left">
              <template #label>
                <o-tooltip :content="parseLabel(item)" />
              </template>
              <a-select
                v-if="item.type === 'select'"
                v-model:value="item.value"
                :options="item.options"
                :disabled="parseDisabled(item, speedConfig)"
              />
              <a-input-number
                v-if="item.type === 'number'"
                v-model:value="item.value"
                :min="1"
                :max="item.max"
                style="width: 200px"
                :disabled="parseDisabled(item, speedConfig)"
              />
            </a-form-item>
          </div>
        </div>
      </div>

      <div class="config-middle-box">
        <div class="flex-el sp-el">
          <h5 class="line-title sp-el">删除配置</h5>
          <div class="config-box">
            <a-form-item v-for="(item, index) in delConfig" :key="index" labelAlign="left">
              <template #label>
                <o-tooltip :content="parseLabel(item)" />
              </template>
              <a-select
                v-if="item.type === 'select'"
                v-model:value="item.value"
                :options="item.options"
                :disabled="isBack"
              />
              <a-switch v-else v-model:checked="item.value" size="small" :disabled="isBack" />
            </a-form-item>
          </div>
        </div>
        <div class="flex-el">
          <h5 class="line-title sp-el">分片传输</h5>
          <div class="config-box">
            <a-form-item v-for="(item, index) in transformConfig" :key="index" labelAlign="left">
              <template #label>
                <o-tooltip :content="parseLabel(item)" />
              </template>
              <a-select v-if="item.type === 'select'" v-model:value="item.value" :options="item.options" />
              <a-input-number
                v-if="item.type === 'number'"
                v-model:value="item.value"
                :min="1"
                :max="item.max || 1000000000"
                style="width: 200px"
                :disabled="parseTransformDisabled(item, transformConfig)"
              />
            </a-form-item>
          </div>
        </div>
      </div>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, reactive, toRaw, ref, defineExpose, computed, watch, getCurrentInstance } from 'vue'
import {
  copyConfig as baseCopyConfig,
  copyConfig2 as baseCopyConfig2,
  lineConfig as baseLineConfig,
  speedConfig as baseSpeedConfig,
  delConfig as baseDelConfig,
  CascaderPropsoptions as baseCascaderPropsoptions,
  transformConfig as baseTransformConfig,
} from '../js/textCommon.ts'
const { proxy } = getCurrentInstance()
const copyConfig = ref(proxy.clone(baseCopyConfig.value))
const copyConfig2 = ref(proxy.clone(baseCopyConfig2.value))
const lineConfig = ref(proxy.clone(baseLineConfig.value))
const speedConfig = ref(proxy.clone(baseSpeedConfig.value))
const delConfig = ref(proxy.clone(baseDelConfig.value))
const CascaderPropsoptions = ref(proxy.clone(baseCascaderPropsoptions))
const transformConfig = ref(proxy.clone(baseTransformConfig.value))

const formState = ref({})
const bufferData = ref([
  {
    number: 1,
    lable: '复制缓冲区',
    children: [
      { label: '最大宽带', value: 100, name: 'copyMaxBandWidth' },
      { label: '渠道容量', value: 1000, name: 'copyChannelCapacity' },
    ],
  },
  {
    number: 1,
    lable: '删除文件缓冲区',
    disabled: true,
    children: [
      { label: '最大宽带', value: 100, name: 'delFileMaxBandWidth' },
      { label: '渠道容量', value: 1000, name: 'delFileChannelCapacity' },
    ],
  },
  {
    number: 1,
    lable: '删除目录缓冲区',
    disabled: true,
    children: [
      { label: '最大宽带', value: 100, name: 'delDirMaxBandWidth' },
      { label: '渠道容量', value: 1000, name: 'delDirChannelCapacity' },
    ],
  },
])

const props = defineProps({
  isNew: {
    type: Boolean,
    default: false,
  },
  taskEditData: {
    type: Object,
    default: null,
  },
})

watch(
  speedConfig.value,
  (val) => {
    if (val[0].value === 'Normal') {
      speedConfig.value[1].label = '独立传输每个文件'
    } else if (val[0].value === 'Flash') {
      speedConfig.value[1].label = '通过(FITAS)技术大幅提升小文件传输效率（仅限目标端为oeos存储）'
    } else if (val[0].value === 'Pack') {
      speedConfig.value[1].label = '以单独文件形式合并文件存储；压缩率'
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

watch(
  () => props.taskEditData,
  (val) => {
    copyConfig.value = proxy.clone(baseCopyConfig.value)
    copyConfig2.value = proxy.clone(baseCopyConfig2.value)
    lineConfig.value = proxy.clone(baseLineConfig.value)
    speedConfig.value = proxy.clone(baseSpeedConfig.value)
    delConfig.value = proxy.clone(baseDelConfig.value)
    CascaderPropsoptions.value = proxy.clone(baseCascaderPropsoptions)
    transformConfig.value = proxy.clone(baseTransformConfig.value)
    if (!props.isNew && proxy.notEmpty(val.migrationConf)) {
      editPropsValue(copyConfig.value)
      editPropsValue(copyConfig2.value)
      editPropsValue(lineConfig.value)
      editPropsValue(speedConfig.value)
      editPropsValue(delConfig.value)
      editPropsValue(transformConfig.value)
      editBufferData()
      if (val.migrationConf.fileCopyOrder) {
        CascaderPropsoptionsVal.value = [val.migrationConf.fileCopyOrder, val.migrationConf.priority]
      }
    }
  },
  {
    immediate: true,
  },
)

const CascaderPropsoptionsVal = ref([])
const isBack = computed(() => {
  return props.taskEditData.type === 'BACKUP'
})
const parseLabel = (item) => {
  if (proxy.$dev) {
    return `${item.label}(${item.name})`
  }
  return item.label
}

function editBufferData() {
  let target = props.taskEditData.migrationConf
  bufferData.value = bufferData.value.map((v) => {
    v.children = v.children.map((val) => {
      if (val.name in target) {
        val.value = target[val.name]
      }
      return val
    })
    return v
  })
}
function editPropsValue(refObj) {
  let target = props.taskEditData.migrationConf
  refObj = refObj.map((v) => {
    if (v.name in target) {
      v.value = target[v.name]
    }
  })
}
function parseDisabled(item, obj) {
  if (item.name === 'compressLevel') {
    if (obj[0].value === 'Pack') {
      return false
    } else {
      return true
    }
  }
  if (
    item.name === 'maximumPackageSize' ||
    item.name === 'maximumPackableFileSize' ||
    item.name === 'maximumFilePackageCount'
  ) {
    if (obj[0].value === 'Normal') {
      return true
    } else {
      return false
    }
  }
  return false
}

function parseTransformDisabled(item, obj) {
  if (obj[0].value === 'on') {
    return false
  }
  return true
}

function $getData() {
  let mergeDatas = [].concat(
    copyConfig.value,
    copyConfig2.value,
    lineConfig.value,
    speedConfig.value,
    delConfig.value,
    transformConfig.value,
  )
  let transToObject = {}
  mergeDatas.forEach((v) => {
    if (v.name) {
      transToObject[v.name] = v.value
    }
  })

  bufferData.value.forEach((v) => {
    v.children.forEach((val) => {
      transToObject[val.name] = val.value
    })
  })
  if (CascaderPropsoptionsVal.value) {
    transToObject.fileCopyOrder = CascaderPropsoptionsVal.value[0]
    transToObject.priority = CascaderPropsoptionsVal.value[1]
  }

  return { migrationConf: transToObject }
}
defineExpose({
  $getData,
})
</script>
<style lang="scss">
$silderHeight: 8px;

.move-info-box {
  @include scrollbar-style;

  height: calc(100vh - 280px);
  padding: 10px 0 100px !important;
  overflow-y: auto;
  font-size: $fontSize1;

  .config-middle-box {
    display: flex;
    padding-top: 16px;

    .padding-b-el {
      .config-box {
        padding-bottom: 41px;
      }
    }

    .ant-select-selection-item {
      text-align: left;
    }

    .line-el {
      display: block;
      width: 100%;
      height: 1px;
      background: rgb(0 0 0 / 15%);
    }

    .flex-el {
      flex: 1;

      &.sp-el {
        margin-right: 16px;
      }

      .line-title {
        padding-bottom: 8px;

        &.sp-el {
          //   padding-top: 8px;
        }
      }
    }

    .ant-form-item {
      display: flex;
      height: 21px;
      margin-bottom: 20px;

      .ant-col {
        flex: 1;

        .ant-form-item-control-input-content {
          height: 21px;
          text-align: right;
        }

        .ant-select {
          width: 100px;
          margin-top: -8px;
          border: 1px solid rgb(216 217 230);
          border-radius: 4px;
        }

        .ant-input-number {
          width: 100px !important;
          margin-top: -8px;
          border: 1px solid rgb(216 217 230);
          border-radius: 4px;

          .ant-input-number-input {
            background: #fff !important;
          }
        }
      }
    }
  }

  .config-box {
    height: calc(100% - 30px);
    padding: 16px 16px 0;
    background: #f5f7fa;
    border: 1px solid #eeeffd;
    border-radius: 4px;

    .copy-sort {
      padding: 34px 0;

      .ant-select {
        width: 130px !important;
      }
    }

    &.buffer-box {
      width: 100%;

      .ant-form-item {
        // height: 50px;
      }

      .ufm-number-box {
        height: 125px;

        .ant-form-item-label {
          flex: 1;
          text-align: left;
        }

        .ant-form-item-control {
          flex: 5.5;
        }

        .ant-col-22 {
          position: relative;
          margin-left: 80px;

          .ant-slider {
            top: -8px;
          }
        }
      }
    }

    .line-title {
      padding-bottom: 19px;
      color: rgb(0 0 0 / 65%);
      opacity: 0.65;
    }

    .ant-switch-small {
      margin-top: -4px;
    }

    .ant-slider-handle {
      top: -2px;
      width: 20px;
      height: 32px;
      background: url("../../../assets/image/task/silder.png") no-repeat center;
      background-size: 100%;
      border: none;
      border-radius: 0;
    }

    .ant-input-number-input {
      background: $bg-line;
    }

    .ant-input-number-out-of-range input {
      color: #333;
    }

    .ant-slider-step,
    .ant-slider-track,
    .ant-slider-rail {
      height: $silderHeight;
    }

    .ant-slider-track {
      background: $bg-color;
    }

    .ant-slider-rail {
      background: #dcdfe4;
      box-shadow: 0 2px 4px 0 #0000004d;
      opacity: 0.3;
    }
  }

  .move-config-title {
    height: 21px;
  }

  .ant-form-item {
    margin-bottom: 10px;
    line-height: 21px;
  }

  .ant-form-item-label {
    height: 21px;

    label {
      height: 21px;
      line-height: 21px;
    }
  }

  .ant-slider-rail {
    background: rgb(220 223 228);
  }
}
</style>
