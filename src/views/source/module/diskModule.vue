<template>
  <div class="disk-content">
    <ul class="oct-disk-box">
      <li v-for="(item, index) in diskData" :key="index" class="item">
        <div class="m-r-12 w-108 tr">自定义盘符{{ index + 1 }}:</div>
        <o-input v-model="item.name" width="200" class="m-r-8" />
        <o-input v-model="item.path" class="item-right w-100%" />
      </li>
    </ul>
    <div class="m-l-120">
      <el-checkbox v-bind="$attrs">检测目录存在性（仅显示实际存在的目录）</el-checkbox>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref, watch, getCurrentInstance } from 'vue'

const props = defineProps({
  tableData: {
    type: Array,
    default: null,
  },
})
const isOk = ref(false)
const { proxy } = getCurrentInstance()
const diskData = ref([
  {
    id: 0,
    name: '',
    path: '',
  },
  {
    id: 1,
    name: '',
    path: '',
  },
  {
    id: 2,
    name: '',
    path: '',
  },
  {
    id: 3,
    name: '',
    path: '',
  },
  {
    id: 4,
    name: '',
    path: '',
  },
  {
    id: 5,
    name: '',
    path: '',
  },
  {
    id: 6,
    name: '',
    path: '',
  },
  {
    id: 7,
    name: '',
    path: '',
  },
  {
    id: 8,
    name: '',
    path: '',
  },
  {
    id: 9,
    name: '',
    path: '',
  },
])

watch(
  () => props.tableData,
  (newVal) => {
    let initFn = () => {
      diskData.value.forEach((el) => {
        el.name = ''
        el.path = ''
      })
    }
    initFn()
    if (newVal) {
      newVal.forEach((item, index: number) => {
        diskData.value.forEach((el) => {
          if (index == el.id) {
            el.name = item.name
            el.path = item.path
          }
        })
      })
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

const changeDisk = async () => {
  let filterData = diskData.value.filter((item) => {
    return item.name || item.path
  })
  return new Promise((resolve, reject) => {
    if (proxy.isEmpty(filterData)) {
      proxy.$toast('请填写完整的自定义盘符', 'e')
      return reject()
    }

    for (let i = 0; i < filterData.length; i++) {
      let item = filterData[i]
      if (proxy.isEmpty(item.name) || proxy.isEmpty(item.path)) {
        proxy.$toast('请填写完整的自定义盘符', 'e')
        return reject()
      }
    }

    return resolve(filterData)
  })
}

defineExpose({
  changeDisk,
})
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  width: 100%;
  margin-bottom: 10px;

  &-right {
    flex: 1;
  }
}
</style>
