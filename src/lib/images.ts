import fs from 'node:fs';
import path from 'node:path';
import { images, type ImageEntry, type ImageKey } from '@/data/images';
import type { Lang } from '@/lib/i18n';

const PUBLIC_IMAGES_DIR = path.resolve(process.cwd(), 'public', 'images');

export interface ResolvedImage extends ImageEntry {
  /** URL publique à utiliser dans `src` (préfixée par `/images/`). */
  url: string;
  /** `true` si le fichier existe réellement dans `public/images/`. */
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
  const absolute = path.join(PUBLIC_IMAGES_DIR, cleanSrc);
  // Vérification au build (Node) : en environnement navigateur on suppose l'image présente.
  const exists = typeof fs.existsSync === 'function' ? fs.existsSync(absolute) : true;
  return {
    ...entry,
    src: cleanSrc,
    url: `/images/${cleanSrc}`,
    exists,
    altText: entry.alt[lang] ?? entry.alt.fr,
  };
}
