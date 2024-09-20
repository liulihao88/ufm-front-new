<template>
  <div class="o-input" v-bind="subAttrs" :style="{ ...proxy.processWidth(props.width) }">
    <!-- <span class="title" v-if="title">{{ title }}</span> -->
    <el-tooltip :content="'' + $attrs.modelValue" :disabled="inWidth || hideTooltip" v-bind="tooltipAttrs">
      <el-input
        v-bind="{ ...$attrs }"
        v-model="sModelValue"
        :placeholder="handlePlaceholder()"
        class="kd-ipt"
        :showPassword="showPassword"
        :clearable="$attrs.clearable !== false"
        :class="{ 'kd-textarea': $attrs.type === 'textarea' }"
        :style="{ ...proxy.processWidth(props.width) }"
        :maxlength="handleMaxLength"
        :rows="$attrs.rows || 2"
        resize="none"
        height="100px"
        :show-word-limit="handleShowWordLimit()"
        @input="inputHandler"
        @mouseover.native="inputOnMouseOver($event)"
      />
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
/**
* @使用方法
<g-encryption-input title="秘钥键" v-model="aa" type="password" />
*/
import { ref, getCurrentInstance, computed, useAttrs, watch } from 'vue'
const { proxy } = getCurrentInstance()
import { md5 } from 'js-md5'
const attrs = useAttrs()
const props = defineProps({
  title: {
    type: String,
  },
  modelValue: {
    type: String,
  },
  // 是否对v-model的值进行加密
  encryption: {
    type: Boolean,
    default: true,
  },
  titleAttrs: {
    type: Object,
    default: () => {},
  },
  width: {
    type: [String, Number],
    default: '',
  },
  showWordLimit: {
    type: [Boolean, String],
    default: '',
  },
  block: {
    type: Boolean,
    default: false,
  },
  // placeholder在disabled的情况下是不显示的. 如果想要在这种情况下显示placeholder, 那么就用这个属性
  disPlaceholder: {
    type: String,
    default: '',
  },
  subAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
  tooltipAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
  hideTooltip: {
    type: Boolean,
    default: false,
  },
})
const inWidth = ref(true)
const sModelValue = ref('')
watch(
  () => props.modelValue,
  (val) => {
    if (props.encryption) {
      try {
        sModelValue.value = atob(props.modelValue)
      } catch (e) {
        sModelValue.value = props.modelValue
      }
    } else {
      sModelValue.value = props.modelValue
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
const emits = defineEmits(['update:modelValue'])
const handleMaxLength = computed(() => {
  if (attrs.type === 'textarea') {
    return attrs.maxlength || 1000
  } else {
    return attrs.maxlength || ''
  }
})

function handlePlaceholder() {
  let res = attrs.disabled === undefined ? attrs.placeholder || '请输入' : props.disPlaceholder
  return res
}

function inputHandler(value) {
  if (props.encryption) {
    emits('update:modelValue', btoa(value))
  } else {
    emits('update:modelValue', value)
  }
}

//
// 是否显示showWordLimit属性
function handleShowWordLimit() {
  if (typeof props.showWordLimit === 'boolean') {
    return props.showWordLimit
  }
  if (attrs.type === 'textarea') {
    return true
  }
  return false
}
// 如果是密码输入框, focus直接选中文本
function inputOnMouseOver(event) {
  const target = event.target
  if (target.offsetWidth + 4 < target.scrollWidth) {
    inWidth.value = false
  } else {
    inWidth.value = true
  }
}
const showPassword = computed(() => {
  if (attrs.type === 'password' && attrs.showPassword !== false) {
    return true
  }
  return false
})
</script>

<style lang="scss" scoped>
.o-input {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  background-color: #fff;

  .title {
    min-width: 122px;
    margin-right: 38px;
    font-weight: 900;
  }
}

// el-input的宽度会随着鼠标移入显示clearable而改变, 所以加下面这两行代码
:deep(.el-input__inner:not(.el-select .el-input__inner)) {
  padding-right: 22px;
}

:deep(.el-textarea__inner) {
  padding-bottom: 20px;
}
</style>
