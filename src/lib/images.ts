import fs from 'node:fs';
import path from 'node:path';
import { images, type ImageEntry, type ImageKey } from '@/data/images';
import type { Lang } from '@/lib/i18n';
import { localPublicUrl, mediaFileOnBucket, mediaUrl } from '@/lib/media';

const PUBLIC_IMAGES_DIR = path.resolve(process.cwd(), 'public', 'images');

export interface ResolvedImage extends ImageEntry {
  /** URL same-origin : `/media/…` si le fichier est dans le bucket privé. */
  url: string;
  /** `true` si le fichier est sur le disque ou dans le bucket. */
  exists: boolean;
  /** Texte alternatif dans la langue demandée. */
  altText: string;
}

/** Accepte une clé du mapping central ou une entrée libre (ex. issue d'une collection). */
export type ImageRef = ImageKey | ImageEntry;

export function isImageKey(ref: ImageRef): ref is ImageKey {
  return typeof ref === 'string';
}

export function resolveImage(ref: ImageRef, lang: Lang = 'fr'): ResolvedImage {
  const entry: ImageEntry = isImageKey(ref) ? images[ref] : ref;
  const cleanSrc = entry.src.replace(/^\/?images\//, '').replace(/^\//, '');
  const publicPath = `images/${cleanSrc}`;
  const absolute = path.join(PUBLIC_IMAGES_DIR, cleanSrc);
  const onDisk = typeof fs.existsSync === 'function' ? fs.existsSync(absolute) : false;
  const onBucket = mediaFileOnBucket(publicPath);
  return {
    ...entry,
    src: cleanSrc,
    url: onBucket ? mediaUrl(publicPath) : localPublicUrl(publicPath),
    exists: onDisk || onBucket,
    altText: entry.alt[lang] ?? entry.alt.fr,
  };
}
