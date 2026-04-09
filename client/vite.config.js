import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or whatever plugin you use

export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 8080,
  //   allowedHosts: [
  //     'charlyn-thankworthy-unshrewdly.ngrok-free.dev'
  //   ]
  // }
})