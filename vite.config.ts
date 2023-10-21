import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const isMockEnabled = process.env?.VITE_USE_MOCK === 'true';

  return defineConfig({
    envDir: 'env',
    plugins: [
      react(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: isMockEnabled,
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
  });
};
