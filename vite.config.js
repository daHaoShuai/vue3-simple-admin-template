import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    unocss(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  server: {
    port: 5000,
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@view': path.resolve(__dirname, 'src/views'),
      '@component': path.resolve(__dirname, 'src/components'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@util': path.resolve(__dirname, 'src/utils'),
      '@store': path.resolve(__dirname, 'src/store/modules')
    }
  }
})
