import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite' // 会解析模板并自动注册对应的组件
import { VantResolver } from '@vant/auto-import-resolver' // 会自动引入对应的组件样式
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import os from 'os'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
/**
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'
CDN引入第三方库
（坏处：vant和vue必须使用1个实例，如果vue使用cdn那么所有依赖vue的也都必须cdn，vant等组件将无法treeshaking）
如果启用CND，main.ts中需要显示引入vant.并全局注册
app.use(vant)
import vant from 'vant'
参考文章：
https://www.qianduange.cn/article/4544.html
https://vant-contrib.gitee.io/vant/#/zh-CN/advanced-usage
 */

// https://vitejs.dev/config/
export default defineConfig((opt) => {
  const env = loadEnv(opt.mode, process.cwd(), '')
  return {
    build: {
      cssCodeSplit: true, // 所有CSS打包为一个文件 https://cn.vitejs.dev/config/build-options#build-csscodesplit
      rollupOptions: {
        output: {
          manualChunks: function manualChunks(_id: string) {
            return 'index' // 全部都打一个包(后期项目大了再去掉)
            // 创建一个命名为 vendor 的 chunk，它包含所有在 node_modules 中的依赖
            // if (id.includes('node_modules')) {
            //   return 'vendor'
            // }
          }
          // manualChunks(id) {
          //   if (id.includes('utils/time')) {
          //     // 把 utils/time 单独打成1个包
          //     return 'time'
          //   }
          //   if (id.includes('components')) {
          //     // 把 components 文件里面的文件都打包到 components.js 中（可以合并小文件）
          //     return 'components'
          //   }
          // }
        }
      },
      chunkSizeWarningLimit: 500 // chunk 大小警告的限制
    },
    plugins: [
      vue(),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression({
        verbose: true, // 是否在控制台输出压缩结果
        disable: false, // 是否禁用 相当于开关在这里
        threshold: 1 * 1024, // 体积大于 10kb(10 * 1024) 才会被压缩, threshold 单位 b
        algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        ext: '.gz' // 生成的压缩包后缀
      }),
      vueJsx(),
      VueDevTools(),
      Components({
        resolvers: [VantResolver()]
      }),
      // importToCDN({
      //   modules: [
      //     {
      //       name: 'vue',
      //       var: 'Vue',
      //       path: 'https://cdn.bootcdn.net/ajax/libs/vue/3.4.21/vue.global.prod.js'
      //     },
      //     //cdn引入vue-demi
      //     {
      //       name: 'vue-demi',
      //       var: 'VueDemi',
      //       path: 'https://cdn.jsdelivr.net/npm/vue-demi@0.14.6/lib/index.iife.min.js'
      //     },
      //     {
      //       name: 'pinia',
      //       var: 'Pinia',
      //       path: 'https://cdn.jsdelivr.net/npm/pinia@2.1.7/dist/pinia.iife.min.js'
      //     },
      //     {
      //       name: 'vue-router',
      //       var: 'VueRouter',
      //       path: 'https://cdn.bootcdn.net/ajax/libs/vue-router/4.3.0/vue-router.global.prod.js'
      //     },
      //     {
      //       name: 'Vant',
      //       var: 'vant',
      //       path: 'https://fastly.jsdelivr.net/npm/vant@4.8.5/lib/vant.min.js',
      //       css: 'https://fastly.jsdelivr.net/npm/vant@4/lib/index.css'
      //     }
      //   ]
      // }),
      visualizer({
        // 放在最后一个 plugin
        emitFile: true, //是否被触摸
        filename: 'visualizer.html', //生成分析网页文件名
        open: true, //在默认用户代理中打开生成的文件
        gzipSize: true, //从源代码中收集 gzip 大小并将其显示在图表中
        brotliSize: true //从源代码中收集 brotli 大小并将其显示在图表中
        // open:true //如果存在本地服务端口，将在打包后自动展示
      })
    ],
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      hmr: true,
      host: '0.0.0.0',
      open: `http://${getNetworkIp()}:4567`,
      // open: false,
      port: 4567,
      proxy: {
        '/wowApi/': {
          target: env.VITE_APP_DOMAIN_URL,
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/wowApi\//, '/wowApi/')
        },
        '/wowResource/': {
          target: env.VITE_APP_RESOURCE,
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/wowResource\//, '/wowResource/')
        }
      }
    }
  }
})

// 获取本机IP地址
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getNetworkIp() {
  let needHost = 'localhost'
  try {
    const network = os.networkInterfaces()
    for (const dev in network) {
      const iface = network[dev]
      if (iface) {
        // 添加这个条件检查，确保iface有被定义
        for (let i = 0; i < iface.length; i++) {
          const alias = iface[i]
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            needHost = alias.address
          }
        }
      }
    }
  } catch (_e) {
    /* empty */
  }
  return needHost
}
