<script setup lang="ts">
import { ref, watch, getCurrentInstance } from 'vue'
import { Empty } from 'ant-design-vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
const { proxy } = getCurrentInstance()

const baseIsOpen = ref(false)

const props = defineProps({
  detailsInfo: {
    type: Object,
    default: null,
  },
  mapAllList: {
    type: Array,
    default: null,
  },
})
const rightDataArr = ref([
  {
    name: '运行状态：',
    value: 'status',
    type: 'status',
  },
  {
    name: '编号：',
    value: 'id',
    type: 'id',
  },
  {
    name: '任务名：',
    value: 'name',
    type: 'name',
  },
  {
    name: '映射名：',
    value: 'hostname',
    type: 'hostname',
  },
  {
    name: '服务状态：',
    value: 'serviceStatus',
    type: 'serviceStatus',
  },
  {
    name: '开始时间：',
    value: 'lastStartTime',
    type: 'lastStartTime',
  },
  {
    name: '端口：',
    value: 'mapiPort',
    type: 'mapiPort',
  },
  {
    name: '结果：',
    value: 'execResult',
    type: 'execResult',
  },
])

const mapAllListV = ref([])

const isShow = ref<boolean>(false)
const isSelect = ref<boolean>(props.isSelect)
watch(
  () => props.isSelect,
  (newVal) => {
    isSelect['value'] = newVal
  },
)
watch(
  () => props.mapAllList,
  (newVal) => {
    mapAllListV['value'] = []
    if (newVal && newVal.length > 0) {
      newVal.forEach((item: object) => {
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
        let modelStatisticLeft: object = moduleArrFn(leftData)
        let modelStatisticRight: object = moduleArrFn(rightData)
        const commonArrFn = (data: object) => {
          let arr: any = [
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
        mapAllListV['value'].push(obj)
      })
    }
    isShow['value'] = true
  },
)
watch(
  () => props.detailsInfo,
  (newVal) => {
    initBaseInfo(newVal)
  },
)
const closeFn = () => {
  emits('closeFn', false)
}
const openInfoBoxFn = (index: number) => {
  mapAllListV['value'].forEach((item, i) => {
    if (index == i) {
      item.isOpen = !item.isOpen
    } else {
      item.isOpen = false
    }
    baseIsOpen.value = item.isOpen
  })
}

const initBaseInfo = (data: object) => {
  if (data) {
    rightDataArr['value'].map((item) => {
      Object.keys(data).forEach((el) => {
        if (item.value == el) {
          if (el === 'startTimeMillis' || el === 'lastStartTime') {
            item.value = data[el] ? proxy.formatTime(data[el]) : '-'
          } else {
            if (data[el]) {
              if (data[el].length > 30 && el === 'name') {
                item.value = data[el].substring(0, 20) + '...'
              } else {
                item.value = data[el]
              }
            } else {
              item.value = '-'
            }
          }
        }
      })
    })
  }
}
initBaseInfo(props.detailsInfo)
</script>
