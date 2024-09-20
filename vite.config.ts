import { getPluginsList } from './build/plugins'
import { include, exclude } from './build/optimize'
import { type UserConfigExport, type ConfigEnv, loadEnv } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { root, alias, wrapperEnv, pathResolve, __APP_INFO__ } from './build/utils'

import config from './src/config/baseConfig.ts'
const target = 'https://10.0.11.33:8008/'

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_CDN, VITE_PORT, VITE_COMPRESSION, VITE_PUBLIC_PATH } = wrapperEnv(loadEnv(mode, root))
  return {
    // base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "../src/assets/css/main.scss";',
        },
      },
    },
    // 服务端渲染
    server: {
      open: false,
      hmr: true,
      port: 8099,
      host: '0.0.0.0',
      https: false,
      hotOnly: true, // 更新失败不会刷新页面配置
      disableHostCheck: true,
      proxy: {
        '/api': {
          target: config.url,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/bpd101': {
          target: config.url101,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/bpd101/, ''),
        },
      },
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
    },
    plugins: getPluginsList(VITE_CDN, VITE_COMPRESSION),
    // https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
    optimizeDeps: {
      include,
      exclude,
    },
    build: {
      // https://cn.vitejs.dev/guide/build.html#browser-compatibility
      outDir: 'ufm',
      target: 'es2015',
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve('./index.html', import.meta.url),
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  }
}
