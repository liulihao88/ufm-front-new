<template>
  <div class="origin-common-enter">
    <div class="left-box layout-item">
      <h2 class="title-header title">文件系统连接</h2>
      <ul class="list-box">
        <li v-for="(item, index) in fileDataList" :key="index" :class="item.isSelect ? 'active' : ''">
          <div @click="selectFeilFn(item, index)">
            <span class="file-box">
              <el-tag type="primary">{{ parseFileName(item) }}</el-tag>
            </span>
            <a-tooltip>
              <template #title>{{ item.name }}</template>
              {{ item.name.length > 26 ? item.name.substring(0, 24) + '...' : item.name }}
            </a-tooltip>
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
              <span v-if="item.fsid == 'HSP08398913'" @click="saveCopyFn(item)">保存克隆</span>
              <span v-else>
                <span v-if="isTestPass" @click="saveNew">保存</span>
                <span v-else @click="testFn(item)">测试</span>
              </span>
            </span>
          </div>
        </li>
      </ul>
      <div class="btn-box">
        <u-button type="ghost" icon="zengjiaxinjian" @click="newAdd">新建</u-button>
      </div>
    </div>
    <div class="right-file-box layout-item right-box">
      <div class="f-bt-ct p-r-16">
        <h2 class="title-header new-header">
          {{ isNew ? '新建' : '' }}
          <strong v-if="!isNew">
            <span class="file-box">
              <el-tag type="primary">{{ parseFileName(selectRow) }}</el-tag>
            </span>
            {{ listName }}
          </strong>
        </h2>
        <o-select
          ref="selectRef"
          v-model="systemValue"
          :options="systemAllData"
          value="mark"
          label="name"
          :disabled="isDisabled"
          :clearable="false"
          @changeSelect="changeSystemFn"
        />
      </div>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1">
          <template #tab>
            <span>
              <span class="iconfont icon-ufm-shezhi2" style="font-size: 13px" />
              设置
            </span>
          </template>
          <component
            :is="comp[systemValue]"
            ref="compRef"
            :isNew="isNew"
            :formState="setUpData"
            @isTestPassFn="isTestPassFn"
          />
        </a-tab-pane>
        <a-tab-pane v-if="isSenior" key="2" force-render>
          <template #tab>
            <span>
              <span class="iconfont icon-ufm-gaojipeizhi" style="font-size: 14px" />
              高级
            </span>
          </template>

          <SeniorNew :setUpTypeName="systemValue" :setUpData="setUpData" @isTestPassFn="isTestPassFn" />
        </a-tab-pane>
        <a-tab-pane v-if="isDeputy" key="3">
          <template #tab>
            <span>
              <span class="iconfont icon-ufm-daili1" style="font-size: 12px" />
              代理
            </span>
          </template>
          <DeputyNew :setUpTypeName="systemValue" :setUpData="setUpData" @isTestPassFn="isTestPassFn" />
        </a-tab-pane>
      </a-tabs>
      <div class="btn-box m-t-8">
        <a-popover v-if="!isTestPass && !isNative" title="">
          <template #content>
            <p>测试通过才能保存！</p>
          </template>
          <u-button type="ghost" :disabled="!isTestPass" icon="baocun1">保存</u-button>
        </a-popover>
        <u-button v-else type="ghost" icon="baocun1" @click="saveNew">保存</u-button>
        <u-button type="ghost" icon="icon_ceshi" style="margin-left: 12px" @click="testFn">测试</u-button>
      </div>
    </div>
    <o-dialog ref="dialogRef" v-model="isVisible" title="提示" @confirm="delPostFn" @cancel="cancelBackFn">
      {{ alertData.text }}
    </o-dialog>
  </div>
</template>
<script setup>
import { reactive, ref, getCurrentInstance, nextTick } from 'vue'

import { setUpTypeData } from './js/data'
import { entryAPI, testEntryAPI, delEntryAPI, syslistAPI, saveEntryAPI, queryEntryAPI } from '@/server/API/file.ts'

import LFS from '@/views/source/module/setUpComponent/LFS.vue'
import FTP from '@/views/source/module/setUpComponent/FTP.vue'
import S3CS from '@/views/source/module/setUpComponent/S3CS.vue'
import NFS from '@/views/source/module/setUpComponent/NFS.vue'
import CIFS from '@/views/source/module/setUpComponent/CIFS.vue'
import OCT from '@/views/source/module/setUpComponent/OCT.vue'

