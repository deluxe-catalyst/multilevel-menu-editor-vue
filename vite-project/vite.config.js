import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // Обслуживать запросы с любого IP-адреса
    port: 5173, // Убедитесь, что порт совпадает с тем, который используется в Docker Compose
  },
})
