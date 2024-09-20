<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const options = [
  {
    label: '文件名字',
    value: 'FileName',
  },
  {
    label: '文件路径',
    value: 'FilePath',
  },
  {
    label: '文件大小',
    value: 'FileSize',
  },
  {
    label: '文件拓展名',
    value: 'FileExtention',
  },
  {
    label: '最新更新时间',
    value: 'lastModifiedTime',
  },
  {
    label: '创建时间',
    value: 'CreateTime',
  },
]
const form = ref({
  stringSource: options[0].value,
  findStartString: '',
  findStartStringBackward: false,
  theNumberOfFindStartString: 1,
  startOffset: 0,
  findEndString: '',
  findEndBackward: false,
  theNumberOfFindEndString: 1,
  endOffset: 0,
  length: 0,
})
const formRef = ref(null)
const rules = {
  // findStartString: [proxy.validate()],
  // findEndString: [proxy.validate()],
  // findStartStringBackward: [proxy.validate()],
  // falseValue: [proxy.validate()],
  // stringSource: [proxy.validate()],
}
watch(
  () => props.data,
  (val) => {
    form.value = Object.assign({}, form.value, val)
    // form.value = val
  },
  {
    immediate: true,
  },
)
defineExpose({
  form,
})
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" @submit.native.prevent>
    <el-form-item label="字符串来源" prop="stringSource">
      <o-select v-model="form.stringSource" :options="options" />
    </el-form-item>
    <el-form-item label="开始文本" prop="findStartString">
      <o-input v-model="form.findStartString" v-focus />
    </el-form-item>
    <el-form-item label="向后" prop="findStartStringBackward">
      <el-checkbox v-model.number="form.findStartStringBackward" />
    </el-form-item>
    <el-form-item label="从第" prop="theNumberOfFindStartString">
      <div class="f">
        <o-input v-model.number="form.theNumberOfFindStartString" v-number width="100" class="mr" />
        <div>个找到的开始</div>
      </div>
    </el-form-item>
    <el-form-item label="偏移" prop="startOffset">
      <div class="f">
        <o-input v-model.number="form.startOffset" type="number" width="100" class="mr" />
        <div>< 0 从找到文本之前的位置开始截取</div>
      </div>
    </el-form-item>
    <el-form-item label="结束索引">
      <div>如果没有指定文本, 则默认为整个长度, 如果有指定结束文本, 则尝试寻找结束文本的位置作为结束索引</div>
    </el-form-item>
    <hr class="m-tb-24" />

    <el-form-item label="结束文本" prop="findEndString">
      <o-input v-model="form.findEndString" />
    </el-form-item>
    <el-form-item label="向后" prop="findEndBackward">
      <el-checkbox v-model="form.findEndBackward" />
    </el-form-item>

    <el-form-item label="从第" prop="theNumberOfFindEndString">
      <div class="f">
        <o-input v-model.number="form.theNumberOfFindEndString" v-number width="100" class="mr" />
        <div>个找到开始</div>
      </div>
    </el-form-item>
    <el-form-item label="偏移" prop="endOffset">
      <div class="f">
        <o-input v-model.number="form.endOffset" type="number" width="100" class="mr" />
        <div>< 0 从找到文本之前的位置开始截取</div>
      </div>
    </el-form-item>
    <hr class="m-tb-24" />
    <el-form-item label="长度" prop="length">
      <div class="f">
        <o-input v-model.number="form.length" type="number" width="100" class="mr" />
        <div>< 0 表示从开始偏移量之后的所有字符串</div>
      </div>
    </el-form-item>
  </el-form>
</template>
