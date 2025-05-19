import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'components', // nom de ton micro-frontend
      filename: 'remoteEntry.js', // nom du fichier exposé
      exposes: {
        './TodoItem': './src/components/TodoItem.jsx',
        './TodoList': './src/components/TodoList.jsx',
        './TodoForm': './src/components/TodoForm.jsx',
        './theme': './src/styles/theme.css',
      },
      // dépendances partagées entre les micro-frontends
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true
  },
  server: {
    port: 5173, // ou un autre port si besoin
  }
})