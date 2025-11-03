import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/rohit-site/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
