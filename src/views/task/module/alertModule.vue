<template>
  <div v-if="typeVal_v == 'Contanins'">
    <div class="input-parent">
      <h3>数据源</h3>
      <SelectItem lableStr="" :optionArr="optionData" :valueString="moduleVal" @changeSystemFn="changeSelectFn" />
    </div>
    <div class="input-parent">
      <h3>内容文本</h3>
      <a-input v-model:value="containVal" placeholder="请输入名称" class="path-el" @pressEnter="containFn" />
    </div>
    <div class="input-parent">
      <h3>包含</h3>
      <a-input v-model:value="containVal" placeholder="请输入名称" class="path-el" @pressEnter="containFn" />
    </div>
    <div class="input-parent">
      <h3>排除</h3>
      <a-input v-model:value="containVal" placeholder="请输入名称" class="path-el" @pressEnter="containFn" />
    </div>
  </div>
  <div v-if="typeVal_v == 'FileProperty'">
    <div class="input-parent">
      <h3>规则</h3>
      <SelectItem lableStr="" :optionArr="optionData" :valueString="moduleVal" @changeSystemFn="changeSelectFn" />
    </div>
    <div class="input-parent">
      <h3>数据格式</h3>
      <SelectItem lableStr="" :optionArr="optionData" :valueString="moduleVal" @changeSystemFn="changeSelectFn" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import {} from '@ant-design/icons-vue'

interface optionItem {
  name: string
  value: string
}

export default defineComponent({
  components: {},
  mixins: [],
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const optionData: optionItem[] = []
    const moduleVal: string = ''
    const containVal: string = ''
    const typeVal_v = ref<string>('')
    const changeSelectFn = () => {}
    const containFn = () => {}
    const handleOk = () => {}
    const cancelFn = () => {}
    typeVal_v['value'] = props.type
    watch(
      () => props.type,
      (newVal) => {
        typeVal_v['value'] = newVal
      },
      { immediate: true, deep: true },
    )
    return {
      moduleVal,
      containVal,
      optionData,
      containFn,
      changeSelectFn,
      handleOk,
      cancelFn,
      typeVal_v,
    }
  },
})
</script>

<style lang="scss">
.functional-box {
  color: $frontColor2;

  .input-parent {
    padding-top: 6px;

    h3 {
      font-size: 14px;
    }

    .ip-list-box {
      max-height: 314px;
      padding: 13px 0;
      overflow-y: auto;
      border: 1px solid #0003;
      border-radius: 2px;

      li {
        padding-left: 12px;
        font-size: 14px;
        line-height: 32px;
        color: #323233;

        &:hover {
          color: #5c6cc0;
          cursor: pointer;
          background: #f5f7fa;
        }
      }
    }
  }

  .ant-modal-content .ant-modal-footer {
    text-align: right;
  }

  .ant-modal-header {
    padding: 8px 16px;

    .ant-modal-title {
      text-align: left;
    }
  }

  .ant-modal-close-x {
    height: 40px;

    .ant-modal-close-icon {
      vertical-align: 0.5rem;
    }
  }

  .input-box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
