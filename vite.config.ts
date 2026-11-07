import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the build works at the domain root or under any sub-path.
// Pages sit side by side at the root (privacy.html, terms.html) so relative links stay simple.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // One React, even when unity-marketing is linked locally (npm install ../unity-marketing).
  resolve: { dedupe: ['react', 'react-dom'] },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        terms: resolve(import.meta.dirname, 'terms.html'),
      },
    },
  },
})
