<template>
  <div>
    <div class="content-box">
      <!-- 头部功能 -->
      <div class="box-top">
        <div class="box-top-a">
          <div class="box-top-left">
            <o-select
              v-model="selectValue"
              width="300"
              :options="options"
              label="id"
              value="id"
              @changeSelect="changeSelect"
            />
          </div>
          <div class="box-top-right">
            <div class="box-ant">
              <el-checkbox
                v-model="selectAll"
                border
                :indeterminate="isIndeterminate"
                class="po-r t-2"
                @change="selectAllHandle"
              >
                全选
              </el-checkbox>
              <o-tooltip content="请至少选择一个客户端">
                <u-button
                  :disabled="!selectTrue"
                  icon="shut-down"
                  type="line"
                  class="m-b-8"
                  @click="batchOpreteFn('重启')"
                >
                  重启
                </u-button>
              </o-tooltip>
              <o-tooltip content="请至少选择一个客户端">
                <u-button
                  icon="shuaxin-xian"
                  type="line"
                  class="m-b-8"
                  :disabled="!selectTrue"
                  @clickBack="batchOpreteFn('更新')"
                >
                  更新
                </u-button>
              </o-tooltip>
              <o-tooltip content="请至少选择一个客户端">
                <u-button
                  icon="guanbi"
                  type="line"
                  class="m-b-8"
                  :disabled="!selectTrue"
                  @click="batchOpreteFn('关闭')"
                >
                  关闭
                </u-button>
              </o-tooltip>

              <u-button icon="change-retry" type="line" class="m-b-8" @click="refreshFn">刷新</u-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 卡片部分 -->
      <div class="card-box">
        <o-empty v-if="proxy.isEmpty(dataArr)" class="tc ma" />
        <div
          v-for="item in dataArr"
          v-else
          :key="item.id"
          :class="item.isSelect ? 'finfo-box' : ''"
          class="info-box cp"
          @click="item.isSelect = !item.isSelect"
        >
          <!-- 卡片的上部分 -->
          <div class="top-box">
            <a-checkbox :checked="item.isSelect" />
            <div class="pic-top-box">
              <img src="@/assets/image/host.png" />
              <span>{{ item.serialNumber }}</span>
            </div>
            <div class="pic-top-box">
              <img src="@/assets/image/ip_cion.png" class="ip-img" />
              <span>{{ item.hostName }}</span>
            </div>
            <div class="f">
              <el-button type="primary" size="small" @click.stop="pubOperationFn(item, '重启')">重启</el-button>
              <el-button type="primary" size="small" @click.stop="pubOperationFn(item, '更新')">更新</el-button>
              <el-button type="primary" size="small" @click.stop="pubOperationFn(item, '关闭')">关闭</el-button>
            </div>
          </div>
          <hr size="1px" :class="item.isSelect ? 'fhr' : 'hr'" />
          <!-- 卡片的内容部分 -->
          <div class="main-box client-card-box">
            <a-form>
              <a-row :gutter="24" style="row-gap: 12px; margin-right: -24px">
                <template v-for="(el, index) in item.unit" :key="index">
                  <a-col :span="12" class="form-box-item">
                    <a-form-item :label="el.lable">
                      <o-tooltip v-if="el.lable != '伺服状态' && el.lable != '健康状态'" :content="el.value" />
                      <span
                        v-else
                        class="status-ufm-color"
                        :class="el.lable == '伺服状态' || el.lable == '健康状态' ? countStatus(el.value) : ''"
                      >
                        {{ el.value }}
                      </span>
                    </a-form-item>
                  </a-col>
                </template>
              </a-row>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <g-yes-dialog ref="dialogRef" @confirm="dialogConfirm" />
  </div>
</template>
<script setup>
import { ref, getCurrentInstance, computed } from 'vue'
import { handleMoreError } from '@/utils/request.ts'

import { useRouter } from 'vue-router'
const router = useRouter()
import { getClientAPI, checkClientListAPI, reStartAPI, shutDownAPI, updateHostAPI } from '../../server/API/client'
const { proxy } = getCurrentInstance()
// 列表数组
const dataArr = ref([])
const dataArrD = ref([])
const selectValue = ref()
const dialogRef = ref(null)
const arr = ref([])
const deliveryNum = ref()
const currentID = ref('')
const currentType = ref('')