import SetUpNew from './module/setUpNew.vue'
import SeniorNew from './module/seniorNew.vue'
import DeputyNew from './module/deputyNew.vue'

const isVisible = ref(false)
const selectRow = ref({})
const { proxy } = getCurrentInstance()
const selectRef = ref(null)
const alertData = ref({
  text: '',
  value: '',
})
const comp = {
  LFS: LFS,
  FTP: FTP,
  NFS: NFS,
  OCT: OCT,
  CIFS: CIFS,
  'S3-CS': S3CS,
}
const compRef = ref(null)
const sysId = ref()
const isTestPass = ref(false)
const isTestPassFn = () => {
  isTestPass.value = false
}
let currentData = {}
const isNew = ref(true)
const isDisabled = ref()
isDisabled.value = false

const listName = ref('')

const fileDataList = ref([])
const setUpData = ref({})
const isNative = ref(false)

//控制设置、高级、代理  系统数据
let systemName = ref()
systemName.value = ''

let systemDisabled = ref()
systemDisabled.value = false
let systemAllData = ref()

//选择的系统
let selectItemName = ref()
selectItemName.value = ''

let activeKey = ref()
activeKey.value = '1'

let LFS_Form = ref()
LFS_Form.value = {
  name: '',
  key: '24455',
}
//系统值
let systemValue = ref('')

const parseFileName = (item) => {
  let res = setUpTypeData.find((v) => {
    return v.value === item.fsid
  })
  if (res.mark === 'LFS') {
    return 'LOCAL'
  }
  return res.mark
}

const changeSystemFn = (value, label, options) => {
  systemName.value = options.name
  sysId.value = options.id
  setUpData.value.systemId = options.id
  systemValue.value = options.mark
  isSenior.value = options.isSenior
  isDeputy.value = options.isDeputy
  activeKey.value = '1'
  if (options.mark == 'LFS') {
    isNative.value = true
  } else {
    isNative.value = false
  }
}

//控制高级、部门
const isSenior = ref()
isSenior.value = false

const isDeputy = ref()
isDeputy.value = false

const state = reactive({
  setUpType_show: 'WEBDAV',
  setUpTyp_data: setUpTypeData,
})

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
//新建
const newAdd = () => {
  if (systemAllData.value) {
    let data = systemAllData.value[0]
    systemName.value = data.name
    systemValue.value = data.mark
    sysId.value = data.id
    setUpData.value = { systemId: data.id }
  }

  isNew.value = true
  fileDataList.value.forEach((item, index) => {
    item.isSelect = false
    item.index = index
  })
  isDisabled.value = false
  isSenior.value = false
  isDeputy.value = false
  isNative.value = true
  activeKey.value = '1'
  isTestPassFn()
}

const devTest = async () => {
  if (proxy.$dev) {
    newAdd()
    await nextTick()
    selectRef.value.$refs.selectRef.$emit('change', systemAllData.value[4].mark)
  }
}
// setTimeout(() => {
//   devTest()
// }, 3000)

//初始化
const needDataFn = (arr) => {
  //合成需要的数据
  let _arr = []
  arr.map((el) => {
    setUpTypeData.map((item) => {
      if (el.id == item.value) {
        el = { ...el, ...item }
        _arr.push(el)
      }
    })
  })

  /**
   * [
      {
          "id": "HSP08398913",
          "name": "Local File System",
          "mark": "LFS",
          "isSenior": false,
          "isDeputy": false,
          "isSelect": true,
          "haveItem": [
              "1"
          ],
          "value": "HSP08398913"
      },
      {
          "id": "HSP90838399",
          "name": "S3 Compatible Storage",
          "mark": "S3-CS",
          "isSenior": true,
          "isDeputy": true,
          "isSelect": false,
          "haveItem": [
              "1",
              "2",
              "3"
          ],
          "value": "HSP90838399"
      }
    ]
   */

  return _arr
}
const init = async () => {
  let res = await entryAPI()
  fileDataList.value = res.map((v, index) => {
    return {
      ...v,
      index: index,
    }
  })
  if (fileDataList.value.length > 0) {
    let matchIndex = proxy.isEmpty(proxy.getStorage('ufmListName'))
      ? 0
      : fileDataList.value.findIndex((item) => {
          return item.name == proxy.getStorage('ufmListName')
        })
    if (matchIndex === -1) {
      matchIndex = 0
    }
    selectFeilFn(fileDataList.value[matchIndex], matchIndex)
  }
}
const getAllList = async () => {
  isTestPassFn()
  let res = await syslistAPI()
  systemAllData.value = needDataFn(res)
  // systemAllData.value = res
  init()
}
getAllList()

