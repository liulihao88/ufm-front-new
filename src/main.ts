import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'
import { getPlatformConfig } from './config'
import { MotionPlugin } from '@vueuse/motion'
import { createPinia } from 'pinia'
import mitt from 'mitt'
// import { useEcharts } from "@/plugins/echarts";
import { createApp, type Directive } from 'vue'
import { useElementPlus } from '@/plugins/elementPlus'
import { injectResponsiveStorage } from '@/utils/responsive'
import configModule from './components/configModule'

const pinia = createPinia()
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)

import Table from '@pureadmin/table'
// import PureDescriptions from "@pureadmin/descriptions";

// 引入重置样式
import './style/reset.scss'
// 导入公共样式
import './style/index.scss'
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import './style/tailwind.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 导入字体图标
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'
// 引入iconfont
import './icon/iconfont.css'

import Antd, { ConfigProvider } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

// 自定义指令
import * as directives from '@/directives'
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

// 全局注册@iconify/vue图标库
import { IconifyIconOffline, IconifyIconOnline, FontIcon } from './components/ReIcon'
app.component('IconifyIconOffline', IconifyIconOffline)
app.component('IconifyIconOnline', IconifyIconOnline)
app.component('FontIcon', FontIcon)

// 全局注册按钮级别权限组件
import { Auth } from '@/components/ReAuth'
app.component('Auth', Auth)

// 全局注册vue-tippy
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import VueTippy from 'vue-tippy'
app.use(VueTippy)

// 全局注册oeos-components
import 'oeos-components/dist/style.css'
import OeosComponents, { utils } from 'oeos-components'

Object.keys(utils).forEach((v) => {
  app.config.globalProperties[v] = utils[v]
})
import * as localUtils from '@/utils/gFunc.ts'
Object.keys(localUtils).forEach((v) => {
  app.config.globalProperties[v] = localUtils[v]
})

// 引入全局组件
import globComps from '@/utils/autoImportComps.js'
app.use(globComps)
import * as echarts from 'echarts'
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$mitt = mitt()

// 把新的全局request挂载到全局
import Request from '@/utils/request.ts'
app.config.globalProperties.request = Request

// 引入vChart
import VChart from 'vue-echarts'
app.component('vChart', VChart)

let $dev = import.meta.env.MODE === 'development'
app.config.globalProperties.$dev = utils.getStorage('$dev') ?? $dev
app.config.globalProperties.$local = location.hostname === 'localhost'
app.config.globalProperties.$test = location.hostname.startsWith('10.0.11.99') || location.hostname === 'localhost'
app.config.globalProperties.$other = import.meta.env.VITE_OTHER === 'true'
app.config.globalProperties.$mitt = mitt()
import svgIconPlugin from './components/svgIcon/index'
import 'virtual:svg-icons-register'

app.config.globalProperties.$dev = import.meta.env.DEV
getPlatformConfig(app).then(async (config) => {
  setupStore(app)
  app.use(router)
  await router.isReady()
  injectResponsiveStorage(app, config)
  app
    .use(MotionPlugin)
    .use(useElementPlus)
    .use(Table)
    .use(Antd)
    .use(ConfigProvider)
    .use(pinia)
    .use(configModule)
    .use(OeosComponents)
    .use(ElementPlus, { locale: zhCn })
    .use(svgIconPlugin)
  app.mount('#app')
})
