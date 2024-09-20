<template>
  <div class="bottom-file-box">
    <div class="select-content">
      <div class="select-box clearfix">
        <SelectItem lableStr="系统" :optionArr="_setUpTypeData" valueString="LFS" @changeSystemFn="changeSystemFn" />
        <SelectItem
          v-if="isShow"
          lableStr=""
          :optionArr="disposeData"
          width="150"
          :valueString="valueString"
          @changeSystemFn="changePageFn"
        />
        <p class="fl lable-el">
          名称：
          <input value="123334" />
        </p>
        <p class="fl lable-el"><span>222222222</span></p>
      </div>
      <div class="btn-box">
        <div class="save">保存</div>
        <div class="test">测试</div>
      </div>
    </div>
    <div class="bottom-main-box">
      <SetUpNew v-if="pageShow == 'setUp'" :setUpTypeName="systemName" />
      <SeniorNew v-if="pageShow == 'senior'" :setUpTypeName="systemName" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import SetUpNew from './setUpNew.vue'
import SeniorNew from './seniorNew.vue'
import { setUpTypeData } from '../js/data'
//import { message } from "ant-design-vue";

export default defineComponent({
  components: {
    SetUpNew,
    SeniorNew,
  },
  mixins: [],
  setup() {
    const formState: any = ref(null)
    formState.value = [{}]
    const _setUpTypeData: any = setUpTypeData
    provide('setUpTypeData', _setUpTypeData)
    const systemName: any = ref(null)
    systemName['value'] = 'LFS'
    const disposeData: any = ref(null)
    disposeData['value'] = []
    const valueString: any = ref(null)
    valueString['value'] = '系统视图'
    const isShow: any = ref(null)
    isShow['value'] = true
    const pageShow: any = ref('')
    pageShow['value'] = 'setUp'
    //const systemEl:any = ref(null);

    const initFn = () => {
      if (systemName['value'] == 'LFS') {
        disposeData['value'] = [
          { name: '系统视图', value: '1' },
          { name: '用户视图（包含桌面文档等）', value: '1' },
        ]
        valueString['value'] = '系统视图'
      } else {
        disposeData['value'] = [{ name: '设置', value: '1' }]
        valueString['value'] = '设置'
      }
      pageShow['value'] = 'setUp'
    }
    initFn()
    const countSystemFn = () => {
      valueString['value'] = '设置'
      _setUpTypeData.forEach((item: any) => {
        if (item.name == systemName.value) {
          disposeData['value'] = [{ name: '设置', value: '1' }]
          item.haveItem.forEach((element: any) => {
            if (element != '1') {
              let obj = { name: '', value: '' }
              obj.value = element
              if (element == '2') {
                obj.name = '高级'
              } else if (element == '3') {
                obj.name = '代理'
              }
              disposeData['value'].push(obj)
            }
          })
        }
      })
    }

    const changeSystemFn = (str: string) => {
      systemName['value'] = str
      initFn()
      if (str != 'LFS') {
        countSystemFn()
      }
      valueString['value'] = '设置'
      //systemEl["value"]="设置"
    }
    const changePageFn = (str: string) => {
      switch (str) {
        case '高级':
          pageShow['value'] = 'senior'
          break
        case '设置':
          pageShow['value'] = 'setUp'
          break
        case '代理':
          pageShow['value'] = 'deputy'
          break
      }
    }
    return {
      formState,
      changeSystemFn,
      systemName,
      disposeData,
      valueString,
      isShow,
      changePageFn,
      pageShow,
      _setUpTypeData,
    }
  },
  mounted() {},
})
</script>
<style lang="scss">
.bottom-file-box {
  width: 100%;
  height: calc(100vh - 350px);
  background: #f8f9ff;

  .select-content {
    position: relative;

    .btn-box {
      position: absolute;
      top: 25px;
      right: 26px;
      display: flex;
      font-size: 12px;

      div {
        flex: 1;
        height: 28px;
        padding: 0 12px;
        line-height: 30px;
        cursor: pointer;
        border-radius: 4px;

        &.save {
          margin-right: 16px;
          background: $bg-input;
        }

        &.test {
          background: rgb(0 0 0 / 3%);
        }

        &:hover {
          color: #fff;
          background: $bg-color;
        }
      }
    }
  }

  .bottom-main-box {
    padding: 26px;

    .input-item-box {
      padding-bottom: 12px;
    }
  }

  .select-box {
    display: flex;
    padding: 26px 26px 17px;
    border-bottom: 1px solid rgb(0 0 0 / 10%);

    .lable-el {
      width: auto;
      min-width: 30px;
      padding-right: 6px;
      margin-left: 36px;
      line-height: 30px;
    }
  }
}
</style>
