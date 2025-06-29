import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/_redirects', 
          dest: '.'              
        }
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: 'docs/dist',  
    emptyOutDir: true,
  },
})
