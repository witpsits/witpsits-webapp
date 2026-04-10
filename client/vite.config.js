import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or whatever plugin you use

export default defineConfig({
  plugins: [react()],
  server: {
    // Allows hosting via ngrok or other tunneling services
    allowedHosts: true,
  },
})
