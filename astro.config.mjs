// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// Prototype statique : chaque page devient un dossier `dist/<route>/index.html`,
// déposable tel quel sur n'importe quel serveur (aperçu Digdeo inclus).
export default defineConfig({
  // [PROVISOIRE] domaine cible à confirmer (DNS géré par SETF / Digdeo)
  site: 'https://www.domainedegrosbois.com',
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
