import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    vue(),
    VueRouter({
      routesFolder: ['src/views']
    }),
    Components({
      dirs: ['src/components', 'src/views/**/components'],
      extensions: ['vue'],
      deep: true,
      dts: false,
      directoryAsNamespace: true,
      directives: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.js$/, /\.ts$/],
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
      // resolvers: [ArcoResolver()],
    }),
    AutoImport({
      eslintrc: {
        enabled: true,
      },
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
      ],
      imports: ['vue', VueRouterAutoImports, 'pinia'],
    }),
  ],
  server: {
    proxy: {
      '^/admin/.*': {
        target: 'https://redtest.pengyingsoft.com/',
        changeOrigin: true,
      },
      '^/ehr/.*': {
        target: 'https://redtest.pengyingsoft.com/',
        changeOrigin: true,
      },
    },
  },
  build: {
    emptyOutDir: true,
    outDir: command == 'build' ? '' : 'dist',
  },
}))
