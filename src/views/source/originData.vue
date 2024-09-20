<template>
  <div>
    <div class="origin-common-enter">
      <div class="left-box layout-item">
        <h2 class="title-header title">数据源配置</h2>
        <ul class="list-box">
          <li v-for="(item, index) in fileDataList" :key="index" :class="item.isSelect ? 'active' : ''">
            <div @click="selectFeilFn(item, index)">
              <span v-if="item.fsid == 'HSP08398913'" class="iconfont icon-ufm-diannao1" style="font-size: 13px" />
              <span v-else class="iconfont icon-ufm-lianjieliu" />
              <div class="w-200 d-ib m-l-4">
                <o-tooltip :content="item.name" />
              </div>
            </div>
            <div class="op-btn-box">
              <span
                v-if="!item.isCopy"
                class="iconfont icon-ufm-shanchu1"
                style="font-size: 12px"
                @click="delListItemFn(item)"
              />
              <span v-else class="iconfont icon-ufm-shanchu1" style="font-size: 12px" @click="delCopyFn(item)" />

              <span class="f-line">|</span>
              <span
                v-if="!item.isCopy"
                class="iconfont icon-ufm-kelong"
                style="font-size: 12px"
                @click="copyListItemFn(item, index)"
              />
              <span v-else>
                <span @click="testConfigFn(item)">测试</span>
                <span v-if="isTestPass" @click="saveCopyFn(item)">保存克隆</span>
              </span>
            </div>
          </li>
        </ul>
        <div class="btn-box">
          <u-button type="ghost" icon="zengjiaxinjian" @click="newFileFn">新建</u-button>
        </div>
      </div>
      <div class="right-box layout-item right-file-box">
        <h2 class="title-header new-header">{{ leftTitle }}</h2>
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="设置">
            <setUpSource
              ref="setupSourceRef"
              :setUpTypeName="systemName"
              :isNew="isNew"
              :formState="queryData"
              @isTestPassFn="isTestPassFn"
              @getFormState="getFormState"
            />
          </a-tab-pane>
        </a-tabs>
        <div class="btn-box">
          <a-popover v-if="!isTestPass" title="">
            <template #content>
              <p>测试通过才能保存！</p>
            </template>
            <u-button type="ghost" :disabled="!isTestPass" icon="baocun1">保存</u-button>
          </a-popover>
          <u-button v-else type="ghost" icon="baocun1" @click="saveConfigFn">保存</u-button>
          <u-button type="ghost" style="margin-left: 12px" icon="icon_ceshi" @click="testConfigFn">测试</u-button>
        </div>
      </div>
    </div>
    <o-dialog ref="dialogRef" v-model="isVisible" title="提示" @confirm="handleBackFn" @cancel="cancelBackFn">
      {{ alertData }}
    </o-dialog>
  </div>
</template>
<script setup>
import { provide, reactive, ref, getCurrentInstance, computed } from 'vue'
import { setUpTypeData } from './js/data'
import setUpSource from './module/setUpSource.vue'
import {
  dsArrAPI,
  dsConfigDelInfoAPI,
  dsConfigTestInfoAPI,
  dsConfigInfoCheckAPI,
  dsConfigEditInfoAPI,
} from '@/server/API/source.ts'

const { proxy } = getCurrentInstance()

const isVisible = ref(false)
const setupSourceRef = ref(null)
const alertData = ref()
const currentId = ref('')
const isTestPass = ref(false)
const isTestPassFn = () => {
  isTestPass.value = false
}
const leftTitle = ref()
const initFn = async () => {
  let res = await dsArrAPI()
  isTestPassFn()
  let data = res
  fileDataList.value = []
  data.forEach((item, index) => {
    let obj = {
      name: '',
      value: '',
      icon: 'icon_1.png',
      index: index,
    }
    obj.name = item.name
    obj.value = item.id
    fileDataList.value.push(obj)
    fileDataList.value.forEach((item) => {
      item.isSelect = false
    })
  })
  if (fileDataList.value.length > 0) {
    let matchIndex = proxy.isEmpty(proxy.getStorage('ufmSourceName'))
      ? 0
      : fileDataList.value.findIndex((innerItem) => {
          return innerItem.name == proxy.getStorage('ufmSourceName')
        })
    if (matchIndex === -1) {
      matchIndex = 0
    }
    selectFeilFn(fileDataList.value[matchIndex], matchIndex)
  }
}
isTestPassFn()
initFn()
const infoData = ref({})
const fileDataList = ref()
const queryData = ref({})
const formDataAll = ref() //可以接口获取
formDataAll.value = {}
const pubSetDataFn = (obj) => {
  formDataAll.value = obj
  queryData.value = obj
  infoData.value = obj
}
//选择
const queryFn = async (el) => {
  let res = await dsConfigInfoCheckAPI(el.value)
  let obj = res ?? {}
  if (el.isCopy) {
    obj.isCopy = true
    obj.name = el.name
    obj.id = el.id ? el.id : ''
  }
  pubSetDataFn(obj)
}
const selectFeilFn = (el, index) => {
  recodeIndex = index
  leftTitle.value = el.name
  proxy.setStorage('ufmSourceName', el.name)
  fileDataList.value.forEach((item, i) => {
    item.isSelect = false
    if (i == index) {
      item.isSelect = true
      systemName.value = item.name
      systemValue.value = item.value
    }
  })
  queryFn(el)
  isTestPassFn()
}

