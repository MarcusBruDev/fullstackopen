import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  test: {
    include: ['tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    globals: true, // Enable global test APIs like `describe`, `it`, etc.
    environment: 'jsdom',
    setupFiles: './testSetup.js', 
  },
})


