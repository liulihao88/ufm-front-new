<template>
  <div class="task-details-box">
    <div class="content-des">
      <div class="run-num">
        <h6>运行次数</h6>
        <strong>{{ runtimeInfo.totalWorkSeconds }}</strong>
      </div>
      <div class="el-box el-box-1" style="width: 46%; margin-right: 16px">
        <div class="title title-2">
          <svg-icon name="quota_icon2" width="16px" height="16px" />
          <h5>性能</h5>
        </div>
        <ul class="quota-box">
          <li class="info-3">
            <span>近期：</span>
            <span class="num">{{ performance.recentSucceedBytes }} Byte/s</span>
            <span class="num">{{ performance.recentMaxworkerCount }} Kbps/s</span>
            <span class="num">{{ performance.recentSucceedCount }} /F {{ performance.recentUnit }}s</span>
          </li>
          <li class="info-3">
            <span>平均：</span>
            <span class="num">{{ performance.averageSucceedBytesPerSec }} Byte/s</span>
            <span class="num">{{ performance.averageSucceedCountPerSec }} Kbps/s</span>
            <span class="num">{{ performance.succeedBytesPerSec }} /F {{ performance.succeedCountPerSec }}s</span>
          </li>
        </ul>
      </div>
      <div class="el-box el-box-2" style="width: 54%">
        <div class="title title-3">
          <svg-icon name="quota_icon1" width="16px" height="16px" />
          <h5>运行信息</h5>
        </div>
        <ul class="quota-box quota-box-2">
          <li>
            <span>总任务数：</span>
            <span>{{ runtimeInfo.totalWorkSeconds }}</span>
          </li>
          <li>
            <span>运行任务：</span>
            <span>{{ runtimeInfo.totalWorkSeconds }}</span>
          </li>
          <li>
            <span>成功次数：</span>
            <span>{{ runtimeInfo.totalSucceedCount }}</span>
          </li>
          <li>
            <span>失败次数：</span>
            <span>{{ runtimeInfo.totalFailedCount }}</span>
          </li>
          <li>
            <span>忽略次数：</span>
            <span>{{ runtimeInfo.totalIgnoreCount }}</span>
          </li>
          <li>
            <span>最后工作时间：</span>
            <span>{{ runtimeInfo.lastWorkTime ? timeStampType2(runtimeInfo.lastWorkTime) : '-' }}</span>
          </li>
        </ul>
      </div>
    </div>
    <img src="../../../assets/image/bottom.png" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { timeStampType2, timeStampType } from '@/mixin/mixin'
type DetailsData = {
  recentStr: string
  averageStr: string
  copy: string
  invaild: string
  transTime: string
  ignore: string
  lastTime: string
  fail: string
  runNum: number
  laststartTime: string
}
export default defineComponent({
  components: {},
  props: {
    detailsInfo: {
      type: Object,
      default: null,
    },
    itemInfo: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const detailsData = ref<DetailsData>({
      recentStr: '-',
      averageStr: '-',
      copy: '-',
      invaild: '-',
      transTime: '-',
      ignore: '-',
      lastTime: '-',
      fail: '-',
      runNum: 0,
      laststartTime: '-',
    })
    watch(
      () => props.detailsInfo,
      (newVal) => {
        console.log(newVal, 'newVal')
        let data: object = newVal
        if (data) {
          let obj: object = {
            recentStr: '-',
            averageStr: data.performance.averageSucceedCountPerSec,
            copy: '-',
            invaild: '-',
            transTime: '-',
            ignore: '-',
            lastTime: '-',
            fail: '-',
            runNum: data.performance.recentMaxWorkerCount,
            laststartTime: timeStampType(data.startTimeMillis),
          }
          detailsData['value'] = obj
        }
      },
    )
    const performance = ref<object>({
      averageSucceedBytesPerSec: '0',
      averageSucceedCountPerSec: '0',
      recentMaxworkerCount: '0',
      recentSucceedBytes: '0',
      recentSucceedCount: '0.0',
      recentUnit: '0',
      succeedBytesPerSec: '0',
      succeedCountPerSec: '0',
    })

    const runtimeInfo = ref<object>({
      lastworkTime: 0,
      'totalFailedCount ': 0,
      'totalIgnoreCount ': 0,
      totalSize: 0,
      totalSucceedCount: 0,
      totalworkSeconds: 0,
    })
    const itemInfoFn = (data: object) => {
      if (data.runtimeInfo) {
        runtimeInfo['value'] = JSON.parse(data.runtimeInfo)
        console.log(runtimeInfo['value'], '===runtimeInfo')
      }
      if (data.performance) {
        performance['value'] = JSON.parse(data.performance)
        console.log(performance['value'], '==performance')
      }
    }
    if (props.itemInfo) {
      console.log(props.itemInfo, '??')
      itemInfoFn(props.itemInfo)
    }
    watch(
      () => props.itemInfo,
      (newVal) => {
        console.log(newVal, 'itemInfoitemInfoitemInfoitemInfoitemInfo')
        itemInfoFn(newVal)
      },
    )
    return {
      detailsData,
      performance,
      runtimeInfo,
      timeStampType2,
    }
  },
})
</script>

