<template>
  <a-button
    class="ufm-btn-common"
    :type="typeBack"
    :size="sizeBack"
    :class="[typeBack]"
    :icon="''"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <span v-if="iconType" :class="`iconfont icon-ufm-${iconType}`" />
    <span class="text-el"><slot /></span>
  </a-button>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  components: {},
  props: {
    type: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    icon: { type: String, default: '' },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    let typeBack = ref<string>(props.type) //1、primary   2、ghost
    let sizeBack = ref<string>(props.size) //large | middle | small
    let iconType = ref<string>(props.icon)
    let isDisabled = ref<boolean>(props.disabled)
    watch(
      () => props.disabled,
      (newVal: boolean) => {
        isDisabled.value = newVal
      },
    )
    const handleClick = () => {
      emit('clickBack')
    }
    return {
      handleClick,
      typeBack,
      sizeBack,
      iconType,
      isDisabled,
    }
  },
})
</script>
<style lang="scss">
.ufm-btn-common {
  &.ant-btn {
    padding: 4px 12px 6px;

    &.line {
      color: $bg-color;
      border-color: $bg-color;

      &:hover {
        font-weight: 600;
        color: $bg-btn-2;
        border-color: $bg-btn-2;
      }
    }

    span {
      padding: 0 6px;

      &.iconfont {
        padding-right: 0;
        font-size: 14px;
      }
    }

    &:hover {
      .iconfont {
        color: $bg-btn-2;
      }
    }
  }

  &.ant-btn-sm {
    position: relative;
    min-width: 40px;
    padding: 6px 12px;

    span {
      @include center-c;

      margin: 0;
      font-size: 10px;
      text-align: center;
      letter-spacing: 0;
      vertical-align: middle;
    }
  }
}
</style>
<style lang="scss" scoped>
// 第一种背景颜色很深
.primary {
  background: $bg-color !important;
  border: 1px solid $bg-color;
  border-radius: 2px !important;

  &:hover {
    background: $bg-btn-2 !important;
    border: 1px solid $bg-btn-2;

    .iconfont {
      color: #fff;
    }
  }
}
// 第二种背景颜色稍浅，鼠标移入变颜色的按钮
.ghost {
  background: #e5eaf8;
  border: 1px solid $bg-btn;
  border-radius: 2px;

  .iconfont {
    color: $bg-btn;
  }

  &:hover {
    color: white !important;
    background: $bg-btn-2;

    .iconfont {
      color: #fff;
    }
  }
}
// 第三种背景颜色为白色
.none {
  padding: 2px 4px !important;
  border: 1px solid #d9d9d9 !important;
  border-radius: 2px;

  &:hover {
    border: 1px solid $bg-btn-2 !important;

    span {
      color: $bg-btn-2;
    }
  }
}
</style>
