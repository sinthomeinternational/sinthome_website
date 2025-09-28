// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Configuration for different deployment environments
const DEPLOYMENT_CONFIG = {
  // GitHub Pages deployment
  github: {
    site: 'https://yiluo-photon.github.io',
    base: '/sinthome_website/',
  },
  // Custom domain deployment
  custom: {
    site: process.env?.CUSTOM_DOMAIN || 'https://example.com',
    base: '/',
  }
};

// Determine deployment target from environment variable or default to GitHub Pages
const deploymentTarget = process.env?.DEPLOYMENT_TARGET || 'github';
// @ts-ignore
const config = DEPLOYMENT_CONFIG[deploymentTarget] || DEPLOYMENT_CONFIG.github;

console.log(`Building for ${deploymentTarget} deployment:`, config);

// https://astro.build/config
export default defineConfig({
  // Static generation for both GitHub Pages and custom domain
  output: 'static',

  // URL configuration based on deployment target
  site: config.site,
  base: config.base,

  vite: {
    plugins: /** @type {any} */ ([...tailwindcss()]),
    optimizeDeps: {
      // Force pre-bundling of shader library
      include: ['@paper-design/shaders-react'],
      // Exclude from optimization if causing issues
      exclude: []
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