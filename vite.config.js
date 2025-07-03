import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3662', // tu backend
        ws: true,
        changeOrigin: true
      }
    }
  }
})


