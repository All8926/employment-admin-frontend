import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import strip from '@rollup/plugin-strip'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    strip({
      include: ['**/*.js', '**/*.ts', '**/*.vue'],
      functions: ['console.*', 'debugger'],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build:{
    minify: 'esbuild',
    /**
     * 移除 console.log 和 debugger
     */
    esbuild: {
      pure: ['console.log', 'debugger']
    }
  },
  server: {
    port: 6777,
    proxy: {
      '/dev-api': {
        target: 'http://localhost:8101',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ''),
      },
    }
  },
})
