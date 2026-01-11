import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['weibo-logo.jpg'],
          manifest: {
            name: '微博内测版 G5',
            short_name: '微博内测版',
            description: '随时随地发现新鲜事。',
            theme_color: '#f2f2f2',
            background_color: '#f2f2f2',
            display: 'standalone',
            start_url: '/',
            scope: '/',
            icons: [
              {
                src: 'weibo-logo.jpg',
                sizes: '1282x1282',
                type: 'image/jpeg'
              }
            ]
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
