import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig(config => {
  return {
    envDir: 'env',
    plugins: [
      react(),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),
    ],
    server: {
      proxy: {
        '/champions': {
          target: 'http://localhost:5623',
          changeOrigin: true,
        },
      },
    },
  };
});
