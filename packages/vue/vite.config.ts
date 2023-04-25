import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SmoothDNDVue',
      formats: ['es', 'umd'],
      fileName: 'smooth-dnd-vue',
    },
    rollupOptions: {
      external: ['vue', '@smooth-dnd/core'],
    },
  },
  plugins: [dts()],
})
