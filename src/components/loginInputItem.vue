<template>
  <div class="item-box">
    <h3>{{ lable }}</h3>
    <SelectItem
      v-if="type == 'select'"
      lableStr=""
      type="select"
      :optionArr="optionArr"
      :valueString="valueV"
      width="410"
      @changeSystemFn="changeFn"
    />
    <input v-if="type == 'input'" v-model="valueV" @change="changeFn" />
    <input v-if="type == 'password'" v-model="valueV" type="password" @change="changeFn" />
    <p v-if="isTip" class="tips">{{ tips }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  mixin: ['regMixin'],
  props: {
    lable: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    tips: {
      type: String,
      default: '',
    },
    optionArr: {
      type: Object,
      default: null,
    },
    isTip: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const valueV = ref<string>()
    watch(
      () => props.value,
      (newVal: string) => {
        valueV['value'] = newVal
      },
    )
    const changeFn = (val: any) => {
      if (props.type == 'input') {
        emit('changeFn', valueV['value'])
      } else {
        emit('changeFn', val)
      }
    }
    return {
      changeFn,
      valueV,
    }
  },
})
</script>
<style scoped lang="scss">
.item-box {
  width: 410px;
  color: $frontColor2;

  .tips {
    margin-bottom: 8px;
    font-size: 12px;
    color: red;
  }

  h3 {
    width: 100%;
    margin-bottom: 8px;
    font-size: 18px;
    color: #fff;
    text-align: left;
  }

  .oct-select-box {
    margin-bottom: 16px;
  }

  input {
    width: 100%;
    padding-left: 16px;
    margin-bottom: 16px;
    line-height: 30px;
    background: #fff;
    border-radius: 4px;
  }

  .login-btn {
    position: absolute;
    bottom: 70px;
    width: 100%;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    background: $bg-color;
    border-radius: 4px;

    &:hover {
      background: $bg-btn;
    }
  }
}
</style>
