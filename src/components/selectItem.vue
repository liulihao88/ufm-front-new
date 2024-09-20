<template>
  <div
    v-b-selectParent
    class="oct-select-box clearfix"
    :class="typeStyleFn()"
    :style="{ width: width ? width + 'px' : '100%' }"
  >
    <div v-if="lableStr && lableStr.length > 0" class="fl lable-el">{{ lableStr }}：</div>
    <div class="text-box">{{ valueStr }}</div>
    <div v-if="!isDisabled" v-b-selectEl class="select-mask-list-box fl">
      <div class="input-el oct-save-list-box" @click="showSelectFN">
        {{ valueStr }}
      </div>
      <ul v-if="showSelectB" class="list-box">
        <li
          v-for="(item, index) in formState"
          :key="index"
          :class="item.isSelect ? 'active' : ''"
          @click="selectFn(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <img v-if="typeV != 'main'" src="../assets/image/down-selcet.png" />
      <i v-else class="img-el" />
    </div>
    <div v-else v-b-selectEl class="select-mask-list-box fl select-mask-list-box-2">
      <div class="input-el oct-save-list-box input-el-def">
        {{ valueStr }}
      </div>
      <img src="../assets/image/down-selcet.png" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, defineExpose } from 'vue'
export default defineComponent({
  components: {},
  directives: {
    'b-selectParent': (el: any) => {
      let inputEl: any = el.querySelector('.input-el')
      let textEl: any = el.querySelector('.text-box')
      if (inputEl) {
        inputEl.onmouseover = () => {
          if (inputEl.innerHTML.length > 8) {
            textEl.style.display = 'block'
            textEl.style.width = inputEl.innerHTML.length * 16 + 'px'
          } else {
            textEl.style.display = 'none'
          }
        }
        textEl.onmouseover = () => {
          textEl.style.display = 'block'
        }
        textEl.onmouseout = () => {
          textEl.style.display = 'none'
        }
        inputEl.onmouseout = () => {
          textEl.style.display = 'none'
        }
      }
      let selectArr = document.querySelectorAll('.oct-select-box')
      selectArr.forEach((item) => {
        if (item !== el) {
          let attr: string = item.getAttribute('class')
          if (attr.indexOf('select-el') > 0) {
            let arr = attr.split(' ')
            let newClass = ''
            arr.forEach((str) => {
              if (str != 'select-el') {
                newClass += str + ' '
              }
            })
            item.setAttribute('class', newClass)
          }
        }
      })
    },
    'b-selectEl': () => {
      //组件操作DOM
      let allInput: any = document.querySelectorAll('.select-mask-list-box')
      // 绑定事件函数
      const addEventListenerFn = (obj: any, eventS: any, fn: any) => {
        if (obj.addEventListener) {
          obj.addEventListener(eventS, fn, false)
        } else {
          obj.attachEvent('on' + eventS, function () {
            fn.call(obj)
          })
        }
      }

      // 判断点击位置是否位于指定元素内
      const checkTarget = (target: HTMLElement) => {
        return (
          target.classList && target.classList.contains('input-el') && target.classList.contains('oct-save-list-box')
        )
      }

      // 处理所有的 select-mask-list-box 元素
      const hideAllList = () => {
        const nodeList: any = document.querySelectorAll('.select-mask-list-box .list-box')

        if (nodeList) {
          nodeList.forEach((item: any) => {
            item.style.display = 'none'
          })
        }
      }

      addEventListenerFn(document, 'click', (e: any) => {
        let target = e.target || e.srcElement
        if (!checkTarget(target)) {
          hideAllList()
        }
      })

      if (allInput) {
        allInput.forEach((item: any) => {
          let inputEl: any = item.querySelector('.input-el')
          inputEl.onclick = () => {
            allInput.forEach((el: any) => {
              let itemEl = el.querySelector('.list-box')
              if (itemEl) {
                itemEl.style.display = 'none'
              }
            })
            let _parentElement = inputEl.parentElement.querySelector('.list-box')
            if (_parentElement) {
              _parentElement.style.display = 'block'
            }
          }
        })
      }
    },
  },
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
    const selectFn = (item: any) => {
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
$box-shadow-app:
  0 1rem 2em 0 rgb(0 0 0 / 10%),
  0 0 0 0 rgb(0 0 0 / 3%);

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
      padding: 12px 0;
      overflow-y: auto;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 4px;
      box-shadow: $box-shadow-app;

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
