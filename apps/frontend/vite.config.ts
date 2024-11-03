import * as path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { UserConfig, defineConfig, loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { ProxyConfig } from './src/interfaces/ProxyConfig';
import urls from './src/network/urls/championsUrls';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }): UserConfig => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, path.join(process.cwd(), '..', '..')),
  };
  const isMockEnabled = false;
  const backendBase = 'http://localhost:6789';
  const proxyConfig: ProxyConfig = Object.entries(urls).reduce<
    Record<string, object>
  >((acc, [_, value]) => {
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
      https: false,
    },
    base: '/',
  });
};
