import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Change to 'server' for SSR support
  output: 'server',

  // Site URL will be set by Vercel automatically
  // site: 'https://your-project.vercel.app', // Remove hardcoded URL

  // Vercel adapter for SSR support
  adapter: vercel({
    analytics: true,
    webAnalytics: {
      enabled: true
    },
    speedInsights: {
      enabled: true
    }
  }),

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],
});