import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5500,
    strictPort: true,
    host: true
  },
  preview: {
    port: 5500,
    strictPort: true,
    host: true
  }
});
