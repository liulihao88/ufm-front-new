<template>
  <div class="input-item-box">
    <div class="title">{{ lableV }}</div>
    <div class="input" :class="type == 'TLS' ? 'no-bg' : ''">
      <input
        v-if="type == 'input' || type == 'changeBtn'"
        v-model="valueV"
        :disabled="isDisabledV"
        :maxlength="maxlength"
        @change="changeFn"
      />
      <input
        v-if="type == 'password'"
        v-model="valueV"
        type="password"
        :maxlength="maxlength"
        @change="changPasswordFn"
      />
      <input
        v-if="type == 'number9'"
        v-model="valueV"
        type="tel"
        :disabled="isDisabledV"
        :maxlength="maxlength"
        @change="changeFn"
      />
      <div v-if="type == 'nameInput'" class="name-box">
        <input v-model="valueV" :maxlength="maxlength" @change="changeFn" @input="inputFn" />
        <input v-model="valueKeyV" :disabled="true" />
      </div>
      <div v-if="type == 'selectFile'" class="file-box">
        <input v-model="valueV" readonly />
        <div class="file-input">
          <input id="fileEl" type="file" :value="fileData" @change="changeFileFn" />
          <span>选择文件</span>
        </div>
      </div>
      <div v-if="type == 'areaInput'" class="area-box">
        <SelectItem
          v-if="!isAll"
          ref="selectEl"
          lableStr=""
          :optionArr="optionV"
          :valueString="valueStringV"
          typeStyle="area"
          @changeSystemFn="changeSelectFn"
        />
        <input v-else v-model="valueV" :disabled="isAll" />
        <a-checkbox v-model:checked="isAll" @change="changeCheckFn">强制全局</a-checkbox>
      </div>
      <div v-if="type == 'input_checkbox'" class="area-box">
        <input v-model="valueV" :disabled="checkAnonymousV" @change="changeUserFn" />
        <a-checkbox v-model:checked="checkAnonymousV" name="type" @change="changeCheckFn2">匿名</a-checkbox>
      </div>
      <SelectItem
        v-if="type == 'select'"
        lableStr=""
        :optionArr="optionV"
        :valueString="valueStringV"
        :isDisabled="isDisabledV"
        @changeSystemFn="changeSelectFn"
      />

      <div v-if="type == 'TLS' || type == 'TLS/SSL' || type == 'TLS/SSL_1'" class="TLSSSL">
        <a-checkbox v-model:checked="isTLS" :disabled="type == 'TLS/SSL_1' ? true : false" @change="TLS_Fn">
          使用 TLS/SSL 安全连接访问
        </a-checkbox>
        <a-checkbox
          v-if="type == 'TLS/SSL' || type == 'TLS/SSL_1'"
          v-model:checked="isTLS_SSL"
          :disabled="!isTLS"
          @change="SSL_Fn"
        >
          忽略 TLS/SSL 认证证书
        </a-checkbox>
      </div>
      <div v-if="type == 'radio'" class="radio-box">
        <a-radio-group v-model:value="valueV" @change="changeStystemEnterFn">
          <a-radio value="1">首选系统入口</a-radio>
          <a-radio value="2">次选系统入口</a-radio>
          <a-radio value="3">
            <div class="custom-box">
              自定义入口
              <input :value="customEnterStr" placeholder="请输入自定义入口" :disabled="isCustomEnter" />
            </div>
          </a-radio>
        </a-radio-group>
      </div>
      <div v-if="type == 'radio2'" class="radio-box">
        <a-radio-group v-model:value="valueTransV" @change="changeTransFn">
          <a-radio value="1">无密</a-radio>
          <a-radio value="2">隐式TLS/SSL</a-radio>
          <a-radio value="3">显示TLS/SSL</a-radio>
        </a-radio-group>
      </div>
      <div v-if="type == 'radio3'" class="radio-box">
        <a-radio-group v-model:value="clientConfigV.pathType" @change="changeRadioFn">
          <a-radio value="1">模拟</a-radio>
          <a-radio value="2">路径</a-radio>
        </a-radio-group>
      </div>
      <div v-if="type == 'radio4'" class="radio-box">
        <a-radio-group v-model:value="configDataV.APIversion" @change="changeRadioFn">
          <a-radio value="1">V2版本</a-radio>
          <a-radio value="2">默认（根据您所连接的S3系统可能出现无法使用的情况）</a-radio>
        </a-radio-group>
      </div>
      <div v-if="type == 'radio5'" class="radio-box">
        <a-radio-group v-model:value="valueV" @change="changeRequestFn">
          <a-radio value="1">虚拟端口方式</a-radio>
          <a-radio value="2">路径方式</a-radio>
        </a-radio-group>
      </div>
      <div v-if="type == 'radio6'" class="radio-box">
        <a-radio-group v-model:value="valueV" @change="changeCheckFn">
          <a-radio value="1">默认入口</a-radio>
          <a-radio value="2">加速入口</a-radio>
          <a-radio value="3">ECS入口</a-radio>
        </a-radio-group>
      </div>
      <div v-if="type == 'radio7'" class="radio-box">
        <a-checkbox v-model:checked="isAll" @change="changeCheckFn3">包含根目录</a-checkbox>
        <a-radio-group v-model:value="valueViewV" @change="changeViewFn">
          <a-radio value="DEFAULT_FILE_SYSTEM_VIEW" :disabled="!isAll">系统视图</a-radio>
          <a-radio value="USER_FILE_SYSTEM_VIEW" :disabled="!isAll">用户视图（包含桌面文档）</a-radio>
        </a-radio-group>
      </div>
      <div v-if="type == 'radio8'" class="radio-box">
        <a-radio-group v-model:value="valueViewV" @change="changeViewFn">
          <a-radio value="1">原始客户端</a-radio>
          <a-radio value="2">传输客户端</a-radio>
        </a-radio-group>
      </div>

      <div v-if="type == 'checked2'" class="radio-box">
        <p class="item">
          <a-checkbox v-model:checked="clientConfigV.isPath" @change="clientConfigFn">
            开启Path-Style请求模式，与Virtual Hosted-Style 不同，桶名称将出现在请求路径
          </a-checkbox>
        </p>
        <p class="item">
          <a-checkbox v-model:checked="clientConfigV.isDual" @change="clientConfigFn">
            开启Dual-stack-endpoints支持
          </a-checkbox>
        </p>
        <p class="item">
          <a-checkbox v-model:checked="clientConfigV.isQuick" @change="clientConfigFn">开启访问加速</a-checkbox>
        </p>
        <p class="item">
          <a-checkbox v-model:checked="clientConfigV.isPayload" @change="clientConfigFn">
            开启Payload Signing功能
          </a-checkbox>
        </p>
      </div>
      <div v-if="type == 'checked3'" class="radio-box">
        <a-checkbox v-model:checked="clientConfigV.isCheck" @change="changeClientConfig">
          检查桶的存在性，不可访问的桶将被禁止访问
        </a-checkbox>
      </div>
      <div v-if="type == 'checked4'" class="radio-box">
        <p class="item">
          <a-checkbox v-model:checked="clientConfigV.isPath" :disabled="true">展示被删除的对象</a-checkbox>
        </p>
        <p class="item">
          <a-checkbox v-model:checked="clientConfigV.isDual" :disabled="true">在删除对象时启用清除</a-checkbox>
        </p>
      </div>
      <div v-if="type == 'checked5'" class="radio-box">
        <p class="item">
          <a-checkbox v-model:checked="clientConfigV.isMonitor" @change="changeClientConfig">
            监听隐藏文件，这功能依赖于你的FTP服务
          </a-checkbox>
        </p>
      </div>
      <div v-if="type == 'checked7'" class="radio-box">
        <p class="item">
          <a-checkbox v-model:checked="clientConfigV.isUTF_8" @change="changeClientConfig">
            当FTP服务支持时，优先使用UTF-8模式编译
          </a-checkbox>
        </p>
      </div>
      <div v-if="type == 'checked6'" class="radio-box">
        <p class="item">
          <a-checkbox v-model:checked="isApproveV" :disabled="isDisabledV" @change="changeClientConfig">
            需要认证信息
          </a-checkbox>
        </p>
      </div>
      <div v-if="type == 'textarea'" class="textarea-box">
        <a-textarea v-model:value="valueV" :auto-size="{ minRows: 2, maxRows: 5 }" @change="changeTextareaFn" />
      </div>
      <div v-if="type == 'number'" class="number-box">
        <a-input-number
          id="inputNumber1"
          v-model:value="valueNumV"
          :min="0"
          :max="1000000000000000"
          style="width: 200px"
          @change="changeNumberFn1"
        />
        {{ tipStrV }}
      </div>
      <div v-if="type == 'number2'" class="radio-box">
        <a-input-number
          id="inputNumber"
          v-model:value="valueNumRange1V"
          :min="1"
          :max="1000000000000000"
          style="width: 200px"
          @change="changeNumRange1"
        />
        <span class="line-span">-</span>
        <a-input-number
          id="inputNumber"
          v-model:value="valueNumRange2V"
          :min="1"
          :max="1000000000000000"
          style="width: 200px"
          @change="changeNumRange2"
        />
      </div>
      <div v-if="type == 'number3'" class="number-box clearfix">
        <div class="clearfix fl">
          <a-input-number
            v-model:value="valueV"
            :min="0"
            :max="1000000000000000"
            style="width: 200px"
            class="fl"
            @change="changeNumRange1"
          />
          <SelectItem
            lableStr=""
            :optionArr="optionV"
            :isDisabled="false"
            :valueString="valueUnit1V"
            width="100"
            class="fl"
            @changeSystemFn="changeUnit1Fn"
          />
        </div>
        <span class="fl line-span">-</span>
        <div class="clearfix fl">
          <a-input-number
            v-model:value="valueV"
            :min="0"
            :max="1000000000000000"
            style="width: 200px"
            class="fl"
            @change="changeNumRange2"
          />
          <SelectItem
            lableStr=""
            :optionArr="optionV"
            :isDisabled="false"
            :valueString="valueUnit2V"
            width="100"
            class="fl"
            @changeSystemFn="changeUnit2Fn"
          />
        </div>
      </div>
      <div v-if="type == 'number4'" class="number-box clearfix">
        <div class="clearfix fl">
          <a-input-number v-model:value="valueNumV" :min="0" :max="1000000000000000" style="width: 200px" class="fl" />
          <SelectItem
            lableStr=""
            :optionArr="optionV"
            :valueString="valueStringV"
            width="100"
            class="fl"
            :isDisabled="isDisabledV"
            @changeSystemFn="changeSelectFn"
          />
        </div>
      </div>
      <div v-if="type == 'number5'" class="number-box">
        <input v-model="valueV" :disabled="isDisabledV" type="number" @change="changeNumberFn" />
        {{ tipStrV }}
        {{ tipStrV }}
      </div>
      <div v-if="type == 'text'" class="radio-box">
        {{ tipStrV }}
      </div>
      <div v-if="type == 'btn'" class="btn-box">
        <div class="btn">清空</div>
      </div>
    </div>
    <div v-if="type == 'changeBtn'" class="change-box">
      {{ btnStr }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { message } from 'ant-design-vue'
export default defineComponent({
  mixins: [],
  props: {
    labelStr: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
    valueView: {
      type: String,
      default: null,
    },
    valueString: {
      type: String,
      default: null,
    },
    serverUrl: {
      type: String,
      default: null,
    },
    option: {
      type: Array,
      default: null,
    },
    type: {
      type: String,
      default: 'input',
    },
    btnStr: {
      type: String,
      default: null,
    },
    tipStr: {
      type: String,
      default: null,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isAllG: {
      type: Boolean,
      default: false,
    },
    valueKey: {
      type: String,
      default: null,
    },
    valueSSL: {
      type: Boolean,
      default: false,
    },
    valueNum: {
      type: Number,
      default: 0,
    },
    valueTLS: {
      type: Boolean,
      default: false,
    },
    valueTrans: {
      type: String,
      default: null,
    },
    keyName: {
      type: String,
      default: null,
    },
    configData: {
      type: Object,
      default: null,
    },
    clientConfig: {
      type: Object,
      default: null,
    },
    checkAnonymous: {
      type: Boolean,
      default: false,
    },
    isApprove: {
      type: Boolean,
      default: false,
    },
    valueNumRange1: {
      type: Number,
      default: 0,
    },
    valueNumRange2: {
      type: Number,
      default: 0,
    },
    valueUnit1: {
      type: String,
      default: null,
    },
    valueUnit2: {
      type: String,
      default: null,
    },
    testType: {
      type: String,
      default: null,
    },
    maxlength: {
      type: String,
      default: '100',
    },
  },
  setup(props, { emit }) {
    const valueTransV = ref<string>(props.valueTrans)
    const lableV = ref<string>(props.labelStr)
    const isDisabledV = ref<boolean>(props.isDisabled)
    const valueV = ref<string>(props['value'])
    const valueViewV = ref<string>(props.valueView)
    const valueNumV = ref<number>(props.valueNum)
    const valueStringV = ref<string>(props.valueString)
    //const tipStr = ref<string>(props.tipStr);
    const optionV = ref<any>(props.option)
    const checkAnonymousV = ref<boolean>(props.checkAnonymous)
    const isTLS = ref<boolean>(props.valueTLS)
    const isTLS_SSL = ref<boolean>(props.valueSSL)
    const customEnterStr: any = ref<string>(props.serverUrl)
    const isCustomEnter: any = ref<boolean>(true)
    const isAll = ref<boolean>(props.isAllG)
    const selectEl = ref<any>()
    const clientConfigV = ref<any>(props.clientConfig)
    const isApproveV = ref<boolean>(props.isApprove)
    const tipStrV = ref<string>('')
    const fileData = ref<any>()
    const valueUnit1V = ref<string>(props.valueUnit1)
    const valueUnit2V = ref<string>(props.valueUnit2)
    const valueKeyV = ref<string>(props.valueKey)

    const valueNumRange1V = ref<number>(props.valueNumRange1)
    const valueNumRange2V = ref<number>(props.valueNumRange2)
    const configDataV = ref<any>({
      pathType: '1',
      API_Version: '1',
      isCheck: false,
      isPath: false,
      isDual: false,
      isQuick: false,
      isPayload: false,
    })
    interface Props {
      someProp: any
    }
    const _watchFn = (name: keyof Props, fn: (newVal: any) => void) => {
      watch(
        () => props[name],
        (newVal: any) => {
          fn(newVal)
        },
      )
    }
    _watchFn('valueKey', (newVal: string) => {
      valueKeyV['value'] = newVal
    })
    _watchFn('isDisabled', (newVal: boolean) => {
      isDisabledV['value'] = newVal
    })
    _watchFn('valueNum', (newVal: number) => {
      valueNumV['value'] = newVal
    })
    _watchFn('valueTLS', (newVal: boolean) => {
      isTLS['value'] = newVal
      if (isTLS['value']) {
        isTLS_SSL['value'] = newVal
      } else {
        isTLS_SSL['value'] = false
      }
    })
    _watchFn('valueSSL', (newVal: boolean) => {
      if (isTLS['value']) {
        isTLS_SSL['value'] = newVal
      } else {
        isTLS_SSL['value'] = false
      }
    })
    _watchFn('serverUrl', (newVal: string) => {
      customEnterStr['value'] = newVal
    })
    _watchFn('checkAnonymous', (newVal: string) => {
      checkAnonymousV['value'] = newVal
    })
    _watchFn('valueString', (newVal: string) => {
      valueStringV['value'] = newVal
    })

    _watchFn('isAllG', (newVal: boolean) => {
      isAll['value'] = newVal
    })
    _watchFn('configData', (newVal: string) => {
      configDataV['value'] = newVal
    })
    _watchFn('value', (newVal: string) => {
      valueV['value'] = newVal
    })
    _watchFn('valueView', (newVal: string) => {
      valueViewV['value'] = newVal
    })
    _watchFn('labelStr', (newVal: string) => {
      valueViewV.value['lableV'] = newVal
    })
    _watchFn('option', (newVal: object) => {
      optionV.value['lableV'] = newVal
    })
    _watchFn('tipStr', (newVal: string) => {
      tipStrV.value['lableV'] = newVal
    })
    _watchFn('isApprove', (newVal: boolean) => {
      isApproveV.value['lableV'] = newVal
    })
    _watchFn('clientConfig', (newVal: object) => {
      clientConfigV.value['lableV'] = newVal
    })

    const changeEnterFn = (e: any) => {
      customEnterStr['value'] = e.target.value
      if (valueV['value'] != '3') {
        isCustomEnter['value'] = true
      } else {
        isCustomEnter['value'] = false
      }
    }
    //系统入口
    const changeStystemEnterFn = (e: any) => {
      if (e.target.value != '3') {
        isCustomEnter['value'] = true
      } else {
        isCustomEnter['value'] = false
      }
    }
    const clientConfigFn = () => {
      emit('getConfigValFn', clientConfigV['value'])
    }
    const changeSelectFn = (val: any) => {
      emit('changeSelectFn', val)
    }
    const changeCheckFn = (val: any) => {
      emit('changeCheckFn', val.target)
    }
    const changeCheckFn2 = () => {
      emit('changeCheckFn', checkAnonymousV['value'])
    }
    const changeCheckFn3 = () => {
      emit('changeCheckFn', isAll['value'])
    }
    const changeViewFn = (val: any) => {
      valueViewV['value'] = val.target.value
      emit('changeViewFn', val.target.value)
    }
    //IP校验
    const inputServeType = (val: string) => {
      const reg = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}(?::\d{1,5})?$/
      if (val.length > 0) {
        if (!reg.test(val)) {
          message.warn('输入不合法！')
          return false
        } else {
          return true
        }
      }
    }
    const inputFn = () => {
      emit('inputFn', valueV['value'])
    }
    const changeFn = () => {
      if (props.testType == 'host' && !inputServeType(valueV['value'])) {
        emit('changeInputFn', valueV['value'], props.keyName)
        return false
      }
      emit('changeInputFn', valueV['value'], props.keyName)
    }
    const changeTextareaFn = () => {
      emit('changeTextareaFn', valueV['value'])
    }
    const TLS_Fn = () => {
      emit('TLS_Fn', isTLS['value'])
    }
    const SSL_Fn = () => {
      emit('SSL_Fn', isTLS_SSL['value'])
    }
    const changeTransFn = (val: object) => {
      emit('changeTransFn', val.target.value)
    }
    const changeNumberFn = (val: number) => {
      emit('changeNumberFn', valueV['value'])
    }
    const changeNumberFn1 = (val: number) => {
      emit('changeNumberFn', val)
    }
    const changeClientConfig = (val: any) => {
      emit('changeClientConfig', val.target.checked)
    }
    const changeRadioFn = (val: any) => {
      emit('getRadioValFn', val.target.value)
    }
    const changeFileFn = () => {
      let file_obj = document.getElementById('fileEl')
      let reader = new FileReader()
      reader.readAsText(file_obj.files[0], 'UTF-8')
      let file_string = null
      reader.onload = function (e) {
        // 文件内容字符串
        file_string = e.target.result
      }
      let obj = ref<any>({
        name: file_obj.files[0].name,
        str: file_string,
      })
      emit('getFileDataFn', obj['value'])
    }

    const changeNumRange1 = (val: number) => {
      emit('getRageValFn', val, '1')
    }
    const changeNumRange2 = (val: number) => {
      emit('getRageValFn', val, '2')
    }
    const changeUnit1Fn = (val: string) => {
      emit('getUnitValFn', val, '1')
    }
    const changeUnit2Fn = (val: string) => {
      emit('getUnitValFn', val, '2')
    }
    const changeRequestFn = (val) => {
      emit('getRequestFn', val.target.value)
    }
    const changPasswordFn = () => {
      emit('getPasswordFn', valueV['value'])
    }
    const changeUserFn = () => {
      emit('changeUserFn', valueV['value'])
    }

    return {
      fileData,
      lableV,
      valueV,
      valueViewV,
      optionV,
      isTLS,
      isTLS_SSL,
      customEnterStr,
      changeEnterFn,
      isCustomEnter,
      isAll,
      selectEl,
      clientConfigV,
      clientConfigFn,
      tipStrV,
      isDisabledV,
      changeSelectFn,
      changeCheckFn,
      changeViewFn,
      changeFn,
      configDataV,
      changeTextareaFn,
      TLS_Fn,
      SSL_Fn,
      valueStringV,
      checkAnonymousV,
      changeStystemEnterFn,
      changeTransFn,
      valueTransV,
      changeNumberFn,
      changeNumberFn1,
      valueNumV,
      changeClientConfig,
      isApproveV,
      changeRadioFn,
      changeFileFn,
      changeNumRange1,
      changeNumRange2,
      valueNumRange1V,
      valueNumRange2V,
      changeUnit1Fn,
      changeUnit2Fn,
      valueUnit1V,
      valueUnit2V,
      changeRequestFn,
      changPasswordFn,
      changeUserFn,
      changeCheckFn2,
      changeCheckFn3,
      valueKeyV,
      inputFn,
    }
  },
})
</script>
<style lang="scss">
.input-item-box {
  @mixin btnStyle {
    height: 31px;
    line-height: 31px;
    color: $frontColor;
    text-align: center;
    cursor: pointer;
    background: $bg-input;
    border: 1px solid $bg-color;
    border-radius: 4px;

    &:hover {
      color: #fff;
      background: #5c6bbf;
    }
  }

  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 12px !important;
  font-size: 14px;

  .line-span {
    display: inline-block;
    width: 30px;
    text-align: center;
  }

  .btn {
    width: fit-content;
    height: 24px;
    padding: 0 12px;
    font-size: 12px;
    line-height: 24px;
    cursor: pointer;
    background: $bg-line;
    border-radius: 4px;

    &:hover {
      color: #fff;
      background: $bg-color;
    }
  }

  .number-box {
    div {
      flex: auto;
    }

    .ant-input-number {
      margin-right: 16px;
      border: none;
    }
  }

  .file-box {
    display: flex;

    input {
      flex: 7;
      margin-right: 16px;
    }

    .file-input {
      @mixin common {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 31px;
      }

      position: relative;
      flex: 1;
      cursor: pointer;
      border: 1px solid $bg-color;
      border-radius: 4px;

      input {
        @include common;

        z-index: 1;
        opacity: 0;
      }

      span {
        @include common;

        z-index: 0;
        line-height: 31px;
        color: $bg-color;
        text-align: center;
        background: $bg-input;
      }

      &:hover {
        span {
          color: #fff;
          background: $bg-color;
        }
      }
    }
  }

  > div {
    flex-shrink: 0;
  }

  .title {
    min-width: 122px;
    margin-right: 38px;
  }

  .area-box {
    display: flex;

    div {
      flex: 6;
      margin-right: 12px;
    }

    > input {
      flex: 6;
      margin-right: 12px;
    }

    label {
      flex: 1;
    }
  }

  .name-box {
    display: flex;

    input:nth-child(1) {
      flex: 6;
      margin-right: 12px;
    }

    input:nth-child(2) {
      flex: 1;
    }
  }

  .radio-box {
    .custom-box {
      position: relative;

      input {
        position: absolute;
        top: -4px;
        left: 80px;
        width: 100%;
        width: 600px;
        height: 31px;
        padding-left: 12px;
        border: 1px solid #d8d9e6;
        border-radius: 4px;
      }
    }
  }

  .textarea-box {
    textarea {
      max-height: 100px;
    }
  }

  .change-box {
    @include btnStyle;

    width: 130px;
    margin-left: 36px;
  }

  .checkbox-el {
    padding-left: 30px;
  }

  .input {
    flex: 1;
    // background: $bg-input;
    line-height: 31px;

    &.no-bg {
      background: none;
    }

    input {
      width: 100%;
      padding-left: 12px;
      border: 1px solid #d8d9e6;
      border-radius: 4px;

      &:focus {
        border: 1px solid $bg-btn-2;
      }
    }

    .TLSSSL {
      display: flex;
      width: 100%;

      > div {
        @include btnStyle;

        flex-shrink: 0;
        width: 203px;
        height: 31px;
        margin-right: 36px;

        &.cancel {
          color: rgb(0 0 0 / 20%);
          border: 1px solid rgb(0 0 0 / 20%);

          &:hover {
            color: rgb(0 0 0 / 20%);
            cursor: not-allowed;
            background: none;
          }
        }
      }
    }
  }
}
</style>
