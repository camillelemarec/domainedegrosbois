/**
 * Captures desktop + mobile : accueil, agenda, fiche espace, formulaire de devis.
 * Usage : npm run build && npm run screenshots -- --out <dossier>
 * Sert `dist/` avec `astro preview`. Chrome local (playwright-core, channel "chrome").
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};
const outDir = path.resolve(getArg('--out', 'captures'));
let base = getArg('--base', null);

const pages = [
  { slug: 'accueil', path: '/' },
  { slug: 'agenda', path: '/agenda/' },
  { slug: 'espace-orangerie', path: '/privatiser/espaces/orangerie/' },
  { slug: 'formulaire-devis', path: '/privatiser/demande-de-devis/' },
];
const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
};

let preview;
if (!base) {
  preview = spawn('npm', ['run', 'preview', '--', '--port', '4321', '--host', '127.0.0.1'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  base = 'http://127.0.0.1:4321';
  const deadline = Date.now() + 30000;
  let ready = false;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(base);
      if (res.ok) { ready = true; break; }
    } catch { /* le serveur démarre */ }
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  if (!ready) {
    preview.kill();
    throw new Error('astro preview ne démarre pas');
  }
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const [device, viewport] of Object.entries(viewports)) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      locale: 'fr-FR',
      ...('isMobile' in viewport ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
    });
    await context.addInitScript(() => localStorage.setItem('grosbois-cookie-demo', 'none'));
    for (const p of pages) {
      const page = await context.newPage();
      const response = await page.goto(base + p.path, { waitUntil: 'networkidle' });
      if (!response || response.status() >= 400) throw new Error(`${p.path} → ${response?.status()}`);
      await page.waitForTimeout(300);
      const file = path.join(outDir, `${p.slug}-${device}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log('✓', file);
      await page.close();
    }
    await context.close();
  }

  const context = await browser.newContext({ locale: 'fr-FR' });
  const page = await context.newPage();
  await page.goto(`${base}/privatiser/demande-de-devis/?espace=orangerie`, { waitUntil: 'networkidle' });
  await page.locator('#quote-date').fill('2026-11-20');
  await page.locator('#quote-prenom').fill('Camille');
  await page.locator('#quote-nom').fill('Test');
  await page.locator('#quote-email').fill('camille@example.com');
  await page.locator('#quote-telephone').fill('0612345678');
  await page.locator('#quote-rgpd').check();
  await page.locator('#quote-form button[type="submit"]').click();
  await page.waitForSelector('#quote-result:not([hidden])');
  const title = await page.locator('#quote-result-title').innerText();
  if (!/^Devis DG-\d{8}-\d{4}$/.test(title)) throw new Error(`récapitulatif inattendu : ${title}`);
  const body = await page.locator('#quote-result').innerText();
  if (!body.includes('Aucun PDF')) throw new Error('mention PDF absente');
  if (!body.includes('Total TTC')) throw new Error('total absent');
  console.log('✓ devis simulé', title);

  await page.goto(`${base}/agenda/#billetterie`, { waitUntil: 'networkidle' });
  const encart = await page.locator('[data-billetterie]').innerText();
  if (!encart.includes('compte Weezevent SETF, accès à venir')) throw new Error('placeholder billetterie absent');
  console.log('✓ placeholder billetterie');
  await context.close();
} finally {
  await browser.close();
  preview?.kill();
}
