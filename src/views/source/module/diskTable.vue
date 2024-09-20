<template>
  <a-table :columns="columns" :data-source="data" :pagination="false" :scroll="{ x: 600, y: 300 }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <input :key="record.key" v-model="record.name" placeholder="请输入自定义別名" @change="changeFn" />
      </template>
      <template v-if="column.key === 'path'">
        <input :key="record.key" v-model="record.path" placeholder="请输入自定义目录路径" @change="changeFn" />
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'
const columns: any = [
  {
    title: 'NO.',
    dataIndex: 'tags',
    key: 'tags',
    width: 60,
  },
  {
    title: '别名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '自定义目录路径',
    dataIndex: 'path',
    key: 'path',
  },
]

const data: any = [
  {
    key: '1',
    name: '',
    path: '',
    tags: [' 1'],
  },
  {
    key: '2',
    name: '',
    path: '',
    tags: [' 2'],
  },
  {
    key: '3',
    name: '',
    path: '',
    tags: [' 3'],
  },
  {
    key: '4',
    name: '',
    path: '',
    tags: [' 4'],
  },
  {
    key: '5',
    name: '',
    path: '',
    tags: [' 5'],
  },
  {
    key: '6',
    name: '',
    path: '',
    tags: [' 6'],
  },
  {
    key: '7',
    name: '',
    path: '',
    tags: [' 7'],
  },
  {
    key: '8',
    name: '',
    path: '',
    tags: [' 8'],
  },
  {
    key: '9',
    name: '',

    path: '',
    tags: [' 9'],
  },
  {
    key: '10',
    name: '',
    path: '',
    tags: [' 10'],
  },
]

export default defineComponent({
  components: {},
  emits: ['tableInfoFn'],
  setup() {
    const LFS_Data: any = inject('LFS_Data')
    const changeFn = () => {
      LFS_Data.value = data
    }
    return {
      data,
      columns,
      changeFn,
      LFS_Data,
    }
  },
})
</script>
