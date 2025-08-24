// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://pet.wavycat.ru',
  output: 'server',

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD ? {
        "react-dom/server": "react-dom/server.edge",
      } : undefined,
    },
  },

  integrations: [react(), sitemap()],

  prefetch: {
    prefetchAll: true
  },

  adapter: cloudflare({
    imageService: "compile",
    platformProxy: {
      enabled: true,
      configPath: 'wrangler.toml'
    }
  })
});