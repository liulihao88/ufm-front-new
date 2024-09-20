import { ref } from 'vue'
type FileDataList = Array<{
  name: string
  value: string
  icon: string
  isSelect: boolean
}>
// 控制设置、高级、代理
const systemName: any = ref<string>('LFS')

const systemValue: any = ref<string>('LFS')

const leftTitle = ref<string>('新建')

const fileData: FileDataList = [
  {
    name: '10.0.11.12',
    value: 'LFS',
    icon: 'icon_1.png',
    isSelect: false,
  },
  {
    name: '10.0.11.123',
    value: 'S3-OSS',
    icon: 'icon_1.png',
    isSelect: false,
  },
]

const fileDataList = ref<FileDataList>([...fileData])

const isDisabled = ref<boolean>(false)

const selectFeilFn = (el: any) => {
  leftTitle.value = '编辑'
  fileDataList.value.forEach((item: any) => {
    item.isSelect = false
    if (item.name == el.name) {
      item.isSelect = true
      systemName.value = item.value
      systemValue.value = item.value
    }
  })
  isDisabled.value = true
}
const newFileFn = () => {
  systemName.value = 'LFS'
  systemValue.value = 'LFS'
  leftTitle.value = '新建'
  fileDataList.value.forEach((item: any) => {
    item.isSelect = false
  })
  isDisabled.value = false
}
const delFileFn = () => {
  let isHave: boolean = false
  let name: string = ''
  fileDataList.value.forEach((item: any) => {
    if (item.isSelect) {
      isHave = true
      name = item.name
    }
  })
  if (!isHave) {
    octAlert('message', '请选择需要删除的文件系统连接')
  } else {
    octAlert('open', '您确认删除 ' + name + ' ?')
  }
}

interface LeftDataInfoAll {
  systemName: string
  systemValue: string
  leftTitle: string
  fileData: any
  fileDataList: any
  isDisabled: boolean
  selectFeilFn: any
  newFileFn: any
  delFileFn: any
}

const leftDataInfoAll: LeftDataInfoAll = {
  systemName: systemName.value,
  systemValue: systemValue.value,
  leftTitle: leftTitle.value,
  fileData: fileData.value,
  fileDataList: fileDataList.value,
  isDisabled: isDisabled.value,
  selectFeilFn,
  newFileFn,
  delFileFn,
}

const countDataFn = () => {
  return leftDataInfoAll
}
export { countDataFn }
