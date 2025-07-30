import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    open: true, // Auto-open browser
  },
  build: {
    outDir: 'dist-dev',
    sourcemap: true, // Enable source maps for development
  },
  define: {
    __DEV_MODE__: true,
    __APP_VERSION__: JSON.stringify('dev-preview'),
  },
  // Use development entry point
  root: '.',
  publicDir: 'public',
})