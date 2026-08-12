import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        studio: new URL('./index.html', import.meta.url).pathname,
        hero: new URL('./templates/hero/preview.html', import.meta.url).pathname,
      },
    },
  },
});
