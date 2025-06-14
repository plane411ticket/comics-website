import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';
//import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  
        changeOrigin: true,
        secure: false,
      }
    },
  }
});

