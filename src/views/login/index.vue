<template>
  <div class="page-layout">
    <img src="@/assets/image/bg3.png" class="bg-el" />
    <div class="data-box">
      <div class="img-box">
        <img src="@/assets/image/logo@2x.png" class="w-50 mr" />
        <div class="tc">
          {{ proxy.$other ? '网络存储上传系统' : '统一文件管理系统' }}
        </div>
      </div>
      <Login class="login-box" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import Login from '@/components/login.vue'
</script>

<style lang="scss">
.page-layout {
  position: relative;
  height: 100vh;
  background: url('../../assets/image/LOGIN-bg.png') no-repeat center;
  background-size: 100%;

  .bg-el {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    opacity: 0.12;
  }

  .data-box {
    position: absolute;
    top: calc(50% - 200px);
    right: 200px;
    width: 500px;
    height: 500px;

    .line {
      font-size: 200px;
      color: #fff;
      opacity: 0.1;
    }

    .img-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      font-size: 30px;
      color: #fff;
      opacity: 0.8;
    }
  }
}
</style>