const selectAll = computed(() => {
  return dataArr.value.every((v) => {
    return v.isSelect === true
  })
})
const selectIds = computed(() => {
  return dataArr.value
    .filter((v) => {
      return v.isSelect === true
    })
    .map((v) => v.id)
})
const isIndeterminate = computed(() => {
  let isSelect = dataArr.value.some((v) => v.isSelect)
  return isSelect && !selectAll.value
})
const selectTrue = computed(() => {
  return isIndeterminate.value || selectAll.value
})
const selectAllHandle = () => {
  if (!selectAll.value || isIndeterminate.value) {
    dataArr.value = dataArr.value.map((v) => {
      v.isSelect = true
      return v
    })
  } else {
    dataArr.value = dataArr.value.map((v) => {
      v.isSelect = false
      return v
    })
  }
}
const dialogConfirm = () => {
  if (currentType.value == '重启') {
    restartComFn(selectIds.value)
  }
  if (currentType.value == '更新') {
    updateComFn(selectIds.value)
  }
  if (currentType.value == '关闭') {
    shutDownComFn(selectIds.value)
  }
}

const batchOpreteFn = (type) => {
  arr.value = dataArr.value
  arr.value = dataArr.value.filter((item) => item.isSelect === true)
  currentType.value = type
  dialogRef.value.open(type)
}

const refreshFn = () => {
  init()
  proxy.$toast('刷新成功！')
}

const pubOperationFn = (item, type) => {
  dataArr.value = dataArr.value.map((v) => {
    if (v.id === item.id) {
      v.isSelect = true
    } else {
      v.isSelect = false
    }
    return v
  })
  currentID.value = item.id
  deliveryNum.value = item.hostName
  currentType.value = type
  dialogRef.value.open(type)
}

const restartComFn = (arr) => {
  const promises = arr.map((id) => {
    return new Promise((resolve, reject) => {
      reStartAPI(id).then(() => {
        resolve() // 操作成功后调用 resolve
      })
    })
  })

  Promise.all(promises)
    .then(() => {
      proxy.$toast('重启成功!')
      init() // 所有接口调用完成后执行 init
    })
    .catch((error) => {
      let errorData = error.response.data
      handleMoreError(errorData)
    })
}

const shutDownComFn = (arr) => {
  arr.map((id) => {
    shutDownAPI(id, () => {
      proxy.$toast('操作成功！')
      init()
    })
  })
}
const updateComFn = (arr) => {
  let idx = 0
  arr.map((id) => {
    updateHostAPI(id, () => {
      proxy.$toast('更新操作成功！')
      idx++
      if (idx === arr.length) {
        init()
      }
    })
  })
}

// 搜索
let options = ref([])

const changeSelect = (value) => {
  if (!value) {
    dataArr.value = proxy.clone(dataArrD.value)
  } else {
    dataArr.value = dataArrD.value.filter((item) => {
      return item.serialNumber === value
    })
  }
}

// 获取数据---模拟----假设后端不进行分页
const init = async () => {
  dataArrD.value = []
  let res = await getClientAPI()
  if (proxy.notEmpty(res)) {
    res.map((item) => {
      if (item.updateTime) {
        item.updateTime = proxy.formatTime(item.updateTime)
      }
      if (item.startDatetime) {
        item.startDatetime = proxy.formatTime(item.startDatetime)
      }
      if (item.upTime) {
        let date = proxy.formatDurationTime(item.upTime)
        // 格式化日期时间
        item.upTime = date
      }
      let obj = {
        isSelect: false,
        id: item.id,
        serialNumber: item.nodeId,
        hostName: item.hostname || '-',
        unit: [
          {
            value: item.name,
            lable: '名称',
          },
          {
            value: item.taskCount,
            lable: '任务总数',
          },
          {
            value: item.serveStatus,
            lable: '伺服状态',
          },
          {
            value: item.runningTaskCount,
            lable: '运行任务',
          },
          {
            value: item.upTime,
            lable: '运行时间',
          },

          {
            value: item.healthState || '-',
            lable: '健康状态',
          },
          {
            value: item.updateTime,
            lable: '更新时间',
          },
          {
            value: item.startDatetime,
            lable: '开始时间',
          },
        ],
      }
      if (dataArrD.value.length > 0) {
        dataArrD.value.forEach((el) => {
          if (el.id == obj.id) {
            el = obj
          } else {
            let isHave = dataArrD.value.find((item) => obj.id === item.id)
            if (!isHave) {
              dataArrD.value.push(obj)
            }
          }
        })
      } else {
        dataArrD.value.push(obj)
      }
    })
    dataArr.value = dataArrD.value
  } else {
    proxy.$toast('暂无数据,请到部署页进行配置', 'w')
    router.push({ path: '/client/deploy' })
  }
}
const getSelectList = async () => {
  let listRes = await checkClientListAPI()
  options.value = listRes
}
getSelectList()
init()

