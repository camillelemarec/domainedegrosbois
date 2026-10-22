import fr from '@/i18n/fr.json';
import en from '@/i18n/en.json';

export type Lang = 'fr' | 'en';
export const LANGS: Lang[] = ['fr'];
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

/** Préfixe une route interne selon la langue (`/agenda/` → `/en/agenda/`). */
export function localizePath(path: string, lang: Lang): string {
  if (lang === DEFAULT_LANG) return path;
  if (path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) return path;
  return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Détermine la langue à partir de l'URL courante. */
export function langFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return LANGS.includes(first as Lang) ? (first as Lang) : DEFAULT_LANG;
}

/** Chemin équivalent dans l'autre langue (pour le sélecteur FR/EN). */
export function alternatePath(url: URL, target: Lang): string {
  const current = langFromUrl(url);
  let bare = url.pathname;
  if (current !== DEFAULT_LANG) bare = bare.replace(new RegExp(`^/${current}`), '') || '/';
  return localizePath(bare, target);
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