<style lang="scss">
.task-details-box {
  position: relative;
  width: 98%;
  height: 136px;
  background: linear-gradient(102.2deg, #b7d5fd33 0%, #e5e7f4ff 82%, #f9fbffff 100%);

  img {
    position: absolute;
    top: 8px;
    right: -27px;
    z-index: 0;
    width: 180px;
  }

  .content-des {
    position: relative;
    z-index: 1;
    display: flex;
    padding: 20px 0 20px 14px;

    .run-num {
      width: 90px;
      height: 94px;
      margin-right: 14px;
      background: #fff;
      border: 1px solid #3c6cf863;
      border-radius: 2px;

      h6 {
        position: relative;
        padding-top: 5px;
        padding-left: 12px;
        font-size: 12px;
        color: $frontColor_light;
        text-align: center;

        &::after {
          position: absolute;
          bottom: 5px;
          left: 12px;
          width: 6px;
          height: 6px;
          content: '';
          background: #446fef;
          border-radius: 50%;
        }
      }

      strong {
        display: block;
        font-size: 45px;
        font-weight: 600px;
        line-height: 60px;
        color: #446fef;
        text-align: center;
      }
    }

    .el-box {
      position: relative;
      flex: auto;
      height: 96px;
      background: #fff;
      border-radius: 2px;

      &.el-box-2 {
        border: 1px solid #dae2fc;
      }

      &.el-box-1 {
        border: 1px solid #c2e7e0;
      }

      .quota-box {
        position: absolute;
        top: 0;
        left: 96px;
        width: calc(100% - 96px);

        li {
          position: relative;
          padding-left: 27px;

          &.info-3 {
            .num {
              display: inline-block;
              width: 28%;
              padding: 2px 10px;
              margin-left: 5px;
              background: $bg-line;
            }
          }

          &:nth-child(1) {
            padding-top: 19px;
          }

          &:nth-child(2) {
            padding-top: 10px;
          }

          &::after {
            position: absolute;
            bottom: 8px;
            left: 16px;
            width: 6px;
            height: 6px;
            content: '';
            background: rgb(5 185 139);
            border-radius: 50%;
          }
        }
      }

      .quota-box-2 {
        left: 110px;
        display: flex;
        flex-wrap: wrap;
        width: calc(100% - 110px);

        li {
          flex: auto;
          width: 30%;

          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3) {
            padding-top: 19px;
          }

          &:nth-child(4),
          &:nth-child(5),
          &:nth-child(6) {
            padding-top: 21px;
          }

          &:nth-child(6),
          &:nth-child(3) {
            width: 40%;
          }

          &::after {
            background: rgb(68 111 239);
          }
        }
      }

      .title {
        position: relative;
        height: 94px;

        &.title-2 {
          width: 96px;
          background: rgb(5 185 139 / 20%);

          h5 {
            @include center-l;

            left: 44px;
          }

          svg {
            @include center-l;

            left: 24px;
          }
        }

        &.title-3 {
          width: 95px;
          background: rgb(68 111 239 / 20%);

          h5 {
            @include center-l;

            left: 30px;
          }

          svg {
            @include center-l;

            left: 10px;
          }
        }
      }
    }
  }
}
</style>
