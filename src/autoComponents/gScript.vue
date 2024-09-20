<template>
  <div>
    <div id="code-content" />
    <input type="hidden" name="komutdosyasi" style="display: none" />
  </div>
</template>

<script lang="ts" setup>
/** @使用方式
  <g-script ref="gScriptRef" :value="form.script"></g-script>
  let scriptValue = gScriptRef.value.scriptValue
*/
import '@/assets/js/ace'
import '@/assets/js/theme-dracula'
import '@/assets/js/mode-xml'
import '@/assets/js/theme-tomorrow'
import '@/assets/js/theme-tomorrow_night_blue'
import { ref, onMounted, getCurrentInstance, watch, nextTick } from 'vue'
//import AceEditor from "ace";//安装了库
const { proxy } = getCurrentInstance()

const props = defineProps({
  value: {
    type: String,
  },
})
const editor = ref()
const scriptValue = ref()

watch(
  () => props.value,
  (val) => {
    nextTick(() => {
      setValue(val)
      scriptValue.value = val
    })
  },
  {
    immediate: true,
  },
)

onMounted(() => {
  editor.value = ace.edit('code-content')
  editor.value.session.setMode('ace/mode/xml')
  editor.value.setTheme('ace/theme/tomorrow')
  editor.value.setOptions({
    // 启用滚动
    autoScrollEditorIntoView: true,
    // 启用换行
    wrap: true,
    fontSize: '15px',
    // 启用自动滚动到底部  0, 0.5, and 1
    scrollPastEnd: 0,
    // 显示参考线
    displayIndentGuides: false,
    selectionStyle: 'text',
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    useWorker: false,
  })

  var input = document.querySelector('input[name="komutdosyasi"]')
  editor.value.getSession().on('change', function () {
    var code = editor.value.getValue()
    input.value = code
    scriptValue.value = code
  })
})

function setValue(val) {
  editor.value.session.setValue(val)
}

defineExpose({
  setValue,
  scriptValue,
})
</script>

<style lang="scss">
#code-content {
  width: 100%;
  height: 78vh;

  .ace_scrollbar-v {
    @include scrollbar-style;
  }
}
</style>
