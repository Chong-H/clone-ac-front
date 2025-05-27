import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:1234',
        changeOrigin: true
      },
      '/rpc': {
        target: 'http://127.0.0.1:8545',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rpc/, '/group1')  // 👈 转发到 /group1
      },
      '/group1': {
        target: 'http://127.0.0.1:8545',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/group1/, '/group1'),
      }
      //   '/rpc': {
      //   target: 'http://127.0.0.1:8545',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/rpc/, '')
      // }
    }
  }
})
