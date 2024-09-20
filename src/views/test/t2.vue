<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <div>test/t2111.vue</div>
    <div v-for="(v, i) in 300" :key="i">
      <div>{{ v }}</div>
      ???
    </div>
  </div>
</template>
