<template>
  <o-dialog ref="dialogRef" v-model="isShow" title="整体状态" width="1050">
    <div class="overall-content">
      <div class="content-box line-el">
        <o-title title="基本状态信息" b="16" />
        <ul class="info-content">
          <li class="item-el">
            <div class="seat-el">
              <span>总任务：</span>
              <p>{{ detailsInfoV.totalTaskCount }}</p>
            </div>
            <div>
              <span>运行任务：</span>
              <p>{{ detailsInfoV.runningTaskCount }}</p>
            </div>
          </li>
          <li class="item-el">
            <div class="seat-el">
              <span>总处理大小：</span>
              <p>{{ detailsInfoV.totalSize }}</p>
            </div>
            <div>
              <span>总成功数量：</span>
              <p>{{ detailsInfoV.totalSucceedCount }}</p>
            </div>
          </li>
          <li class="item-el">
            <div class="seat-el">
              <span>总失败数量：</span>
              <p>{{ detailsInfoV.totalFailedCount }}</p>
            </div>
            <div>
              <span>总略过数量：</span>
              <p>{{ detailsInfoV.totalIgnoreCount }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="content-box">
        <o-title title="性能状态信息" b="16" />
        <ul class="info-content">
          <li class="item-el flex-sp-box">
            <span>近期总性能：</span>
            <p>{{ detailsInfoV.recentSucceedBytes }}</p>
            <p>{{ detailsInfoV.recentSucceedBitPerSec }}</p>
            <p>
              {{ detailsInfoV.recentSucceedCount }}
            </p>
          </li>
          <li class="item-el flex-sp-box">
            <span>平均总性能：</span>
            <p>{{ detailsInfoV.averageSucceedBytesPerSec }}</p>
            <p>{{ detailsInfoV.averageSucceedBitPerSec }}</p>
            <p>
              {{ detailsInfoV.averageSucceedCountPerSec }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </o-dialog>
</template>
<script lang="ts" setup>
import { ref, watch, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  detailsInfo: {
    type: Object,
    default: null,
  },
})

const isShow = ref(false)
const detailsInfoV = ref({
  totalTaskCount: 0,
  runningTaskCount: 0,
  totalSize: 0,
  totalSucceedCount: 0,
  totalFailedCount: 0,
  totalIgnoreCount: 0,
  recentSucceedBytes: 0,
  recentSucceedCount: 0,
  totalWorkSeconds: 0,
  recentUnit: 0,
  averageSucceedBytesPerSec: 0,
  averageSucceedCountPerSec: 0,
})
const timer = ref(null)
watch(isShow, (val) => {
  if (val) {
    init()
    timer.value = setInterval(init, 5000)
  } else {
    clearInterval(timer.value)
  }
})

async function init() {
  let res = await proxy.request({
    url: `task/public/runtime/info`,
  })
  detailsInfoV.value = res
}

function open() {
  isShow.value = true
}

defineExpose({
  open: open,
})
</script>

<style lang="scss" scoped>
.overall-content {
  width: 1000px;

  .content-box {
    padding: 24px 24px 8px;

    &.line-el {
      position: relative;

      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        content: '';
        background: #5c6bbf1a;
      }
    }

    .title-el {
      padding-bottom: 10px;
      font-size: 14px;
      font-weight: 400;
      color: #373f51;
    }

    .info-content {
      .item-el {
        display: flex;
        padding-bottom: 12px;
        line-height: 28px;

        &.flex-sp-box {
          p {
            flex: 1;
            margin-right: 24px;

            &:nth-last-child(1) {
              margin: 0;
            }
          }
        }

        div {
          display: flex;
          flex: 1;

          &.seat-el {
            padding-right: 12px;
          }
        }

        span {
          width: 91px;
          font-size: 12px;
          font-weight: 400;
          color: #8b8f9d;
        }

        p {
          flex-grow: 1;
          height: 28px;
          padding-left: 10px;
          background: #fff;
          border: 1px solid #dbe0e7;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
