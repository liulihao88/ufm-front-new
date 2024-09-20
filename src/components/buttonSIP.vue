<template>
  <div class="oct-btn-box" :class="isCancel ? 'cancel-btn' : ''">
    <span>{{ textV }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    text: {
      type: String,
      default: '',
      required: true,
    },
    isCancel: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
      required: true,
    },
  },
  setup(props) {
    const textV: any = ref()
    textV['value'] = props.text
    return {
      textV,
    }
  },
})
</script>
<style lang="scss" scoped>
.oct-btn-box {
  display: flex;
  height: 30px;
  padding: 0 16.5px;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  //background:$bg-input;
  background: $bg-input;
  border: 1px solid $bg-color;
  // width: fit-content;
  border-radius: 4px;

  &.cancel-btn {
    background: $bg-cancel;
  }

  &:hover {
    color: #fff;
    background: $bg-color;
  }

  svg {
    flex: 1;
  }

  span {
    flex: 1;
  }
}
</style>
