<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { pick } from 'lodash-es'
const isShow = ref(false)
const rowData = ref({})

const open = (row) => {
  isShow.value = true
  rowData.value = pick(row, ['injector', 'key', 'value'])
  rowData.value.name = rowData.value.key
  delete rowData.value.key
  devTest()
}

const devTest = () => {
  if (proxy.$dev) {
    model.value = {
      fileName: proxy.uuid('fileName'),
      filePath: proxy.uuid('filePath'),
      fileCreateTime: 1721364774000,
      fileLastModifyTime: 1721923200000,
      fileContent: proxy.uuid('fileContent'),
    }
  }
}

const model = ref({
  fileName: '',
  filePath: '',
  fileCreateTime: '',
  fileLastModifyTime: '',
  fileContent: '',
})
const formRef = ref()
const rules = {
  fileName: [proxy.validate()],
  filePath: [proxy.validate()],
  fileCreateTime: [proxy.validate('请选择文件创建时间')],
  fileLastModifyTime: [proxy.validate('请选择文件最后更新时间')],
  fileContent: [proxy.validate()],
}

const fieldList = [
  {
    label: '文件名称',
    prop: 'fileName',
  },
  {
    label: '文件路径',
    prop: 'filePath',
  },
  {
    label: '文件创建时间',
    prop: 'fileCreateTime',
    comp: 'g-date',
  },
  {
    label: '文件最后更新时间',
    prop: 'fileLastModifyTime',
    comp: 'g-date',
  },
  {
    label: '文件内容',
    prop: 'fileContent',
    attrs: {
      type: 'textarea',
    },
  },
]
const confirm = async () => {
  await formRef.value.validate()
  let mergeReqData = Object.assign({}, rowData.value, model.value)
  proxy.log(`  model.value`, model.value, '/cyrd/ufm-front/src/views/task/module/metaDataComps/metaTestDialog.vue')
  let res = await proxy.request({
    url: '/task/public/metaInject/test',
    method: 'post',
    data: mergeReqData,
  })
  isShow.value = false
  proxy.$toast(proxy.formatNewLines(res), {
    duration: 5000,
    dangerouslyUseHTMLString: true,
  })
}

defineExpose({
  open,
})
</script>

<template>
  <div>
    <o-dialog ref="dialogRef" v-model="isShow" title="metaTestDialog" @confirm="confirm">
      <o-form ref="formRef" :model="model" :fieldList="fieldList" :rules="rules" />
    </o-dialog>
  </div>
</template>