//测试
const testFn = async () => {
  isTestPass.value = false
  let getData = await compRef.value.getData()
  if (!getData.systemId) {
    getData.systemId = sysId.value
  }
  await testEntryAPI(getData)
  proxy.$toast('测试成功！')
  isTestPass.value = true
}
const saveNew = async () => {
  let getData = await compRef.value.getData()
  if (!getData.systemId) {
    getData.systemId = sysId.value
  }
  await saveEntryAPI(getData)
  proxy.$toast('保存成功')
  proxy.setStorage('ufmListName', getData.name)
  getAllList()
}

//删除
const delListItemFn = (item) => {
  isVisible.value = true
  alertData.value.text = `确认删除${item.name}？`
  currentData = item
  isTestPassFn()
}
const delPostFn = async () => {
  await delEntryAPI(currentData.id)
  proxy.$toast('删除成功！')
  isVisible.value = false
  init()
  isTestPassFn()
}
const cancelBackFn = () => {
  isVisible.value = false
}
const judgeTypeFn = async (el, type) => {
  isNew.value = false
  isDisabled.value = true
  let res = await queryEntryAPI(el.id)
  systemAllData.value.forEach((item) => {
    if (item.value === el.fsid) {
      setUpData.value = res //编辑的数据\
      if (type == 'copy' || el.isCopy) {
        setUpData.value.id = ''
        setUpData.value.name = copyName
        listName.value = copyName
      } else {
        systemName.value = item.name
      }
      systemValue.value = item.mark
    }
  })
  isTestPassFn()
}
//编辑
const selectFeilFn = (el, index) => {
  selectRow.value = el
  if (el.fsid == 'HSP08398913') {
    isNative.value = true
  } else {
    isNative.value = false
  }
  listName.value = el.name
  proxy.setStorage('ufmListName', el.name)
  fileDataList.value.forEach((item) => {
    item.isSelect = false
    if (item.index == el.index) {
      item.isSelect = true
    }
  })
  setUpTypeData.map((item) => {
    if (item.value == el.fsid) {
      isSenior.value = item.isSenior
      isDeputy.value = item.isDeputy
      activeKey.value = '1'
    }
  })
  judgeTypeFn(el, 'edit')
  if (el.isCopy) {
    setUpData.value.id = ''
    return false
  }
}
let copyName = ''
//克隆
const copyListItemFn = (item, index) => {
  let _data = JSON.parse(JSON.stringify(item))
  let obj = {
    ..._data,
    isSelect: true,
    isCopy: true,
    index: fileDataList.value.length,
    copyid: item.id,
  }
  let num = 0
  let isHave = false
  fileDataList.value.map((el) => {
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
  copyName = obj.name
  obj.copyId = obj.id
  // fileDataList.value.push(obj)
  fileDataList.value.splice(index + 1, 0, obj)
  judgeTypeFn(_data, 'copy')
}
//保存克隆
const saveCopyFn = () => {
  // saveFn()
  saveNew()
}
//删除克隆
const delCopyFn = (item) => {
  fileDataList.value.splice(item.index, 1)
  fileDataList.value.map((item, index) => {
    item.index = index
  })
}
</script>
<style lang="scss" scoped>
@mixin bg-color {
  // background: linear-gradient(to top, $bg-line-3 10%, #fff 40%, #fff 50%);
}

.origin-common-enter {
  @mixin common {
    // height: calc(100vh - 100px);
    height: 100%;
    background: #fff;
    border: 1px solid #dcdfe4;
    border-radius: 4px;
  }

  display: flex;
  background: #f1f4f9 !important;

  .header-box {
    position: relative;
    width: 100%;
    height: 76px;
    background: #fff;
    border-bottom: 1px solid #dcdfe4;

    h2 {
      position: absolute;
      top: 26px;
      left: 24px;
      padding-left: 36px;
      font-size: 18px;
      line-height: 27px;

      img {
        @include center-l;

        left: 0;
        width: 24px;
      }
    }

    .opration-box {
      position: absolute;
      top: 30px;
      right: 26px;

      img {
        width: 18px;
        margin-left: 26px;
        cursor: pointer;
      }
    }
  }

  .ant-layout-sider {
    background: #eee;
  }

  .ant-list-items {
    height: 100vh;
  }

  .ant-tabs-content-holder {
    padding: 16px 26px;
  }

  .title-header {
    position: relative;
    z-index: 10;
    padding-left: 10px;
    font-size: 16px;
    font-weight: 600;

    strong {
      font-size: 17px;
      color: $bg-color;
    }

    &::before {
      @include center-l;

      left: 0;
      width: 2px;
      height: 14px;
      content: '';
      background: $bg-color;
    }
  }

  .layout-item {
    .new-header {
      // font-weight: 600;
      @include title-config1;

      position: relative;
      padding: 14px;
      padding-left: 26px;

      // font-size: 16px;
      line-height: 26px;

      &::before {
        @include center-l;

        left: 16px;
        width: 2px;
        height: 14px;
        content: '';
        background: $bg-color;
      }
    }
  }

  .right-file-box {
    @include scrollbar-style;
    @include common;
    @include bg-color;

    position: relative;
    flex: 4;
    margin-left: 12px;
    overflow-y: auto;

    .ant-tabs {
      height: calc(100vh - 200px);
    }

    .btn-box {
      position: absolute;
      top: calc(100vh - 180px);
      left: 16px;
      width: 200px;
    }
  }

  .left-box {
    @include common;
    @include bg-color;

    position: relative;
    flex: 1;
    padding: 14px;

    @media (width <= 1280px) {
      flex: 1.3;
    }

    h2 {
      @include title-config1;
    }

    .btn-box {
      position: absolute;
      top: calc(100vh - 180px);
      left: 16px;

      .oct-btn-box {
        flex: auto;
        margin-right: 12px;
      }

      .more-box {
        position: absolute;
        right: 15px;
        bottom: 30px;
        flex: auto;
        margin: 0;
        font-size: 12px;
        box-shadow: 0 0 5px 0 rgb(0 0 0 / 8%);

        li {
          position: relative;
          height: 28px;
          padding: 0 16px;
          line-height: 28px;
          cursor: pointer;
          border-radius: 4px;

          &.export-in {
            position: relative;

            input {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
            }
          }

          &:hover {
            color: $bg-color;
            background: $bg-input;

            &::after {
              position: absolute;
              top: 0;
              right: 0;
              width: 2px;
              height: 28px;
              content: '';
              background: $bg-color;
            }
          }
        }
      }
    }

    .list-box {
      @include scrollbar-style;

      width: 100%;
      height: calc(100vh - 220px);
      padding: 10px 0;
      overflow-y: auto;

      li {
        position: relative;
        height: 32px;
        padding-left: 6px;
        margin-top: 4px;
        font-size: 14px;
        line-height: 32px;
        color: $frontColor3;
        cursor: pointer;
        border-bottom: 1px solid $bg-input;
        border-radius: 4px;

        .iconfont {
          color: $bg-color;
          opacity: 0.7;
        }

        &:hover {
          font-weight: 600;
          color: $bg-color;
          background: $bg-input;
        }

        img {
          @include center-l;

          left: 10px;
          width: 13px;
        }

        &.active {
          width: 100%;
          font-weight: 600;
          color: $bg-color;
          background: $bg-line;

          .op-btn-box {
            span {
              font-weight: 600;
              color: $bg-btn-2;
            }
          }
        }

        .op-btn-box {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 12px;
          font-weight: 500;

          span {
            display: inline-block;
            padding-right: 6px;
            color: $bg-btn;
            cursor: pointer;

            &:hover {
              font-weight: 600;
              color: $bg-btn-2;
              opacity: 1;
            }
          }

          .f-line {
            font-size: 10px;
            font-weight: normal;
            color: #eee;

            &:hover {
              color: #eee;
            }
          }
        }
      }
    }
  }
}

.file-box {
  // width: 50px;
  // display: inline-box;
  // background: blue;
  // color: #fff;
  // padding: 0 4px;
  // font-size: 12px;
}

.origin-common-enter .ant-tabs-content-holder {
  overflow: auto;
}
</style>
