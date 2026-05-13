import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'



export default defineConfig({
  server: {
    open: true,
    proxy: {
      // 规则1：处理带 /api 的普通接口
      '/api': {
        target: 'http://10.132.203.35:21571',
        changeOrigin: true,
      },

      // 规则2：专门处理登录无前缀接口
      '/admin': {
        target: 'http://10.132.203.35:21571',
        changeOrigin: true,
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})