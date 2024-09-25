<script setup lang="ts">
import { ref, getCurrentInstance, nextTick, watch, h } from 'vue'
import metaDialog from './metaDialog.vue'
import MetaTestDialog from '@/views/task/module/metaDataComps/metaTestDialog.vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
  taskEditData: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})

const options = ref([])
const formRef = ref(null)
const metaDialogRef = ref(null)
const metaTestDialogRef = ref(null)

const testRow = async (row) => {
  metaTestDialogRef.value.open(row)
}

const editRow = async (row, scope) => {
  if (!row.value) {
    metaDialogRef.value.open(row, scope.$index)
    return
  }
  let { res, err } = await proxy.asyncWrapper(proxy.request, {
    url: 'task/public/metaInject/toInjector',
    method: 'post',
    data: {
      injector: row.injector,
      name: row.key,
      value: row.value,
    },
    showError: false,
  })
  if (err) {
    proxy
      .confirm(err.message, {
        confirmButtonText: '确定',
        customStyle: {
          maxWidth: '70%',
        },
        message: () => h('div', null, [h('div', { class: 'm-t-16 bold' }, err.message), renderDetails(err.details)]),
      })
      .finally(() => {
        metaDialogRef.value.open(row, scope.$index)
      })
  } else {
    metaDialogRef.value.open(res, scope.$index)
  }
  function renderDetails(details) {
    return h(
      'div',
      {
        style: {
          'max-height': '80vh',
          'overflow-y': 'auto',
        },
      },
      details ? details : '',
    )
  }
}

const deleteRow = async (row, scope) => {
  form.value.metaDataInjects.splice(scope.$index, 1)
}
const columns = [
  {
    label: '名称',
    prop: 'key',
    useSlot: true,
    width: 300,
  },
  {
    label: '类型',
    prop: 'injector',
    useSlot: true,
    width: 200,
  },
  {
    label: '值',
    prop: 'value',
    useSlot: true,
  },
  {
    label: '操作',
    prop: 'operation',
    maxBtns: 3,
    btns: [
      {
        content: '测试',
        type: 'primary',
        prop: 'test',
        handler: testRow,
        disabled: (row) => {
          return !row.value || !row.key
        },
      },
      {
        content: '编辑',
        type: 'primary',
        disabled: (row) => {
          return !row.key
        },
        handler: editRow,
      },
      {
        content: '删除',
        type: 'primary',
        handler: deleteRow,
      },
    ],
  },
]

const formRules = ref({
  key: [
    proxy.validate('custom', { message: '名称必填且只能由英文、数字、下划线、中划线组成', reg: /^[a-zA-Z0-9_-]+$/ }),
  ],
  injector: [{ required: true, message: '请选择', trigger: ['change', 'blur'] }],
  value: [{ required: true, message: '请生成值', trigger: ['change', 'blur'] }],
})

const form = ref({
  enableMetaDataInject: false,
  metaDataInjects: proxy.$dev
    ? [
        {
          key: 'name1',
          injector: 'Constant',
        },
        // {
        //   key: 'name2',
        //   injector: 'Contains',
        // },
        // {
        //   key: 'name3',
        //   injector: 'Concat',
        // },
        // {
        //   key: 'name4',
        //   injector: 'Replace',
        // },
        // {
        //   key: 'name5',
        //   injector: 'Substring',
        // },
        // {
        //   key: 'name6',
        //   injector: 'Regex',
        // },
        // {
        //   key: 'name7',
        //   injector: 'FileProperty',
        // },
        // {
        //   key: 'name8',
        //   injector: 'TextFileContentOfRow',
        // },
        // {
        //   key: 'name9',
        //   injector: 'JavaCode',
        // },
      ]
    : [],
})

