<script setup lang="ts">
import { ref, getCurrentInstance, nextTick, toRaw, inject, computed } from 'vue'
const instance = getCurrentInstance()
const proxy = instance.proxy
const faRef = ref()
const allNames = ref([])

initPath()
function initPath() {
  allNames.value = []
  nextTick(() => {
    traverseChildren(instance.parent.subTree.children[1].component.subTree.component)
  })
}
function traverseChildren(ins) {
  if (!ins) {
    return
  }
  if (ins.type?.__file) {
    allNames.value.push(ins.type.__file)
  }

  if (ins.subTree?.children && Array.isArray(ins.subTree?.children)) {
    ins.subTree?.children?.forEach((v) => {
      traverseChildren(v)
    })
  }

  if (ins.component?.subTree?.children) {
    if (ins.component.subTree?.children && Array.isArray(ins.component.subTree?.children)) {
      ins.component.subTree.children.forEach((v) => {
        traverseChildren(v)
      })
    }
  }
  if (ins.children && Array.isArray(ins.children)) {
    ins.children.forEach((v) => {
      if (v.type.__name) {
        traverseChildren(v)
      }
    })
  }
}

const getAllList = computed(() => {
  let filterStr = ['src/components', 'src/autoComponents']
  let res = allNames.value
    .filter((v) => {
      let flag = true
      filterStr.forEach((val) => {
        if (v.includes(val)) {
          flag = false
        }
      })
      return flag
    })
    .map((v) => {
      let splitPath = v.split('src/views/')?.[1] || v
      return splitPath
    })
  return Array.from(new Set(res))
})

defineExpose({
  initPath,
})
</script>

<template>
  <div class="file-name-box">
    <div v-for="(v, i) in getAllList" :key="i" class="file-name-item">
      <span v-copy="v" class="cp">{{ v }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-name-box {
  position: fixed;
  top: 30px;
  left: 400px;
  z-index: 999;
  display: flex;
  display: inline-block;
  flex-wrap: wrap;
  align-items: center;
  padding: 8px;
  font-style: 10px;
  opacity: 0.3;

  .file-name-item {
    display: inline-block;
    margin: 4px 20px;
    color: blue;

    &:hover {
      color: #e4393c;
    }
  }
}
</style>
