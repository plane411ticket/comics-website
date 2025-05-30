import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';
//import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://comics-website-backend.onrender.com',  
        changeOrigin: true,
        secure: false,
      }
    },
    allowedHosts: ['https://mangadak.onrender.com'],
  }
});

