import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {

    proxy: { //使用代理
      '/api': { //当有 /api开头的地址是，代理到target地址
        target: 'http://127.0.0.1:4000', // 需要跨域代理的本地路径
        changeOrigin: true, //是否改变请求源头
        rewrite: (path) => path.replace(/^\/api/, '') // 路径重写
      }
    }
  },
  resolve: {
    alias: {
    '@': path.resolve(__dirname, './src/'),
    },
  },
})
