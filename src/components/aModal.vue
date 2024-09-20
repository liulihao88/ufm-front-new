<template>
  <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
    <solt />
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {},
  directives: {},
  setup() {
    const visible = ref<boolean>(false)
    const handleOk = () => {
      visible.value = false
    }
    return {
      visible,
      handleOk,
    }
  },
  data() {},
  methods: {},
})
</script>