watch(
  () => props.taskEditData,
  (val) => {
    form.value.enableMetaDataInject = val.enableMetaDataInject
    if (val.metaDataInjects) {
      form.value.metaDataInjects = val.metaDataInjects.map((v) => {
        let addInjectorRes = {
          key: v.key,
          value: v.value,
          injector: v.value.split(':')[0],
        }
        return addInjectorRes
      })
    }
  },
  {
    immediate: true,
  },
)

function formatNewLines(str) {
  // 如果 str 为空或者不是字符串类型，则直接返回 str
  if (!str || typeof str !== 'string') {
    return str
  }
  // 替换换行符 \n 为 <br> 标签
  str = str.replace(/\n/g, '<br>')
  // 替换制表符 \t 为四个空格或其他适当的字符
  str = str.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
  return str
}

function handleProp(scope, val) {
  let res = `metaDataInjects.${scope.$index}.${val}`
  return res
}
function addNew() {
  form.value.metaDataInjects.push({
    key: '',
    injector: options.value[0].value,
  })
}
getOptionsData()
async function getOptionsData() {
  let res = await proxy.request({
    url: '/task/public/metaInject/injectors',
  })
  const map = {
    Constant: '常量',
    Contains: '包含判断',
    Concat: '字符串拼接',
    Replace: '字符串替换',
    Substring: '子字符串',
    Regex: '正则表达式',
    FileProperty: '文件属性',
    TextFileContentOfRow: '文本文件内容',
    JavaCode: 'java代码',
  }
  options.value = res.map((v) => {
    return {
      ...v,
      label: map[v.value],
    }
  })
}
const success = (value, index) => {
  form.value.metaDataInjects[index].value = value
}

const $getData = async () => {
  if (!form.value.enableMetaDataInject) {
    return { enableMetaDataInject: form.value.enableMetaDataInject }
  }
  await proxy.validForm(formRef, { detail: false, message: '元数据提取表单校验错误, 请检查' })
  let cloneForm = proxy.clone(form.value)
  cloneForm.metaDataInjects = form.value.metaDataInjects.map((v) => {
    return {
      key: v.key,
      value: v.value,
    }
  })
  return cloneForm
}
async function isTest83() {
  let res = await $getData()
}
defineExpose({
  $getData,
})
</script>

<template>
  <div class="table-box">
    <div class="f m-b-16">
      <g-switch v-model="form.enableMetaDataInject" active-text="开启元数据提取" />
      <el-button type="primary" :disabled="!form.enableMetaDataInject" class="ml2" @click="addNew">新增</el-button>
    </div>
    <el-form ref="formRef" :model="form" size="small" @submit.native.prevent>
      <o-table :columns="columns" :data="form.metaDataInjects" :emptyText="null" :showPage="false">
        <template #key="{ scope, row }">
          <template v-if="scope.$index !== -1">
            <el-form-item class="" :prop="handleProp(scope, 'key')" :rules="formRules.key">
              <o-input v-model.trim="form.metaDataInjects[scope.$index].key" width="90%" size="small" />
            </el-form-item>
          </template>
        </template>

        <template #injector="{ scope, row }">
          <template v-if="scope.$index !== -1">
            <el-form-item class="" :prop="handleProp(scope, 'injector')" :rules="formRules.injector">
              <o-select
                v-model="form.metaDataInjects[scope.$index].injector"
                width="90%"
                :clearable="false"
                :options="options"
              />
            </el-form-item>
          </template>
        </template>

        <template #value="{ scope, row }">
          <template v-if="scope.$index !== -1">
            <el-form-item class="" :prop="handleProp(scope, 'value')" :rules="formRules.value">
              <o-input v-model="form.metaDataInjects[scope.$index].value" width="90%" disabled />
            </el-form-item>
          </template>
        </template>
      </o-table>
    </el-form>
    <metaDialog ref="metaDialogRef" @success="success" />
    <MetaTestDialog ref="metaTestDialogRef" />
  </div>
</template>

<style scoped lang="scss">
.table-box {
  :deep(.el-table__body .el-table__cell) {
    height: 54px;
    line-height: 54px;
  }
}
</style>
