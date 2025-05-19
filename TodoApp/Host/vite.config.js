import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        components: 'http://localhost:5173/dist/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom', '@reduxjs/toolkit', 'react-redux'],
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    // cssCodeSplit: true
  },
  server: {
    port: 5174, // ou un autre port si besoin
  }
})
