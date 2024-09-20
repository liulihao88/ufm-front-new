<template>
  <a-select
    v-model:value="formStateV.proxyType"
    size="middle"
    style="width: 200px"
    :options="typeData"
    class="select-type-1"
  />
</template>
<script lang="ts">
import { defineComponent, ref, watch, defineExpose } from 'vue'
export default defineComponent({
  components: {},
  directives: {},
  mixins: [],
  props: {
    optionArr: {
      type: Array,
      default: null,
    },
    lableStr: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: '',
    },
    valueString: {
      type: String,
      default: '',
    },
    typeStyle: {
      type: String,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const formState = ref<any>(props.optionArr)
    let valueStr = ref<string>('')
    const showSelectB = ref<boolean>(false)
    valueStr['value'] = props['valueString']
    const disabledV = ref<boolean>(false)
    const className = ref<string>('')
    className['value'] = 'oct-select-main-box-2'
    const initFn = () => {
      if (formState['value'] && formState['value'].length > 0) {
        formState['value'].forEach((item: any, index: number) => {
          item.isSelect = false
          if (index == 0) {
            item.isSelect = true
          }
        })
      }
    }
    initFn()
    const selectFn = (item: object) => {
      showSelectB['value'] = !showSelectB['value']
      valueStr['value'] = item.name
      formState['value'].forEach((el: any) => {
        el.isSelect = false
      })
      item.isSelect = true

      emit('changeSystemFn', item)
    }
    const showSelectFN = () => {
      showSelectB['value'] = true
      typeStyleFn()
    }
    watch(
      () => props.valueString,
      (newVal: any) => {
        valueStr['value'] = newVal
      },
    )
    watch(
      () => props.optionArr,
      (newVal: any) => {
        formState['value'] = newVal
        initFn()
      },
    )
    const typeV = ref<string>('')
    typeV['value'] = ''
    watch(
      () => props.typeStyle,
      (newVal: any) => {
        typeV['value'] = newVal
      },
    )
    const setValueFn = (str: any) => {
      valueStr.value = str
    }
    defineExpose({
      setValueFn,
    })
    const typeStyleFn = () => {
      if (props.typeStyle == 'main') {
        if (!props.isDisabled) {
          return 'oct-select-main-box'
        } else {
          return 'oct-select-main-box-3'
        }
      } else {
        if (!showSelectB['value']) {
          return 'oct-select-main-box-2 '
        } else {
          return 'oct-select-main-box-2 select-el'
        }
      }
    }
    return {
      formState,
      valueStr,
      selectFn,
      showSelectFN,
      showSelectB,
      className,
      disabledV,
      // disabledVFn,
      typeV,
      typeStyleFn,
    }
  },
})
</script>
<style lang="scss" scoped>
.oct-select-box {
  position: relative;
  background: #fff;
  border: 1px solid #dcdfe4;
  border-radius: 4px;

  &.select-el {
    border: 1px solid $bg-color;
  }

  &.oct-select-main-box {
    background: $bg-input !important;
    border: none;
    border: 1px solid $bg-color;

    .list-box {
      max-height: 432px;
    }

    .input-el {
      font-size: $fontSize1;
      font-weight: 600;
      color: $bg-color;
    }
  }

  &.oct-select-main-box-3 {
    background: #eee;
  }

  .text-box {
    position: absolute;
    top: 28px;
    left: 50px;
    z-index: 200;
    display: none;
    height: 33px;
    padding: 0 10px;
    line-height: 33px;
    background: #fff;
    border: 1px solid $bg-line;
  }

  .select-mask-list-box {
    position: relative;
    z-index: 300;
    width: 100%;
    padding-left: 12px;
    margin-right: 26px;

    .input-el {
      @include ellipsisFn;
    }

    div {
      position: relative;
      z-index: 0;
      width: 100%;
      height: 30px;
      padding-right: 30px;
      overflow: hidden;
      font-size: $fontSize1;
      line-height: 30px;
      text-overflow: ellipsis;
      word-wrap: normal;
      cursor: pointer;
    }

    ul {
      @include scrollbar-style;

      position: absolute;
      top: 30px;
      left: 0;
      z-index: 600;
      display: none;
      width: 100%;
      max-height: 232px;
      overflow-y: auto;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 4px;

      li {
        @include ellipsisFn;

        z-index: 10;
        width: 100%;
        height: 33px;
        padding-left: 11px;
        font-size: $fontSize1;
        line-height: 33px;
        color: rgb(0 0 0 / 65%);
        cursor: pointer;

        &:hover {
          font-weight: 600;
          color: $bg-color;
        }

        &.active {
          position: relative;
          background: $bg-line;

          &::after {
            position: absolute;
            top: 0;
            right: 0;
            width: 1px;
            height: 30px;
            content: '';
            background: $bg-color;
          }
        }
      }
    }
  }

  .lable-el {
    width: auto;
    min-width: 30px;
    padding-right: 6px;
    line-height: 30px;
  }

  img {
    @include center-l;

    right: 10px;
    z-index: 0;
    width: 12px;
  }

  .img-el {
    @include center-l;

    right: 10px;
    z-index: 0;
    width: 0;
    height: 0;
    border: 8px solid $bg-color;
    border-right: 5px solid transparent;
    border-bottom: 0;
    border-left: 5px solid transparent;
  }
}
</style>
