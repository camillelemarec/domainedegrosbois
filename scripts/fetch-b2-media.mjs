/**
 * Télécharge les fichiers du manifeste depuis le bucket privé vers `public/`,
 * pour les copier dans le site statique (GitHub Pages ne peut pas exécuter /media/).
 * Sans les variables B2, le script ne fait rien.
 */
import fs from 'node:fs';
import path from 'node:path';
import manifest from '../src/data/media-manifest.json' with { type: 'json' };

function secret(name) {
  return (process.env[name] ?? '').trim();
}

function objectPrefix() {
  const raw = process.env.B2_OBJECT_PREFIX;
  const prefix = raw === undefined ? 'public' : raw.trim();
  return prefix.replace(/^\/+|\/+$/g, '');
}

const keyId = secret('B2_KEY_ID');
const applicationKey = secret('B2_APPLICATION_KEY');
const bucketId = secret('B2_BUCKET_ID');
const bucketName = secret('B2_BUCKET_NAME');

if (!keyId || !applicationKey || !bucketId || !bucketName) {
  console.log('Variables Backblaze absentes : images non téléchargées.');
  process.exit(0);
}

const basic = Buffer.from(`${keyId}:${applicationKey}`).toString('base64');
const authResponse = await fetch('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
  headers: { Authorization: `Basic ${basic}` },
});
if (!authResponse.ok) {
  console.error(`Autorisation Backblaze refusée (${authResponse.status}).`);
  process.exit(1);
}
const auth = await authResponse.json();
const downloadUrl = String(auth.downloadUrl).replace(/\/+$/, '');
const prefix = objectPrefix();

let failed = 0;
for (const filePath of manifest) {
  const key = prefix ? `${prefix}/${filePath}` : filePath;
  const encoded = key.split('/').map((segment) => encodeURIComponent(segment)).join('/');
  const response = await fetch(`${downloadUrl}/file/${encodeURIComponent(bucketName)}/${encoded}`, {
    headers: { Authorization: auth.authorizationToken },
  });
  if (!response.ok) {
    failed += 1;
    console.error(`KO ${response.status} ${filePath}`);
    continue;
  }
  const destination = path.resolve('public', filePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, Buffer.from(await response.arrayBuffer()));
  console.log(`OK ${filePath}`);
}

if (failed > 0) process.exit(1);
