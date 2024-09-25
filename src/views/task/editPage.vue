<script setup lang="ts">
import { ref, getCurrentInstance, computed, watch } from 'vue'
const { proxy } = getCurrentInstance()
import ShineEdit from './module/shineEdit.vue'
import MigrationConfig from './module/migrationConfig.vue'
import DiscoverConfig from './module/discoverConfig.vue'
import workConfig from './module/workConfig.vue'
import { useDetail } from './hooks'

import { useRoute } from 'vue-router'
const route = useRoute()

import metaData from './module/metaDataComps/metaData.vue'
import { getDs, getTaskDetails, previewChange, saveTaskPublic } from '@/server/editApi.js'

defineOptions({
  name: 'Edit',
})

const { toDetail, router } = useDetail()

const nodeId = ref()
const gScriptRef = ref(null)
const workConfigRef = ref(null)
const metaDataRef = ref(null)
const ShineConfigEl = ref(null)
const MoveConfigRef = ref(null)
const DiscoverRef = ref(null)
const isKeep = ref(true)
nodeId.value = proxy.getStorage('nodeId')
const taskId = ref('')
let id = route.query.id
const isNew = ref(true)
const isRestore = ref(false)
const selectItemName = ref('新建任务')
if (id) {
  taskId.value = id
  isNew.value = false
  getTaskDetailsFn()
  if (route.query.type === 'restore') {
    isRestore.value = true
    selectItemName.value = '恢复任务'
  } else {
    isRestore.value = false
    selectItemName.value = '编辑任务'
  }
}
const formRef = ref(null)

const typeOptions = [
  { label: '同步', value: 'SYNC' },
  { label: '备份', value: 'BACKUP' },
]
const previewOptions = [
  { label: '标准模式', value: 'STANDARD' },
  { label: '专家模式', value: 'EXPERT' },
]
const metaOptions = ref([])
const isConfigChange = ref(false)

const form = ref({
  metaSpace: '',
  previewType: previewOptions[0].value,
  type: typeOptions[1].value,
  enableMetaDataInject: false,
  mapConfigs: [],
  owner: nodeId.value,
  periodInHour: 1,
  discoverConf: {
    enableActiveFolderAndPriorityCheck: true,
    enableAutoCheckDel: false,
    enableFullScan: true,
    enableSourceFolderMonitor: '',
    enableSourceFolderSearch: true,
    folderPath: '',
    includeSubFolder: true,
    monitorFolder: '',
    triggerCron: '',
  },
})
const rules = {
  name: [proxy.validate()],
  metaSpace: [proxy.validate('请选择')],
}

const navList = computed(() => {
  let restoreTabs = [
    {
      label: '映射配置',
      value: '1',
    },
    {
      label: '迁移配置',
      value: '2',
    },
  ]
  let otherTabs = [
    {
      label: '发现配置',
      value: '3',
    },
    {
      label: '管理配置',
      value: '4',
    },
    {
      label: '清理配置',
      value: '5',
    },
    {
      label: '元数据提取',
      value: '6',
    },
    {
      label: '工作配置',
      value: '7',
    },
  ]
  if (isRestore.value) {
    return restoreTabs
  } else {
    return restoreTabs.concat(otherTabs)
  }
})

const tabsIndex = ref(proxy.getStorage('tabsIndex') ?? '1')

const isStandard = computed(() => {
  return form.value.previewType === 'STANDARD'
})
watch(isKeep, (newVal) => {
  if (newVal) {
    if (form.value.periodInHour === 0) {
      form.value.periodInHour = 1
    }
  }
})
watch(
  tabsIndex,
  (val) => {
    proxy.setStorage('tabsIndex', val)
  },
  {
    deep: true,
    immediate: true,
  },
)

function closeFn() {
  router.push({ name: 'Public' })
}
const save = async () => {
  await proxy.validForm(formRef.value)
  // proxy.$toast('校验成功')
  let mergeForm = await getFormValue()
  if (isRestore.value) {
    delete mergeForm.id
  }
  console.log(`32 mergeForm`, mergeForm)
  if (mergeForm.type === 'SYNC' && proxy.isEmpty(mergeForm.discoverConf.triggerCron)) {
    return proxy.$toast('同步模式下不允许设置发现配置的触发周期为单次, 请修改后提交', 'e')
  }
  let res = await saveTaskPublic(mergeForm)
  proxy.$toast('保存成功')
  toDetail({ id: res, name: mergeForm.name }, 'replace')
}
async function getFormValue() {
  let mapConfigsData = (await ShineConfigEl.value.postDataFn()) ?? {}
  let workConfigData = (await workConfigRef?.value?.$getData()) ?? {}
  let moveConfigData = MoveConfigRef.value.$getData()
  let discoverData = (await DiscoverRef?.value?.postDataFn()) ?? {}
  let metaDataData = await metaDataRef.value?.$getData()
  const mergeForm = Object.assign(
    {},
    form.value,
    mapConfigsData,
    moveConfigData,
    discoverData,
    workConfigData,
    metaDataData,
  )
  mergeForm.script = gScriptRef.value.scriptValue
  if (!isKeep.value) {
    mergeForm.periodInHour = 0
  }
  return mergeForm
}
const init = async () => {
  let res = await getDs()
  metaOptions.value = res
  if (proxy.$dev) {
    form.value.metaSpace = metaOptions.value?.[0]?.id
  }
}

