<template>
  <a-layout-sider width="400">
    <a-list item-layout="horizontal" :data-source="systemArr">
      <template #renderItem="{ item }">
        <a-list-item :class="item.isSelect ? 'show-item' : ''" @click="$emit('listSelectFn', item.name)">
          <a-list-item-meta description="">
            <template #title>
              <a href="javascript:;">{{ item.name }}</a>
            </template>
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>

    <a-space :size="size" class="btn-box">
      <a-button type="primary" @click="$emit('newFn')">新建</a-button>
      <a-button type="primary" @click="$emit('delFn')">删除</a-button>
      <a-button type="primary">克隆</a-button>
      <a-dropdown>
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1">
              <a-upload v-model:file-list="fileList" name="file" action="" :headers="headers" @change="handleChange">
                <a-button>导入配置</a-button>
              </a-upload>
            </a-menu-item>
            <a-menu-item key="2">
              <a-button>导出配置</a-button>
            </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          更多
          <DownOutlined />
        </a-button>
      </a-dropdown>
    </a-space>
  </a-layout-sider>
</template>
<script lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref, watch, nextTick } from 'vue'
// import { message } from 'ant-design-vue';
// import type { UploadChangeParam } from 'ant-design-vue';
export default defineComponent({
  components: {
    DownOutlined,
  },
  props: {
    setUpTyp_data: {
      type: Array,
      default: null,
    },
  },
  emits: ['listSelectFn', 'newFn', 'delFn'],
  setup(props) {
    const systemArr: any = ref()
    systemArr['value'] = []

    watch(
      () => props.setUpTyp_data,
      (newVal: any) => {
        nextTick(() => {
          systemArr['value'] = newVal
        })
      },
      {
        immediate: true,
        deep: true,
      },
    )
    const handleMenuClick = (e: any) => {
      console.log('click', e)
    }
    const fileList: any = ref()
    fileList['value'] = []
    const handleChange = () => {
      // if (info.file.status !== 'uploading') {
      //     console.log(info.file, info.fileList);
      // }
      // if (info.file.status === 'done') {
      //     message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === 'error') {
      //     message.error(`${info.file.name} file upload failed.`);
      // }
    }
    return {
      handleMenuClick,
      size: ref(8),
      fileList,
      handleChange,
      headers: {
        authorization: 'authorization-text',
      },
      systemArr,
    }
  },
})
</script>
<style lang="scss" scoped>
.ant-layout-sider {
  position: relative;
  width: 100%;
  background: #eee;

  .show-item {
    a {
      color: #1890ff;
    }
  }

  .btn-box {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    background: #fff;
  }
}
</style>
