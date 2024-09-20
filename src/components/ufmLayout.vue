<template>
  <a-layout style="height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible style="height: 100%" @collapse="collapseFn">
      <div class="logo">
        <img v-if="proxy.$other" src="../assets/image/logo@2x-blue.png" />
        <span v-show="!collapsed">{{ proxy.$other ? '网络存储上传系统' : '统一文件管理系统' }}</span>
      </div>
      <ul class="bar-item-box">
        <li v-for="(item, index) in meunDataArr_V" :key="index">
          <DownOutlined class="icon-ufm-xiala" :class="item.isOpen ? 'icon-staus-el ' : ''" />
          <div class="title" :class="item.isOpen ? 'show-el ' : ''" @click="meunControlFn(item)">
            <span class="title_icon">
              <AuditOutlined v-if="item.title === '任务'" />
              <ShopOutlined v-else-if="item.title === '资源'" />
              <user-outlined v-else-if="item.title === '客戶端'" />
            </span>
            <span v-show="!collapsed">{{ item.title ? item.title : '' }}</span>
          </div>
          <template v-for="(el, index) in item.child" :key="index">
            <!-- {{ item.isHidden }}?? {{ el.isHidden }} -->
            <div
              v-show="item.isOpen && !el.isHidden"
              class="item"
              :class="{ active: el.isActive, enter: item.isOpen }"
              @click="changePage(el, item.title)"
            >
              <span v-show="!collapsed">{{ el.pathName }}</span>
            </div>
          </template>
        </li>
      </ul>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style=" padding: 0;background: #fff; border-bottom: 1px solid #ebebed">
        <div class="top-content">
          <h1>
            <span class="iconfont icon-ufm-cengji1" />
            {{ titleStr_tow }}
            <RightOutlined />
            <span class="main-title">{{ titleStr }}</span>
            <span v-if="current_title" class="main-title">
              <RightOutlined />
              {{ current_title }}
              <CloseOutlined @click="closeFn" />
            </span>
          </h1>
          <ul class="top-muen-box clearfix">
            <li class="f-bt-ct h-40">
              <o-tooltip v-if="proxy.$dev" content="退出登录" class="m-r-16 cp" @click="toLogin">
                <span class="iconfont icon-ufm-tuichu1 m-r-4" />
              </o-tooltip>
              <div class="m-r-24" @click="nativeRefresh">
                <o-icon name="refresh" class="po-r t-2" content="刷新" />
              </div>
              <el-dropdown>
                <div class="">
                  <span class="iconfont icon-ufm-ziyuanxhdpi" />
                  {{ atobUsername }}
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <div class="" @click="modifyPwd">
                        <o-icon name="edit" class="po-r t-4" />
                        修改密码
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div class="cp" @click="toLogin">
                        <span class="iconfont icon-ufm-tuichu1 m-r-4" />
                        退出登录
                      </div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </li>
          </ul>
        </div>
      </a-layout-header>
      <a-layout-content v-loading="loading" style="margin: 14px 14px 0">
        <div class="slot-box" :class="bgColorClass ? bgColorClass : ''">
          <slot />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
  <o-dialog ref="dialogRef" v-model="isShow" title="修改密码" @confirm="confirm">
    <o-form ref="gFormRef" :model="model" :fieldList="fieldList" :rules="rules" />
  </o-dialog>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { meunDataArr } from '../config/data'
import { md5EncryptToBytes } from '@/utils/gFunc.ts'
import { loading } from '@/utils/request.js'
import { useStore } from 'vuex'
import useNativeRefresh from '@/hooks/useNativeRefresh.js'
const useRefresh = useNativeRefresh()
import { useGlobalStore } from '@/store/useGlobal.js'
const { changeTaskValue } = useGlobalStore()
import UseLogout from '@/hooks/useLogout.js'
const { toLogin } = UseLogout()

