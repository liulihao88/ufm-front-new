import type { App } from 'vue'
import SvgIcon from './svgIcon.vue'
import 'virtual:svg-icons-register'

const svgIconPlugin = {
  install(app: App): void {
    // 全局挂载
    app.component('svg-icon', SvgIcon)
  },
}

export default svgIconPlugin