function devTest() {
  if (proxy.$dev) {
    form.value.name = proxy.uuid(`andy-${proxy.formatTime(new Date(), '{m}-{d} {h}:{i}-')}`)
  }
}
devTest()
init()

async function getTaskDetailsFn() {
  let res = await getTaskDetails(nodeId.value, taskId.value)
  if (isRestore.value) {
    let reverseMapConfigsRes = res.mapConfigs.map((v) => {
      let newObj = {
        leftEntryConfId: v.rightEntryConfId,
        leftSystemSpace: v.rightSystemSpace,
        leftPath: v.rightPath,
        rightEntryConfId: v.leftEntryConfId,
        rightSystemSpace: v.leftSystemSpace,
        rightPath: v.leftPath,
      }
      return newObj
    })
    res.mapConfigs = reverseMapConfigsRes
    form.value = res
    form.value.name = res.name + '-Restore'
  } else {
    form.value = res
  }
  isKeep.value = res.periodInHour > 0 ? true : false
}

const previewTypeChange = async (value) => {
  let mergeForm = await getFormValue()
  isConfigChange.value = true
  const copyForm = proxy.clone(mergeForm)
  copyForm.previewType = value === 'STANDARD' ? 'EXPERT' : 'STANDARD'

  // await proxy.asyncWrapper(previewChange, copyForm)
  const { res, err } = await proxy.asyncWrapper(previewChange, copyForm)
  if (err) {
    form.value.previewType = copyForm.previewType
    return
  }
  form.value = res
}
</script>

<template>
  <div>
    <div class="p-24">
      <div class="top f-bt">
        <el-form ref="formRef" :model="form" :rules="rules" :inline="true">
          <el-form-item label="任务名" prop="name">
            <o-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="所有者">
            <div>{{ nodeId }}</div>
          </el-form-item>
          <el-form-item label="预览配置" prop="previewType">
            <o-select
              v-model="form.previewType"
              :options="previewOptions"
              :clearable="false"
              @change="previewTypeChange"
            />
          </el-form-item>
          <el-form-item v-if="isStandard" label="元数据空间" prop="metaSpace">
            <o-select v-model="form.metaSpace" :options="metaOptions" value="id" label="name" :clearable="false" />
          </el-form-item>
          <el-form-item v-if="isStandard" label="模式" prop="type">
            <o-select v-model="form.type" :options="typeOptions" :clearable="false" />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="save">{{ isNew ? '保存' : '更新' }}</el-button>
      </div>

      <div class="nav">
        <o-tabs v-show="isStandard" v-model="tabsIndex" :options="navList">
          <template #1>
            <ShineEdit
              ref="ShineConfigEl"
              :isConfigChange="isConfigChange"
              :mapConfigs="form.mapConfigs"
              :isNew="isNew"
            />
          </template>
          <template #2>
            <MigrationConfig ref="MoveConfigRef" :taskEditData="form" :isNew="isNew" />
          </template>
          <template #3>
            <DiscoverConfig ref="DiscoverRef" :isNew="isNew" :discoverConf="form.discoverConf" :modelType="form.type" />
          </template>
          <template #4>
            <div class="f">
              <g-switch v-model="form.enableMetaDataInject" disabled active-text="开启管理控制1" />
            </div>
          </template>
          <template #5>
            <div class="info-box f">
              <g-switch v-model="isKeep" active-text="设置清理" />
              <div class="hour-box">
                <o-input v-model="form.periodInHour" v-number :min="0" :disabled="!isKeep" width="100" />
                <span class="m-l-8">
                  {{ `小时 ( 每 ${form.periodInHour} 小时将保持元数据同步，清理目标元数据 [不清理文件] )` }}
                </span>
              </div>
            </div>
          </template>
          <template #6>
            <metaData ref="metaDataRef" :taskEditData="form" />
          </template>
          <template #7>
            <workConfig ref="workConfigRef" :taskEditData="form" />
          </template>
        </o-tabs>

        <div v-show="!isStandard" class="">
          <g-script ref="gScriptRef" :value="form.script" />
        </div>
      </div>
    </div>
  </div>
</template>
