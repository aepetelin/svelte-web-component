import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

import { dependencies } from './package.json';
function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    chunks[key] = [key];
  });
  return chunks;
}


// https://vitejs.dev/config/
export default defineConfig({
  build:{
    rollupOptions: {
      input: {
        counter:'./src/lib/Counter.svelte',
        clock:'./src/lib/Clock.svelte'},
      output: {
        // dir: './dist/assets/',
        // comment next line if you want hashed names
        entryFileNames: '[name].js',
        manualChunks: {
          vendor: ['svelte'],
          ...renderChunks(dependencies),
        }
      }
    }
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    })
  ]
});