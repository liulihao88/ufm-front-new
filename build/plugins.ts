import { cdn } from './cdn'
import vue from '@vitejs/plugin-vue'
import { viteBuildInfo } from './info'
import svgLoader from 'vite-svg-loader'
import type { PluginOption } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { configCompressPlugin } from './compress'
import removeNoMatch from 'vite-plugin-router-warn'
import { visualizer } from 'rollup-plugin-visualizer'
import removeConsole from 'vite-plugin-remove-console'
import { themePreprocessorPlugin } from '@pureadmin/theme'
import { genScssMultipleScopeVars } from '../src/layout/theme'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import zipPack from 'vite-plugin-zip-pack'

export function getPluginsList(VITE_CDN: boolean, VITE_COMPRESSION: ViteCompression): PluginOption[] {
  const lifecycle = process.env.npm_lifecycle_event
  return [
    vue(),
    // jsx、tsx语法支持
    vueJsx(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/image/SVG')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    viteBuildInfo(),
    /**
     * 开发环境下移除非必要的vue-router动态路由警告No match found for location with path
     * 非必要具体看 https://github.com/vuejs/router/issues/521 和 https://github.com/vuejs/router/issues/359
     * vite-plugin-router-warn只在开发环境下启用，只处理vue-router文件并且只在服务启动或重启时运行一次，性能消耗可忽略不计
     */
    removeNoMatch(),
    zipPack({
      inDir: 'ufm', // 输入的文件夹，就是要打包的文件夹
      outDir: './', // 打包好的 zip 文件放到哪个文件夹下
      outFileName: `ufm.zip`, // 打包好的文件名，自行定义，这里我定义了一个 timeStringNow 变量，放置了此时此刻的时间 2024-01-06 这样的
      pathPrefix: '',
    }),
    // mock支持
    vitePluginFakeServer({
      logger: false,
      include: 'mock',
      infixName: false,
      enableProd: true,
    }),
    // 自定义主题
    themePreprocessorPlugin({
      scss: {
        multipleScopeVars: genScssMultipleScopeVars(),
        extract: true,
      },
    }),
    // svg组件化支持
    svgLoader(),
    VITE_CDN ? cdn : null,
    configCompressPlugin(VITE_COMPRESSION),
    // 线上环境删除console
    removeConsole({ external: ['src/assets/iconfont/iconfont.js'] }),
    // 打包分析
    lifecycle === 'report' ? visualizer({ open: true, brotliSize: true, filename: 'report.html' }) : (null as any),
  ]
}
