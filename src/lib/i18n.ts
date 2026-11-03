import fr from '@/i18n/fr.json';
import en from '@/i18n/en.json';

export type Lang = 'fr' | 'en';
export const LANGS: Lang[] = ['fr', 'en'];
export const DEFAULT_LANG: Lang = 'fr';

type Dict = Record<string, unknown>;
const dictionaries: Record<Lang, Dict> = { fr, en };

function lookup(dict: Dict, key: string): string | undefined {
  const value = key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in (acc as Dict)) return (acc as Dict)[part];
    return undefined;
  }, dict);
  return typeof value === 'string' ? value : undefined;
}

/**
 * Retourne une fonction de traduction `t('cle.imbriquee', { nom: 'x' })`.
 * Repli automatique sur le français si la clé manque en anglais.
 */
export function useTranslations(lang: Lang) {
  return function t(key: string, vars: Record<string, string | number> = {}): string {
    const raw = lookup(dictionaries[lang], key) ?? lookup(dictionaries.fr, key) ?? key;
    return raw.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`));
  };
}

/** Préfixe le sous-dossier GitHub Pages (`/domainedegrosbois`) quand `base` n'est pas `/`. */
function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base ? `${base}${path}` : path;
}

/** Retire le préfixe de déploiement (`/domainedegrosbois`) pour lire la langue dans l'URL. */
function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!base) return pathname || '/';
  if (pathname === base) return '/';
  if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length) || '/';
  return pathname;
}

/** Préfixe une route interne selon la langue (`/agenda/` → `/en/agenda/`). */
export function localizePath(path: string, lang: Lang): string {
  if (path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) return path;
  const hashAt = path.indexOf('#');
  const hash = hashAt >= 0 ? path.slice(hashAt) : '';
  const bare = hashAt >= 0 ? path.slice(0, hashAt) : path;
  const localized = lang === DEFAULT_LANG ? bare : `/${lang}${bare.startsWith('/') ? bare : `/${bare}`}`;
  const withSlash = localized.startsWith('/') ? localized : `/${localized}`;
  return `${withBase(withSlash)}${hash}`;
}

/** Détermine la langue à partir de l'URL courante. */
export function langFromUrl(url: URL): Lang {
  const [, first] = stripBase(url.pathname).split('/');
  return LANGS.includes(first as Lang) ? (first as Lang) : DEFAULT_LANG;
}

/** Chemin équivalent dans l'autre langue (pour le sélecteur FR/EN). */
export function alternatePath(url: URL, target: Lang): string {
  const current = langFromUrl(url);
  let bare = stripBase(url.pathname);
  if (current !== DEFAULT_LANG) bare = bare.replace(new RegExp(`^/${current}(?=/|$)`), '') || '/';
  if (!bare.startsWith('/')) bare = `/${bare}`;
  return `${localizePath(bare, target)}${url.search}${url.hash}`;
}

/** Texte bilingue, avec repli sur le français. */
export function pick(value: { fr: string; en?: string } | string | undefined | null, lang: Lang): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return (lang === 'en' ? value.en : undefined) || value.fr;
}

export function formatDate(date: string | Date, lang: Lang, options: Intl.DateTimeFormatOptions = {}): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  }).format(d);
}

export function formatPrice(amount: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}
