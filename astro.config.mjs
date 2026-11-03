// @ts-check
import node from '@astrojs/node';
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// Les pages restent des HTML statiques. La route /media/ est la seule
// rendue à la demande : elle lit le bucket Backblaze privé.
// Sur GitHub Pages le site est servi dans /domainedegrosbois/ (PAGES_BASE).
const pagesBase = process.env.PAGES_BASE?.replace(/\/$/, '');

export default defineConfig({
  // [PROVISOIRE] domaine cible à confirmer (DNS géré par SETF / Digdeo)
  site: process.env.PAGES_SITE || 'https://www.domainedegrosbois.com',
  base: pagesBase || '/',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [preact()],
});
