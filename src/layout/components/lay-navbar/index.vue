<script setup lang="ts">
import { unref, ref, getCurrentInstance } from 'vue'
import { useNav } from '@/layout/hooks/useNav'
import LaySearch from '../lay-search/index.vue'
import LayNotice from '../lay-notice/index.vue'
import LayNavMix from '../lay-sidebar/NavMix.vue'
import LaySidebarFullScreen from '../lay-sidebar/components/SidebarFullScreen.vue'
import LaySidebarBreadCrumb from '../lay-sidebar/components/SidebarBreadCrumb.vue'
import LaySidebarTopCollapse from '../lay-sidebar/components/SidebarTopCollapse.vue'
import { handleAliveRoute, getTopMenu } from '@/router/utils'
import ModifyPwd from '@/layout/components/lay-navbar/modifyPwd.vue'
import UseLogout from '@/hooks/useLogout.js'
const { logout } = UseLogout()

import LogoutCircleRLine from '@iconify-icons/ri/logout-circle-r-line'
import Setting from '@iconify-icons/ri/settings-3-line'
import RefreshRight from '@iconify-icons/ep/refresh-right'
const { proxy } = getCurrentInstance()
const { layout, device, onPanel, pureApp, username, userAvatar, avatarsStyle, toggleSideBar } = useNav()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const modifyPwdRef = ref(null)
function onFresh() {
  const { fullPath, query } = unref(route)
  router.replace({
    path: '/redirect' + fullPath,
    query,
  })
  handleAliveRoute(route, 'refresh')
}
const modifyPwd = () => {
  modifyPwdRef.value.open()
}
</script>

<template>
  <div class="navbar bg-[#fff] shadow-sm shadow-[rgba(0,21,41,0.08)]">
    <LaySidebarTopCollapse
      v-if="device === 'mobile'"
      class="hamburger-container"
      :is-active="pureApp.sidebar.opened"
      @toggleClick="toggleSideBar"
    />

    <LaySidebarBreadCrumb v-if="layout !== 'mix' && device !== 'mobile'" class="breadcrumb-container" />

    <LayNavMix v-if="layout === 'mix'" />

    <div v-if="layout === 'vertical'" class="vertical-header-right">
      <div class="search-container w-[40px] h-[48px] flex-c cursor-pointer navbar-bg-hover m-r-10" @click="onFresh">
        <o-tooltip content="刷新">
          <IconifyIconOffline :icon="RefreshRight" />
        </o-tooltip>
      </div>

      <div
        class="search-container w-[40px] h-[48px] flex-c cursor-pointer navbar-bg-hover m-r-10"
        @click="logout(true)"
      >
        <o-tooltip content="退出系统">
          <IconifyIconOffline :icon="LogoutCircleRLine" style="margin: 5px" />
        </o-tooltip>
      </div>
      <!-- 菜单搜索 -->
      <LaySearch id="header-search" />
      <!-- 全屏 -->
      <LaySidebarFullScreen id="full-screen" />
      <!-- 消息通知 -->
      <!-- <LayNotice id="header-notice" /> -->
      <!-- 退出登录 -->
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link navbar-bg-hover select-none">
          <img src="@/assets/image/logo@2x-blue.png" :style="avatarsStyle" />
          <p v-if="username" class="dark:text-white">{{ username }}</p>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="modifyPwd">
              <o-icon name="edit" class="po-r" />
              修改密码
            </el-dropdown-item>
            <el-dropdown-item @click="logout">
              <IconifyIconOffline :icon="LogoutCircleRLine" class="m-r-8" />
              退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="set-icon navbar-bg-hover" title="打开系统配置" @click="onPanel">
        <IconifyIconOffline :icon="Setting" />
      </span>
    </div>

    <ModifyPwd ref="modifyPwdRef" />
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 48px;
  overflow: hidden;

  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 48px;
    cursor: pointer;
  }

  .vertical-header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 280px;
    height: 48px;
    color: #000000d9;

    .el-dropdown-link {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 48px;
      padding: 10px;
      color: #000000d9;
      cursor: pointer;

      p {
        font-size: 14px;
      }

      img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
      }
    }
  }

  .breadcrumb-container {
    float: left;
    margin-left: 16px;
  }
}

.logout {
  width: 120px;

  ::v-deep(.el-dropdown-menu__item) {
    display: inline-flex;
    flex-wrap: wrap;
    min-width: 100%;
  }
}
</style>
