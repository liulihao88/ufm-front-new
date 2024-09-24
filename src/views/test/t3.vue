<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const aa = ref()
const handleInput = (value) => {
  console.log(`13 value`, value)
}
</script>

<template>
  <div>
    <el-input v-model="aa" :min="1" :max="99" type="number" @input="handleInput" />
    <o-input v-model="aa" :min="1" :max="99" type="number" @input="handleInput" />
    <div>test/t3.vue</div>
  </div>
</template>
