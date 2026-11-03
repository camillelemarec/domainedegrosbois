// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// Prototype statique : chaque page devient un dossier `dist/<route>/index.html`,
// déposable tel quel sur n'importe quel serveur (aperçu Digdeo inclus).
// Sur GitHub Pages le site est servi dans /domainedegrosbois/ (PAGES_BASE).
const pagesBase = process.env.PAGES_BASE?.replace(/\/$/, '');

export default defineConfig({
  // [PROVISOIRE] domaine cible à confirmer (DNS géré par SETF / Digdeo)
  site: process.env.PAGES_SITE || 'https://www.domainedegrosbois.com',
  base: pagesBase || '/',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [preact()],
});
