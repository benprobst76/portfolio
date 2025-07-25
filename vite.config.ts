import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss(),
  ],
  server: {
    port: 5174
  },
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
})