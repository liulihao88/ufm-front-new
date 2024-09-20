import { ref } from 'vue'
type TextData = Array<{
  label: string
  type: string
  value: any
  options: any
  name: string
  max?: number
}>
const optionsData1: array = [
  { label: '自动', value: 'auto' },
  { label: '关闭', value: 'off' },
  { label: '开启', value: 'on' },
]
export const copyConfig = ref<TextData>([
  {
    label: '自动在目标系统创建父级目录',
    type: 'select',
    value: 'auto',
    disabled: false,
    options: optionsData1,
    name: 'autoCreateFatherFolder',
  },
  {
    label: '效验文件内容完整性',
    type: 'select',
    value: 'auto',
    disabled: false,
    options: [
      { label: '自动', value: 'auto' },
      { label: '内容', value: 'content' },
      { label: '大小', value: 'size' },
      { label: '忽略', value: 'skip' },
    ],
    name: 'verifyFileContent',
  },
  {
    label: '检查文件是否正在被写入',
    type: 'radio',
    value: false,
    disabled: false,
    options: [],
    name: 'checkFileWritten',
  },
  {
    label: '忽略已经存在的文件',
    type: 'radio',
    value: false,
    disabled: false,
    options: [],
    name: 'ignoreExistFile',
  },
  {
    label: '复制前删除目标文件',
    type: 'radio',
    value: false,
    disabled: false,
    options: [],
    name: 'delTargetFile',
  },
  {
    label: '当成功复制后立即删除源文件',
    type: 'radio',
    value: false,
    disabled: false,
    options: [],
    name: 'delSourceFile',
  },
  {
    label: '同步更新时间至元数据',
    type: 'radio',
    value: true,
    disabled: false,
    options: [],
    name: 'syncUpdateTime',
  },
])

export const copyConfig2 = ref<TextData>([
  {
    label: '优先级',
    type: 'select',
    value: '',
    disabled: false,
    options: [],
    name: '',
  },
  {
    label: '复制顺序',
    type: 'select',
    value: '',
    disabled: false,
    options: [],
    name: '',
  },
])
import type { CascaderProps } from 'ant-design-vue'
const childrenArr: array = [
  {
    value: 'Height',
    label: '优先级高',
  },
  {
    value: 'Low',
    label: '优先级低',
  },
]
export const CascaderPropsoptions: CascaderProps['options'] = [
  {
    value: 'FileCountOfFolder',
    label: '文件数量',
    children: childrenArr,
  },
  {
    value: 'SizeOfFolder',
    label: '目录大小',
    children: childrenArr,
  },
  {
    value: 'DepthOfFolder',
    label: '目录深度',
    children: childrenArr,
  },
  {
    value: 'UpdateTimeOfFolder',
    label: '更新时间',
    children: childrenArr,
  },
  {
    value: 'UpdateFrequencyOfFolder',
    label: '更新频率',
    children: childrenArr,
  },
]

export const lineConfig = ref<TextData>([
  {
    label: '文件复制工作线程数量',
    type: 'number',
    value: 8,
    disabled: false,
    options: [],
    name: 'fileCopyWorkerCount',
  },
  {
    label: '文件/目录处理顺序',
    type: 'select',
    value: 'longestIdle',
    disabled: false,
    name: 'fileCopyPriorityPolicy',
    options: [
      {
        value: 'largest',
        label: '文件最大',
      },
      {
        value: 'latest',
        label: '最晚进入',
      },
      {
        value: 'longestIdle',
        label: '等待最长',
      },
      {
        value: 'oldest',
        label: '最早进入',
      },
    ],
  },
  {
    label: '目录删除工作线程数量',
    type: 'number',
    value: 2,
    disabled: true,
    options: [],
    name: 'dirCopyWorkCount',
  },
  {
    label: '文件删除工作线程数量',
    type: 'number',
    value: 3,
    disabled: true,
    options: [],
    name: 'fileDelWorkCount',
  },
])
// Flash, Normal, Pack
export const speedConfig = ref<TextData>([
  {
    label: '迁移模型',
    type: 'select',
    value: 'Normal',
    options: [
      {
        value: 'Normal',
        label: '正常',
      },
      {
        value: 'Flash',
        label: '快速',
      },
      {
        value: 'Pack',
        label: '压缩',
      },
    ],
    name: 'migrationMode',
  },
  {
    label: '独立传输每个文件',
    type: 'select',
    value: 'Normal',
    options: [
      {
        value: 'Normal',
        label: '正常',
      },
      {
        value: 'Best',
        label: '最好',
      },
      {
        value: 'Fast',
        label: '快速',
      },
      {
        value: 'None',
        label: '不处理',
      },
    ],
    name: 'compressLevel',
  },
  {
    label: '最大可打包文件大小(MB)',
    type: 'number',
    value: 5,
    max: 128,
    options: [],
    name: 'maximumPackableFileSize',
    // name:"maximumAggregatedFileSize"
  },
  {
    label: '聚合数据包大小上限(MB）',
    type: 'number',
    value: 50,
    max: 256,
    options: [],
    name: 'maximumPackageSize',
    // maximumAggregatePacketSize
  },
  {
    label: '聚合数据包内数据体数量上限',
    type: 'number',
    value: 2500,
    max: 5000,
    options: [],
    // name:"upperLimit"
    name: 'maximumFilePackageCount',
  },
])

export const delConfig = ref<TextData>([
  {
    label: '当目标文件删除后删除相关元数据',
    type: 'select',
    value: 'auto',
    disabled: false,
    options: optionsData1,
    name: '',
  },
  {
    label: '当目标目录删除后删除相关元数据',
    type: 'radio',
    value: false,
    disabled: false,
    options: [],
    name: '',
  },
])

export const columnsShine: any = [
  {
    title: '序号',
    dataIndex: 'index',
    width: '6%',
  },
  {
    title: '左侧映射',
    children: [
      {
        title: '数据空间',
        dataIndex: 'leftSpace',
      },
      {
        title: '路径',
        dataIndex: 'leftPath',
        width: '12%',
      },
    ],
  },
  {
    title: '右侧映射',
    children: [
      {
        title: '数据空间',
        dataIndex: 'rightSpace',
      },
      {
        title: '路径',
        dataIndex: 'rightPath',
        width: '12%',
      },
    ],
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
  },
]

export const columnsMetadata: any = [
  {
    title: '序号',
    dataIndex: 'index',
    width: '6%',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '元数据关系',
    dataIndex: 'type',
  },
  {
    title: '测试结果',
    dataIndex: 'result',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '12%',
  },
]

export const transformConfig = ref([
  {
    label: '开启分片传输',
    type: 'select',
    value: 'on',
    options: [
      { label: '自动', value: 'auto' },
      { label: '打开', value: 'on' },
      { label: '关闭', value: 'off' },
    ],
    name: 'enableMultipartUpload',
  },
  {
    label: '当传输的文件大小大于此值时启用分片(MB)',
    type: 'number',
    value: 5120,
    name: 'multipartUploadTriggerSizeInMB',
    disabled: true,
  },
  {
    label: '分片最大大小(MB)',
    type: 'number',
    value: 1024,
    name: 'multipartUploadPartSizeInMB',
    disabled: true,
  },
  {
    label: '同时传输的分片数量',
    type: 'number',
    value: 3,
    max: 30,
    name: 'multipartUploadWorkerCount',
    disabled: true,
  },
])
