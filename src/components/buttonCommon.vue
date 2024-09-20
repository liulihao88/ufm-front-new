<template>
  <div class="oct-btn-box" :class="isCancel ? 'cancel-btn' : ''">
    <div :id="id">
      <img v-if="typeV === 'new'" src="../assets/image/task/newAdd.png" class="icon-el" />
      <img v-if="typeV === 'edit'" src="../assets/image/task/edit.png" class="icon-el" />
      <img v-if="typeV === 'refresh'" src="../assets/image/task/refresh.png" class="icon-el icon-el-2" />
      <img v-if="typeV === 'remove'" src="../assets/image/task/move.png" class="icon-el icon-el-2" />
      <img v-if="typeV === 'running'" src="../assets/image/task/runningStatus.png" class="icon-el" />
      <img v-if="typeV === 'status'" src="../assets/image/task/allSatus.png" class="icon-el icon-el-3" />
      {{ textV }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
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
    type: {
      type: String,
      default: '',
      required: true,
    },
    id: {
      type: String,
      default: '',
      required: true,
    },
  },
  setup(props) {
    let textV: any = ref()
    const typeV: any = ref()

    watch(
      () => props.type,
      (newVal: any) => {
        typeV['value'] = newVal ? newVal : ''
      },
      {
        immediate: true,
        deep: true,
      },
    )

    watch(
      () => props.text,
      (newVal: any) => {
        textV['value'] = newVal ? newVal : ''
      },
      {
        immediate: true,
        deep: true,
      },
    )
    return {
      textV,
      typeV,
    }
  },
})
</script>
<style lang="scss" scoped>
.oct-btn-box {
  position: relative;
  padding: 2px 4px;
  font-size: 12px;
  cursor: pointer;

  // padding:0 16.5px;
  // height:30px;
  // line-height: 30px;
  //background:$bg-input;
  background: #fff;

  //border:1px solid $bg-color;
  border: 1px solid #00000026;
  // width: fit-content;
  border-radius: 2px;

  .icon-el {
    @include center-l;

    left: 8px;
    width: 12px;

    &.icon-el-2 {
      width: 14px;
    }

    &.icon-el-3 {
      width: 11px;
    }
  }

  &.cancel-btn {
    background: $bg-cancel;
  }

  &:hover {
    background: $bg-input;
    // color: #fff;
  }

  div {
    flex-basis: 200px;
    padding: 2px 16.5px 2px 26px;
    line-height: 22px;
    text-align: center;
  }
}
</style>
