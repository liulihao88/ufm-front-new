<template>
  <o-dialog ref="dialogRef" v-model="isShow" title="运行状态" width="1200" destroy-on-close>
    <div class="running-box">
      <div class="base-info-box mian-box">
        <o-title title="基本信息" />
        <el-descriptions border :column="2">
          <el-descriptions-item label="运行状态">
            <img
              v-if="recordCurrentData.status.toLocaleLowerCase() === 'running'"
              src="../../../assets/image/task/start.png"
            />
            <img
              v-if="recordCurrentData.status.toLocaleLowerCase() === 'stoped'"
              src="../../../assets/image/task/stoped.png"
            />
            <span class="m-l-8">
              {{ recordCurrentData.statusLabel || '-' }}
            </span>
          </el-descriptions-item>
          <el-descriptions-item label="编号">{{ recordCurrentData.id || '-' }}</el-descriptions-item>
          <el-descriptions-item label="任务名">
            <div class="name-width">
              <o-tooltip :content="recordCurrentData.name" />
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="映射名">{{ recordCurrentData.hostname || '-' }}</el-descriptions-item>
          <el-descriptions-item label="服务状态">
            {{ recordCurrentData.serviceStatusLabel || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="开始时间">
            {{ proxy.formatTime(recordCurrentData.lastStartTime) }}
          </el-descriptions-item>
          <el-descriptions-item label="端口">{{ recordCurrentData.mapiPort || '-' }}</el-descriptions-item>
          <el-descriptions-item label="结果">{{ recordCurrentData.execResult || '-' }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-if="isShowMore" class="list-info-box mian-box">
        <o-title title="映射信息" />
        <ul v-if="mapAllListV.length > 0" class="info-box flex-wrap-box list-box">
          <li v-for="(item, index) in mapAllListV" :key="index" class="flex-box map-box flex-wrap-el open-index-el">
            <div class="flex-seat-box flex-seat-box-2">
              <h6>{{ item.name }}</h6>
              <ul class="info-item-box info-item-box-3">
                <li v-for="(el, index) in item.commonArr" :key="index" class="flex-box">
                  <span class="lable">{{ el.name }}</span>
                  <span v-if="el.type != 'percentSize' && el.type != 'percentFile'" class="flex-grow-el">
                    {{ el.value }}
                  </span>
                  <div v-else class="flex-grow-el percent-box">
                    <o-progress :percentage="parsePercentage(el)" stroke-width="10" width="10" />
                  </div>
                </li>
              </ul>
              <ul class="info-item-box info-item-box-2">
                <li v-for="(o, index) in item.moduleArr" :key="index">
                  <div class="flex-box module-title">
                    <span class="lable">模型名称：</span>
                    <span class="flex-grow-el">{{ o.name }}</span>
                  </div>
                  <div class="flex-box flex-wrap-el spceil-box-p">
                    <div v-for="(i, index) in o.child" :key="index" class="flex-box spceil-box clearfix">
                      <span class="fl lable">{{ i.name }}</span>
                      <span class="fl value-el">
                        <o-tooltip :content="i.value" />
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <a-empty v-else :image="simpleImage" class="empty-el" />
      </div>
    </div>
  </o-dialog>
</template>
<script lang="ts" setup>
import { ref, watch, onUnmounted, getCurrentInstance } from 'vue'
import { Empty } from 'ant-design-vue'
const { proxy } = getCurrentInstance()
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
import { statusAPI, statisticTaskAPI } from '@/server/API/task'
const isShow = ref(false)
const isShowMore = ref(false)
const recordCurrentData = ref()
const datas = ref({})
const mapAllList = ref({})
const timer = ref(null)

watch(isShow, (val) => {
  if (!val) {
    clearInterval(timer.value)
  }
})

onUnmounted(() => {
  clearInterval(timer.value)
})

const open = (row) => {
  recordCurrentData.value = row
  isShow.value = true
  init()
  timer.value = setInterval(() => {
    init()
  }, 5000)
}

async function init() {
  let res = await statusAPI(recordCurrentData.value)
  datas.value = res
  let mapRes = await statisticTaskAPI(recordCurrentData.value)
  mapAllList.value = mapRes
}

const baseIsOpen = ref(false)

const mapAllListV = ref([])
const parsePercentage = (el) => {
  return (el.value * 100).toFixed(2)
}

watch(mapAllList, (newVal) => {
  mapAllListV.value = []
  if (newVal && newVal.length > 0) {
    newVal.forEach((item) => {
      let leftData = item.modelStatisticLeft
      let rightData = item.modelStatisticRight
      const moduleArrFn = (data) => {
        return {
          name: data.name,
          child: [
            {
              name: '文件数量：',
              value: data.fileCount,
              type: 'fileSize',
            },
            {
              name: '路径：',
              value: data.path,
              type: 'dealNum',
            },
            {
              name: '目录数量：',
              value: data.folderCount,
              type: 'dealSize',
            },
            {
              name: '大小：',
              value: data.totalSizeLabel,
              type: 'surplusNum',
            },
          ],
        }
      }
      let modelStatisticLeft = moduleArrFn(leftData)
      let modelStatisticRight = moduleArrFn(rightData)
      const commonArrFn = (data) => {
        let arr = [
          {
            name: '文件数量百分比：',
            value: data.fileCountPercent,
            type: 'percentFile',
          },
          {
            name: '文件大小百分比：',
            value: data.fileSizePercent,
            type: 'percentSize',
          },
          {
            name: '已处理文件数量：',
            value: data.fileCount,
            type: 'fileSize',
          },
          {
            name: '已处理文件大小：',
            value: data.fileSize,
            type: 'dealSize',
          },
          {
            name: '剩余文件数：',
            value: data.remainFileCount,
            type: 'surplusNum',
          },
          {
            name: '剩余文件大小：',
            value: data.remainFileSize,
            type: 'surplusSize',
          },
        ]
        return arr
      }
      let obj = {
        name: item.name,
        isOpen: baseIsOpen.value,
        commonArr: commonArrFn(item),
        moduleArr: [],
      }
      obj.moduleArr.push(modelStatisticLeft)
      obj.moduleArr.push(modelStatisticRight)
      mapAllListV.value.push(obj)
    })
  }
  isShowMore.value = true
})

defineExpose({
  open,
})
</script>

<style lang="scss" scoped>
.running-box {
  padding: 16px 25px;

  .list-info-box {
    position: relative;
    min-height: 300px;
    padding-top: 16px;
    border-top: 1px solid #5c6bbf1a;
    // height: calc(100vh - 150px);
    .flex-seat-box {
      position: absolute;
      z-index: 100;
      padding-bottom: 18px;
      border: 1px solid #eee;

      &.flex-seat-box-2 {
        position: relative;
      }
    }

    &.info-item-box-2 {
      padding-top: 0;
    }

    .map-box {
      position: relative;
      z-index: 50;
      box-sizing: border-box;
      width: 50%;
      padding-bottom: 14px;
      cursor: pointer;

      &:hover {
        .flex-seat-box {
          box-shadow: -4px 0 10px 0 #dbdeee;
        }

        h6 {
          font-weight: 600;
        }

        .open-el {
          color: $bg-color;
        }
      }

      &.open-index-el {
        z-index: 200;

        .flex-seat-box {
          width: 97%;
          border: 1px solid $bg-color;
          box-shadow: 4px 0 10px 0 #dbdeee;
        }

        h6 {
          font-weight: 600;
        }
      }

      .open-el {
        @include center-v;

        bottom: 6px;
        z-index: 200;
        color: rgb(0 0 0 / 40%);
        cursor: pointer;

        &:hover {
          color: $bg-color;
        }
      }

      > div {
        width: 100%;
        background: #fff;
        border-radius: 4px;

        h6 {
          width: 100%;
          height: 22px;
          padding-left: 18px;
          font-size: 12px;
          line-height: 22px;
          color: $bg-color;
          background: $bg-line-2;
          border-radius: 4px 4px 0 0;
        }

        .info-item-box {
          width: 100%;
          padding: 11px 18px 0;

          &.info-item-box-2 {
            padding: 0 10px;

            .module-title {
              height: 20px;
              padding-left: 8px;
              margin-bottom: 8px;
              line-height: 20px;
              background: $bg-line-2;

              .lable {
                width: 80px;
              }
            }

            > li {
              padding: 0;
            }
          }

          &.info-item-box-3 {
            .lable {
              width: 100px;
              color: $frontColor_light;
            }
          }

          .spceil-box-p {
            padding: 0 8px;
          }

          .spceil-box {
            width: 50%;
            margin-bottom: 9px;

            .lable {
              width: 40%;
              color: $frontColor_light;
            }

            .value-el {
              width: 60%;
              font-size: 10px;
              color: #5e646f;
              word-break: break-all;
            }

            &:nth-child(even) {
              .lable {
                width: 25%;
              }

              .value-el {
                width: 75%;
              }
            }
          }

          > li {
            padding-bottom: 9px;
          }

          .lable {
            width: 50%;
            font-size: 10px;
            color: #5e646f;
          }

          .flex-grow-el {
            font-size: 10px;
            font-weight: 600;
            color: $bg-color;
          }

          .percent-box {
            position: relative;

            > div {
              width: 85%;
              height: 14px;
              font-family: LucidaGrande;
              font-size: 10px;
              font-weight: 400;
              line-height: 14px;
              color: #fff;
              text-align: center;
              //   background: #76a5ea;
              border-radius: 1px;
            }

            img {
              position: absolute;
              top: 0;
              right: 0;
              width: 16px;
            }
          }
        }
      }

      &:nth-child(even) {
        > div {
          margin-left: 7px;
        }
      }

      &:nth-child(odd) {
        > div {
          margin-right: 7px;
        }
      }
    }
  }

  .mian-box {
    position: relative;

    .empty-el {
      @include center-c;
    }

    h5 {
      position: relative;
      padding-left: 8px;
      margin-bottom: 12px;
      font-size: 13px;
      font-weight: 600;
      line-height: 18px;
      color: #353f53;

      &::after {
        @include center-l;

        left: 0;
        width: 3px;
        height: 10px;
        content: '';
        background: #5c6cc0;
      }
    }

    .info-box {
      width: 100%;

      &.list-box {
        @include scrollbar-style;

        min-height: 500px;
        overflow-y: auto;
      }

      .text-box {
        width: 50%;
        padding-bottom: 10px;

        span {
          font-size: 12px;

          &:nth-child(1) {
            flex: 1;
            width: 134px;
            color: $frontColor_light;
          }

          &:nth-child(2) {
            flex: 3;
            color: $frontColor;
          }

          &.status-el {
            position: relative;
            padding-left: 0;

            img {
              width: 12px;
            }
          }
        }
      }
    }
  }
}

.name-width {
  max-width: 300px;
}
</style>
