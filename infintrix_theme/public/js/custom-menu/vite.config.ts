import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  build: {
    outDir: "build", // where the file will go
    rollupOptions: {
      input: "/src/main.jsx", // your main entry file
      output: {
        entryFileNames: "menu.js", // single output file name
        chunkFileNames: "menu.js", // prevent additional chunks
        assetFileNames: "menu.[ext]", // css/images if needed
        inlineDynamicImports: true, // key for single-file build
      }
    }
  }
})
