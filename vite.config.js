import { defineConfig } from 'vite'
import { resolve } from "path"
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  base:'/myr',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  build: {
    manifest: false,
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
      // 重点在这里哦
        // entryFileNames: `assets/[name].${timestamp}.js`,
        // chunkFileNames: `assets/[name].${timestamp}.js`,
        // assetFileNames: `assets/[name].${timestamp}.[ext]`
        // entryFileNames: `assets/[name].js`,
        // chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      }
    }
  },
  externals: [{
    './cptable': 'var cptable'
  }],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/style/common.scss";'
      }
    }
  },
})
