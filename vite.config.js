import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss'
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    server: {
      host: true,
      port: 3000,
      strictPort: true,
      allowedHosts: true, // 'all' for vite4, true for vite5+ ['fast-cobras-listen.loca.lt']
    },
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
  };
});
