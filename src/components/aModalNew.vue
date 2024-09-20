<template>
  <a-modal
    v-model:visible="visibleV"
    :title="titleV"
    destroyOnClose
    class="UFM-modal-box"
    @ok="handleOk"
    @cancel="cancelFn"
  >
    <InputItem
      v-if="typeV == 'select'"
      labelStr="选择客户端"
      :value="selectTaskStr"
      type="select"
      :option="optionsData"
    />
    <p v-if="typeV == 'problem'" class="text-box">
      <img src="../assets/image/icon_0.png" />
    </p>
    <div class="text-1">
      <div class="text">{{ dataV.text }}</div>
      <a-input v-if="visible_inputV" v-model:value="dataV.val" v-focus />
      <p v-if="tips" class="tips-el">请输入 YES 确认信息</p>
    </div>
    <div v-if="typeV == 'tips'" class="text-box">
      <!-- <div class="text-2">{{ dataV.text }}</div> -->
    </div>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  components: {},
  directives: {},
  props: {
    visible: {
      type: Boolean,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      default: null,
    },
    visible_input: {
      type: Boolean,
      default: null,
    },
  },
  setup(props, { emit }) {
    const selectTaskStr = ref<string>()
    const titleV = ref<string>(props.title)
    const visibleV = ref<boolean>(false)
    const typeV = ref<string>(props.type)
    const dataV = ref<any>(
      props.data
        ? props.data
        : {
            text: '',
          },
    )
    const visible_inputV = ref<boolean>(props.visible_input)
    const tips = ref<boolean>(false)
    //message.destroy()
    const info = () => {}
    if (typeV['value'] != 'message') {
      visibleV['value'] = props.visible
    } else {
      info(titleV['value'], dataV['value'].text)
    }
    let colseInitFn = () => {
      tips['value'] = false
      dataV['value'].val = ''
    }
    //e: MouseEvent
    const handleOk = () => {
      if (props.visible_input) {
        if (dataV['value'].val.toUpperCase() == 'YES') {
          emit('handleBackFn')
          colseInitFn()
        } else {
          tips['value'] = true
        }
      } else {
        colseInitFn()
        emit('handleBackFn')
      }
    }
    const cancelFn = () => {
      colseInitFn()
      emit('cancelBackFn')
    }
    const optionsData = ref<any>([
      { name: 'Beijing', value: 'Beijing' },
      { name: 'Shanghai', value: 'Shanghai' },
    ])
    watch(
      () => props.visible,
      (newVal) => {
        visibleV['value'] = newVal
      },
    )
    watch(
      () => props.type,
      (newVal) => {
        typeV['value'] = newVal
        if (typeV['value'] != 'message') {
          visibleV['value'] = props.visible
        } else {
          info(titleV['value'], dataV['value'].text)
        }
      },
    )
    watch(
      () => props.title,
      (newVal) => {
        titleV['value'] = newVal
      },
    )
    watch(
      () => props.data,
      (newVal) => {
        dataV['value'] = newVal
      },
    )
    return {
      visibleV,
      handleOk,
      optionsData,
      selectTaskStr,
      titleV,
      cancelFn,
      typeV,
      dataV,
      info,
      visible_inputV,
      tips,
    }
  },
  data() {},
  methods: {},
})
</script>
<style lang="scss">
.UFM-modal-box {
  .tips-el {
    padding-top: 6px;
    font-size: 10px;
    color: red;
  }

  .ant-input {
    padding: 6px;
    border: 1px solid #ccc;
  }

  .ant-btn span {
    padding: 0 !important;
  }

  .ant-modal-content .text-box img {
    width: 14px;
    padding-top: 3px;
  }

  .text {
    padding-left: 18px;
  }
}
</style>
