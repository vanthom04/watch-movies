import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  },
  server: {
    port: 6500,
    host: true
  },
  preview: {
    port: 6550,
    host: true
  }
})
