import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  // Change to 'hybrid' for SSR with static optimization
  output: 'hybrid',

  // No need for base path on Vercel!
  site: 'https://your-project.vercel.app',

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