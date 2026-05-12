import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['.trycloudflare.com', '.loca.lt', '.ngrok-free.app'],
  },
  server: {
    allowedHosts: ['.trycloudflare.com', '.loca.lt', '.ngrok-free.app'],
  },
})
