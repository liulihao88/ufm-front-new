<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
let storage = localStorage.getStorage()
console.log(`17 storage`, storage)
</script>

<template>
  <div>
    <div>test/t3.vue</div>
  </div>
</template>
