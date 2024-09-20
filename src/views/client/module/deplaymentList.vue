<template>
  <a-form :model="formState" name="basic" layout="inline" autocomplete="off" class="client-item-box">
    <a-form-item>
      <a-button type="primary" html-type="submit" @click="testFn">检测</a-button>
      <a-button type="primary" html-type="submit" @click="batchInstallFn">批量安装</a-button>
      <a-button type="primary" html-type="submit" @click="batchUninstallFn">批量卸载</a-button>
      <a-button type="primary" html-type="submit" @click="stopFn">批量停止</a-button>
      <a-button type="primary" html-type="submit" @click="saveFn">保存</a-button>
      <a-button type="primary" html-type="submit" @click="clearFn">清空</a-button>
      <a-button type="primary" html-type="submit" @click="selectUndeployFn">选择未部署项</a-button>
      <a-button type="primary" html-type="submit" @click="selectDeployedFn">选择已部署项</a-button>
      <a-button type="primary" html-type="submit" @click="cancelSelectFn">取消选择</a-button>
      <a-button type="primary" html-type="submit" @click="exportFn">导出结果</a-button>
    </a-form-item>
  </a-form>
  <div class="table-box">
    <!-- <div style="margin-bottom: 16px">
                        <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">
                            Reload
                        </a-button>
                        <span style="margin-left: 8px">
                             {{ `Selected ${selectedRowKeys.length} items` }}
                        </span>
                    </div> -->
    <a-table
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :columns="columns"
      :data-source="data"
    >
      <template #bodyCell="{ column }">
        <template v-if="column.dataIndex === 'operation'">
          <a-space>
            <a-button>检测</a-button>
            <a-button>停止</a-button>
            <a-button>安装</a-button>
            <a-button>卸载</a-button>
          </a-space>
        </template>
        <template v-if="column.dataIndex === 'status'">
          <a-space class="tag-box">
            <a-tag color="#f50">无效</a-tag>
            <a-tag color="#2db7f5">NG</a-tag>
            <a-tag color="#87d068">未知</a-tag>
            <a-tag color="#108ee9">未知</a-tag>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
  <AModalNew
    :visible="isVisible"
    :visible_input="false"
    title="提示"
    type="tips"
    :data="alertData"
    @handleBackFn="handleBackFn"
    @cancelBackFn="cancelBackFn"
  />
</template>
<script lang="ts">
import { message } from 'ant-design-vue'
import { defineComponent, reactive, ref, computed, toRefs } from 'vue'
type Key = string | number
const columns = [
  {
    title: 'IP地址',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
]

export default defineComponent({
  components: {},
  setup() {
    const data = ref<any>([])
    for (let i = 0; i < 46; i++) {
      data['value'].push({
        key: i,
        ip: `10.1.11.1`,
        status: 32,
        operation: '',
      })
    }
    const state = reactive<{
      selectedRowKeys: Key[]
      loading: boolean
    }>({
      selectedRowKeys: [],
      loading: false,
    })
    const hasSelected = computed(() => state.selectedRowKeys.length > 0)
    const start = () => {
      state.loading = true
      setTimeout(() => {
        state.loading = false
        state.selectedRowKeys = []
      }, 1000)
    }
    const selectedRowKeysT = ref<number[]>()
    const onSelectChange = (selectedRowKeys: Key[]) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      state.selectedRowKeys = selectedRowKeys
      selectedRowKeysT['value'] = selectedRowKeys
    }
    const activeKey = ref<string>('1')
    const op_btn_name = ref<string>('')
    const isVisible = ref<boolean>(false)
    const alertData = ref<any>({
      text: '',
      value: '',
    })
    const commonFn = (str) => {
      isVisible['value'] = true
      alertData['value'].text = str
    }
    const showModal = () => {
      commonFn('确认重启请输入YES')
    }
    const onClose = () => {
      commonFn('确认关闭请输入YES')
    }
    const handleBackFn = () => {
      isVisible['value'] = false
      switch (op_btn_name['value']) {
        case 'stop':
          console.log('调用批量停止')
          break
      }
    }
    const cancelBackFn = () => {
      isVisible['value'] = false
    }
    const selectCommonFn = (str, fn, str2) => {
      if (!selectedRowKeysT['value']) {
        message.info(str)
        return false
      }
      if (selectedRowKeysT['value'].length > 0) {
        console.log('请求批量安装')
        if (fn) {
          fn(str2)
        }
      } else {
        message.info(str)
      }
    }
    const testFn = () => {
      op_btn_name['value'] = 'test'
    }
    const batchInstallFn = () => {
      op_btn_name['value'] = 'batchInstall'
      selectCommonFn('请选择需要安装的节点！', commonFn, '确认安装所选的节点？')
    }
    const batchUninstallFn = () => {
      op_btn_name['value'] = 'batchUninstall'
      selectCommonFn('请选择需要卸载的节点！', commonFn, '确认卸载所选的节点？')
    }
    const stopFn = () => {
      op_btn_name['value'] = 'stop'
      selectCommonFn('请选择需要停止的节点！', commonFn, '确认停止所有的节点？')
    }
    const saveFn = () => {
      op_btn_name['value'] = 'save'
    }
    const clearFn = () => {
      op_btn_name['value'] = 'clear'
      console.log('清空')
      data['value'] = []
    }
    const selectUndeployFn = () => {
      op_btn_name['value'] = 'selectUndeploy'
    }

    const selectDeployedFn = () => {
      op_btn_name['value'] = 'selectDeployed'
    }
    const cancelSelectFn = () => {
      op_btn_name['value'] = 'cancelSelect'
      state.selectedRowKeys = []
    }
    const exportFn = () => {
      op_btn_name['value'] = 'export'
    }
    return {
      data,
      columns,
      hasSelected,
      ...toRefs(state),
      start,
      onSelectChange,
      activeKey,
      alertData,
      showModal,
      onClose,
      handleBackFn,
      cancelBackFn,
      isVisible,
      testFn,
      batchInstallFn,
      batchUninstallFn,
      stopFn,
      saveFn,
      clearFn,
      selectUndeployFn,
      selectDeployedFn,
      cancelSelectFn,
      exportFn,
    }
  },
})
</script>
<style scoped lang="scss">
.client-item-box {
  padding: 0 30px 16px;

  .ant-form-item-control-input-content {
    .ant-btn {
      margin-right: 16px;
    }
  }
}

.table-box {
  padding: 0 30px;
  border-top: 1px solid #eee;

  .tag-box {
    .ant-tag {
      padding: 0 10px;
    }
  }
}
</style>
