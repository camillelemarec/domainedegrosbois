import manifest from '@/data/media-manifest.json';

/**
 * Fichiers déposés dans le bucket privé, avec la même arborescence que `public/`.
 * Les chemins sont relatifs à `public/` (`images/logo/logogb.png`, `path1.png`).
 */
const MEDIA_FILES = new Set<string>(manifest);

function sitePrefix(): string {
  const siteBase = import.meta.env.BASE_URL || '/';
  return siteBase.endsWith('/') ? siteBase : `${siteBase}/`;
}

function encodePath(publicPath: string): string {
  return publicPath
    .replace(/^\/+/, '')
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

/** Vrai si ce chemin (relatif à `public/`) est autorisé à sortir du bucket. */
export function mediaFileOnBucket(publicPath: string): boolean {
  return MEDIA_FILES.has(publicPath.replace(/^\/+/, ''));
}

/**
 * URL same-origin d’un fichier du bucket.
 * Le navigateur appelle `/media/…` ; la clé Backblaze ne quitte pas le serveur.
 */
export function mediaUrl(publicPath: string): string {
  return `${sitePrefix()}media/${encodePath(publicPath)}`;
}

/** Fichier servi directement depuis `public/` (pas encore dans le bucket). */
export function localPublicUrl(publicPath: string): string {
  return `${sitePrefix()}${encodePath(publicPath)}`;
}