import {
  RightOutlined,
  CloseOutlined,
  DownOutlined,
  AuditOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { ref, watch, getCurrentInstance, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const { proxy } = getCurrentInstance()

const props = defineProps({
  f_title: {
    type: String,
    default: '',
  },
  t_title: {
    type: String,
    default: '',
  },
  current_title: {
    type: String,
    default: '',
  },
  bgColorClass: {
    type: String,
    default: '',
  },
})
const model = ref({
  newPasword: '',
  oldPasword: '',
})
const rules = {
  oldPasword: [proxy.validate()],
  newPasword: [proxy.validate()],
}
const fieldList = [
  {
    label: '旧密码',
    prop: 'oldPasword',
  },
  {
    label: '新密码',
    prop: 'newPasword',
  },
]

const router = useRouter()
const route = useRoute()
const gFormRef = ref(null)
const collapsed = ref(false)
let titleStr = ref(props.f_title)
let titleStr_tow = ref(props.t_title)
const userInfo = ref({})
userInfo.value = proxy.getStorage('userInfo') ?? {}
const emits = defineEmits(['success'])
watch(
  () => props.f_title,
  (newVal) => {
    titleStr.value = newVal
  },
)
watch(
  () => props.t_title,
  (newVal) => {
    titleStr_tow.value = newVal
  },
)
const collapseFn = () => {}
let meunDataArr_V: any = ref([])
meunDataArr_V.value = JSON.parse(JSON.stringify(meunDataArr))
meunDataArr_V.value.map((item) => {
  item.child.map((el: any) => {
    if (el.path == router.currentRoute.value.fullPath) {
      el.isActive = true
    } else {
      el.isActive = false
    }
  })
})
const isVisible = ref<boolean>(false)
const alertData = ref<any>({
  text: '',
  value: '',
})

const pathName = ref('')
const pathIcon = ref('icon_menu_01')
let queryTitle: string = route.query.title
let queryPathName: string = route.query.pathName
if (queryPathName) {
  meunDataArr_V.value.map((item: any) => {
    item.isOpen = false
    if (item.title === queryTitle) {
      item.isOpen = true
      item.child.map((el: any) => {
        if (el.pathName == queryPathName) {
          el.isActive = true
        } else {
          el.isActive = false
        }
      })
    }
  })
}
const modifyPwd = () => {
  isShow.value = true
}
const atobUsername = computed(() => {
  if (userInfo.value.username) {
    return atob(userInfo.value.username)
  }
  return ''
})
const changePage = (obj: object, title: string) => {
  pathIcon.value = obj.svg
  meunDataArr_V.value.map((item: any) => {
    item.isOpen = false
    if (item.title === title) {
      item.isOpen = true
    }
    item.child.map((el: any) => {
      if (el.pathName == obj.pathName) {
        el.isActive = true
      } else {
        el.isActive = false
      }
    })
  })
  if (obj.name != 'login') {
    router.push({
      name: obj.name,
      query: { title: title, pathName: obj.pathName },
    })
  } else {
    isVisible.value = true
    pathName.value = obj.name
  }
}
const isShow = ref(false)
const confirm = async () => {
  await gFormRef.value.validate()
  if (model.value.oldPasword === model.value.newPasword) {
    return proxy.$toast('新旧密码不能一致', 'e')
  }
  const pwdData = {
    userId: userInfo.value.id,
    username: userInfo.value.username,
    oldPasword: md5EncryptToBytes(model.value.oldPasword),
    newPasword: md5EncryptToBytes(model.value.newPasword),
  }
  let res = await proxy.request({
    url: '/security/changepwd',
    method: 'post',
    data: pwdData,
    custom: true,
  })
  if (res.data == '') {
    isShow.value = false
    proxy.$toast('修改密码成功')
  }
}

const valueStringV = ref()
const closeFn = () => {
  emits('closeFn')
}

const cancelBackFn = () => {
  isVisible.value = false
}
const meunControlFn = (item) => {
  meunDataArr_V.value.map((el: any) => {
    //el.isOpen = false;
    if (item.title === el.title) {
      el.isOpen = !el.isOpen
    }
  })
}

function nativeRefresh() {
  useRefresh.refreshHandler()
}
</script>
<style lang="scss" scoped>


$barLineColor: #454b54;

@keyframes animation-conf {
  from {
    opacity: 0.4;
  }

  to {
    opacity: 1;
  }
}

.enter {
  animation: animation-conf 400ms;
}

.sider-bar-box {
  width: 234px;
  height: 100vh;
}

.bar-item-box {
  width: 100%;
  height: 100%;
  padding: 12px 0 0;

  > li {
    position: relative;
    margin: 0 auto 6px;
    font-size: 14px;

    .icon-ufm-xiala {
      position: absolute;
      top: 17px;
      left: 170px;
      z-index: 100;
      width: 14px;
      color: #fff !important;
      text-align: right;
      opacity: 0.3;

      &.icon-staus-el {
        transform: rotateX(0.5turn);
      }
    }

    .title {
      position: relative;
      width: 216px;
      height: 48px;
      font-size: $fontSize1;
      color: #fff;
      cursor: pointer;
      background: $bgColor_block;
      border-radius: 4px;
      opacity: 1;

      // svg {
      //   position: absolute;
      //   top: 16px;
      //   left: 16px;
      // }
      .title_icon {
        position: absolute;
        top: 4px;
        left: -26px;
      }
      // span {
      //   left: 20px;
      // }

      &:hover {
        background: $bg-btn-2;
      }

      &.show-el {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        background: $frontColor1;
        border-bottom: 1px solid $frontColor;

        &:hover {
          color: $bg-btn-1;
        }
      }
    }

    .item {
      position: relative;
      width: 216px;
      height: 48px;
      color: rgb(255 255 255 / 50%);
      cursor: pointer;
      background: $frontColor1;
      border-radius: 4px;

      svg {
        position: absolute;
        top: 16px;
        left: 16px;
      }

      span {
        &:hover {
          color: $bg-input;
        }
      }

      &:hover {
        color: rgb(255 255 255 / 80%);
        background: $barLineColor;
      }

      &.active {
        font-weight: 600;
        color: #fff;
        background: $bg-color;

        &:hover {
          font-size: $fontSize1;
          color: #fff;
        }
      }
    }

    img {
      position: absolute;
      top: $fontSize1;
      left: 16px;
      width: 16px;
    }

    span {
      position: absolute;
      top: 14px;
      left: 42px;
    }
  }
}

.logo {
  position: relative;
  width: 100%;
  height: 63px;
  font-size: 16px;
  border-bottom: 1px solid $barLineColor;

  span {
    display: block;
    padding-top: 21px;
    padding-left: 60px;
    line-height: 20px;
    color: #fff;
  }

  img {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 36px;
  }
}

.slot-box {
  // overflow: hidden;
  min-width: 800px;
  // height: 100%;
  overflow: auto;

  &.white-bg {
    background: #fff;
  }
}

.ant-layout-header {
  position: relative;
  text-align: right;

  .top-content {
    position: relative;
    height: 62px;
    line-height: 62px;

    h1 {
      position: absolute;
      top: 21px;
      left: 24px;
      font-size: 17px;
      color: #ccc;

      .main-title {
        padding: 1px 6px;
        font-size: 14px;
        font-weight: 600;
        color: #333;
        color: $bg-btn;
        background: $bg-line-2;
        border-radius: 2px;

        .anticon-close {
          cursor: pointer;

          &:hover {
            color: $bg-btn-2;
          }
        }
      }

      .anticon-right {
        font-size: 12px;
      }
    }

    .top-muen-box {
      position: absolute;
      top: 16px;
      right: 25px;
      width: 40%;

      > li {
        position: relative;
        float: right;
        padding-left: 30px;
      }

      .link {
        padding: 5.5px 16px;
        font-size: 12px;
        line-height: 17px;
        color: $bg-color;
        background: $bg-input;
        border-radius: 4px;

        img {
          position: absolute;
          top: 7px;
          right: 16px;
          width: 14px;
        }
      }

      .cut {
        width: 48px;
        height: 28px;
        padding: 0 10px;

        img {
          position: absolute;
          top: 0;
          left: 10px;
          width: 28px;
        }

        &::after {
          position: absolute;
          top: 8px;
          right: 0;
          width: 1px;
          height: 8px;
          content: '';
          background: #e8e8e8;
        }
      }

      .draft {
        width: 16px;
        height: 16px;
        padding: 5px 12px 7px;

        img {
          position: absolute;
          width: 16px;
        }
      }
    }
  }

  .meun-box {
    position: relative;
    width: 100%;
    height: 48px;
    font-size: 13px;
    line-height: 18px;
    background: #fff;

    .tow-level {
      position: relative;

      svg {
        position: absolute;
        top: 8px;
        right: -20px;
        cursor: pointer;
      }
    }

    .user-name {
      position: absolute;
      top: 14px;
      right: 26px;

      span {
        font-weight: 600;
        color: $bg-color;
      }
    }

    .content {
      position: absolute;
      top: $fontSize1;
      left: 24px;
      padding-left: 16px;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 16px;
      }

      span {
        padding: 5px 6px;
        font-size: 16px;
        color: #878c97;
      }
    }
  }
}

.ant-layout-content {
  height: 100%;
  overflow: auto;

  .seat-el {
    width: 100%;
    height: 48px;
  }
}
</style>
