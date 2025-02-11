import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { resolve } from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig((opt) => {
  const env = loadEnv(opt.mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      visualizer({
        // 放在最后一个 plugin
        emitFile: true, //是否被触摸
        filename: 'visualizer.html', //生成分析网页文件名
        open: true, //在默认用户代理中打开生成的文件
        gzipSize: true, //从源代码中收集 gzip 大小并将其显示在图表中
        brotliSize: true //从源代码中收集 brotli 大小并将其显示在图表中
      })
    ],
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    },
    resolve: {
      alias: {
        '#': path.resolve(__dirname, './src/types'),
        '@': path.resolve(__dirname, './src')
      }
    },
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html'),
          console: resolve(__dirname, 'console.html')
        }
      }
    },
    server: {
      hmr: true,
      open: true,
      port: 5837,
      proxy: {
        '/api/': {
          target: env.VITE_APP_DOMAIN_URL,
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\//, '/')
        }
      }
    }
  }
})