const countStatus = (value) => {
  switch (value) {
    case 'InService':
      return 'status-tag-normal'
    case 'unKnown':
      return 'status-tag-unkown'
  }
}
</script>
<style scoped lang="scss">
// 未选中时的状态
@mixin pic-top-box {
  .pic-top-box {
    position: relative;
    display: inline-block;
    padding-left: 12px;
    margin-left: 8px;

    span {
      height: 20px;
      margin-left: 12px;
      font-weight: 600;
    }

    img {
      position: absolute;
      top: 2px;
      left: 0;
      opacity: 0.8;
    }

    .ip-img {
      top: 1px;
      left: 2px;
      width: 19px;
    }
  }
}

.content-box {
  width: 100%;
  height: 100%;
  padding-top: 24px !important;
  padding-right: 16px !important;
  padding-left: 16px !important;
  background-color: #fff;

  .top-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 46px;
    padding: 12px 16px;
    color: #214fe5;
    background: #eff4fd;
  }

  .box-top {
    margin-bottom: 16px;

    .box-top-a {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      // 搜索
      .box-top-right {
        .online {
          display: inline-block;
          width: 100px;
          height: 32px;
          background: #e3f8f1;
          border-radius: 4px;

          .circle {
            display: inline-block;
            width: 9px;
            height: 9px;
            margin-right: 9px;
            margin-left: 9px;
            background: #3eb869;
            border-radius: 50%;
          }

          span {
            display: inline-block;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            font-weight: 500;
            line-height: 32px;
            color: #6fc77d;
            letter-spacing: 0;
          }
        }

        .box-ant {
          display: inline-block;

          button {
            margin-left: 16px;
          }
        }
      }
    }
  }

  .card-box {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0 !important;

    .main-box {
      padding: 12px 16px;

      .form-box-item {
        height: 12px;
        margin-bottom: 8px;
      }
    }
    // padding-left: 25px;
    .info-box {
      @include pic-top-box;

      align-content: center;
      align-items: center;
      width: 32%;
      min-width: 500px;
      margin-right: 0.5%;
      margin-bottom: 16px;
      background: #fff;
      border: 1px solid #bec2f4;
      border-radius: 4px;

      .hr {
        border-color: #dcdfe4;
        opacity: 0.5;
      }

      .main-box {
        :deep(.ant-form-item-control-input-content) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .info-box:last-child {
      margin-right: 0;
    }

    // 鼠标移入
    .info-box:hover {
      background: #f8f7fc;
      border: 1px solid $bg-color;
      border-radius: 4px;
      box-shadow: $box-shadow-app;

      .hr {
        border-color: #dcdfe4;
        opacity: 0.5;
      }
    }
  }

  .page {
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 70px;

    ul {
      position: absolute;
      right: 0;
    }

    :deep(.ant-pagination-options) {
      border: 1px solid #5c6cc0;
    }

    :deep(.ant-pagination-item-active a) {
      color: #fff;
    }
  }
}

.finfo-box {
  background: #f8f7fc !important;
  border: 1px solid $bg-color;
  border-radius: 4px;
  box-shadow: $box-shadow-app;
}

.fhr {
  border-color: $bg-color;
  opacity: 0.5;
}

// 表单每一条名称
:deep(.ant-col.ant-form-item-label) {
  text-align: left;
}

:deep(.ant-form-item-label > label) {
  height: 12px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 12px;
  color: #b8babd;
  text-align: left;
  letter-spacing: 0;
}

:deep(.ant-form-item-label > label::after) {
  content: '';
}

:deep(.ant-form-item-control-input) {
  height: 20px;
  min-height: 20px;
  color: rgb(89 89 89);
}

:deep(.ant-col .ant-col-12) {
  padding-right: 12px;
  margin-bottom: 12px;
}

:deep(.ant-form-horizontal .ant-form-item-label) {
  width: 65px;
}
</style>
