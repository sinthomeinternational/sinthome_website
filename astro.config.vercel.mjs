// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  // Use SSR for Vercel deployment
  output: 'server',

  // Vercel adapter for serverless functions
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    imageService: true,
    devImageService: 'sharp',
    imagesConfig: {
      domains: [],
      sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      formats: ['image/avif', 'image/webp']
    }
  }),

  // No base path needed for Vercel
  site: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:4321',

  vite: {
    plugins: /** @type {any} */ ([...tailwindcss()]),
    optimizeDeps: {
      // Force pre-bundling of shader library
      include: ['@paper-design/shaders-react'],
      // Force dependency optimization on startup
      force: true
    },
    ssr: {
      // Don't externalize the shader library for SSR
      noExternal: ['@paper-design/shaders-react']
    },
    build: {
      // Ensure compatibility with shader modules
      target: 'esnext',
      rollupOptions: {
        output: {
          // Handle dynamic imports properly
          manualChunks: (id) => {
            if (id.includes('@paper-design/shaders-react')) {
              return 'shaders';
            }
          }
        }
      }
    }
  },

  integrations: [react()]
});