const isNew = computed(() => {
  return leftTitle.value === '新建'
})

//新建
const newFileFn = () => {
  leftTitle.value = '新建'
  fileDataList.value.forEach((item) => {
    item.isSelect = false
  })
  pubSetDataFn({})
  isTestPassFn()
}

//删除
const delListItemFn = (item) => {
  isVisible.value = true
  alertData.value = `确认删除${item.name}？`
  currentId.value = item.value
  isTestPassFn()
}
const handleBackFn = async () => {
  isVisible.value = false
  await dsConfigDelInfoAPI(currentId.value)
  proxy.$toast('删除成功！')
  initFn()
}
const cancelBackFn = () => {
  isVisible.value = false
  isTestPassFn()
}
//克隆
const copyListItemFn = (item, index) => {
  recodeIndex = index + 1
  let obj = {
    ...item,
    isSelect: true,
    isCopy: true,
    index: fileDataList.value.length,
    id: '',
    copyid: item.id,
  }
  let num = 0
  let isHave = false
  fileDataList.value.forEach((el) => {
    el.isSelect = false
    if (obj.copyid == el.copyid) {
      num++
    }
    if (el.isCopy) {
      isHave = true
      return false
    }
  })
  if (isHave) {
    proxy.$toast('已有备份数据待编辑！', 'w')
    return false
  }
  obj.name = obj.name + num + 'copy'
  systemName.value = obj.name
  fileDataList.value.splice(index + 1, 0, obj)
  leftTitle.value = obj.name
  infoData.value = obj
  queryFn(obj)
  isTestPassFn()
}
const delCopyFn = (item) => {
  fileDataList.value.splice(item.index, 1)
  fileDataList.value.map((item, index) => {
    item.index = index
  })
  isTestPassFn()
}
const getFormState = (data) => {
  infoData.value = data
  isTestPassFn()
}

//测试
const testConfigFn = async () => {
  let res = await setupSourceRef.value.getData()
  infoData.value = res
  await dsConfigTestInfoAPI(infoData.value)
  proxy.$toast('测试成功！')
  isTestPass.value = true
}

let recodeIndex = 0
//保存
const saveConfigFn = async () => {
  let isPost = false

  let data = {
    id: '',
    ...infoData.value,
  }

  await dsConfigEditInfoAPI(data)
  proxy.$toast('保存成功！')
  proxy.setStorage('ufmSourceName', data.name)
  initFn()
  queryData.value = {}

  const _fn = (obj, index) => {
    dsArrAPI((res) => {
      isPost = false
      let _data = res.data.details
      _data.forEach((item, i) => {
        //有同名的数据
        if (obj.name == item.name) {
          queryData.value.id = item.id
        }
      })
    })
  }
  fileDataList.value.forEach((item, index) => {
    item.isSelect = false
    item.isCopy = false
    if (item.id == data.id) {
      //修改
      item.name = data.name
      item.isSelect = true
      item.isCopy = false
    } else {
      if (!data.id) {
        if (!isPost) {
          isPost = true
          _fn(data, index) //需要重新请求列表获取ID,这里看下是否需要单独再写个回调
        }
        //新建或者克隆
        if (item.name === data.name) {
          //克隆
          item.isSelect = true
        } else {
          //新建
          if (recodeIndex === index) {
            item.name = data.name
            item.isSelect = true
          }
        }
      }
    }
  })

  isTestPassFn()
}

const saveCopyFn = (index) => {
  recodeIndex = index
  infoData.value.id = ''
  infoData.value.name = systemName.value
  saveConfigFn()
}

//查询下拉列表
let systemName = ref()
systemName.value = 'DMC'

let systemDisabled = ref()
systemDisabled.value = false

let selectItemName = ref()
selectItemName.value = ''

let activeKey = ref()
activeKey.value = '1'

let DMC_Form = ref()
DMC_Form.value = {
  name: '',
  key: '24455',
}

let testName = ref()
testName.value = '1'

let systemValue = ref()
systemValue.value = 'DMC'
provide('testName', testName)

const pubFn = (name, fn) => {
  state.setUpTyp_data.forEach((item) => {
    item.isSelect = false
    if (name == item.name) {
      if (fn) {
        fn(name)
      }
      state.setUpType_show = name
      testName.value = name
      systemData.value.senior = item.senior
      systemData.value.deputy = item.deputy
      item.isSelect = true
      systemData.value.activeKey = '1'
    }
  })
}

const listSelectFn = (name) => {
  pubFn(name, (name) => {
    systemName.value = name
    selectItemName.value = name
    systemDisabled.value = true
  })
}

const isSenior = ref()
isSenior.value = false

const isDeputy = ref()
isDeputy.value = false

const state = reactive({
  setUpType_show: 'WEBDAV',
  setUpTyp_data: setUpTypeData,
})

//真实逻辑相关 新建
const DMC_Data = ref() //可以接口获取
DMC_Data.value = []
provide('DMC_Data', DMC_Data)

// 分割线——————————————————————————

const modelRef = ref()
modelRef.value = {
  name: '',
}
const systemData = ref()
systemData.value = {
  senior: false,
  deputy: false,
}

const formState = ref()
formState.value = {
  user: '',
  password: '',
}

listSelectFn('DMC')
</script>
<style lang="scss">
@import url('@/assets/css/dataOrgin');
</style>
