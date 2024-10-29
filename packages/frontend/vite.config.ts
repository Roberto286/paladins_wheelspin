import { UserConfig, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { viteMockServe } from 'vite-plugin-mock';
import { ProxyConfig } from './src/interfaces/ProxyConfig';
import urls from './src/network/urls/championsUrls';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }): UserConfig => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const isMockEnabled = process.env?.VITE_USE_MOCK === 'true';
  const backendBase = process.env?.VITE_BACKEND_API || '';
  const proxyConfig: ProxyConfig = Object.entries(urls).reduce<Record<string, object>>((acc, [_, value]) => {
    acc[value] = {
      target: backendBase,
      changeOrigin: true,
    };
    return acc;
  }, {});
  return defineConfig({
    envDir: 'env',
    plugins: [
      react(),
      nodePolyfills(),
      viteMockServe({
        mockPath: 'src/network/mock',
        localEnabled: isMockEnabled,
      }),
    ],
    server: {
      proxy: proxyConfig,
    },
  });
};
