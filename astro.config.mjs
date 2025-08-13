// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://pet.wavycat.ru',

  vite: {
    plugins: [tailwindcss()]
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