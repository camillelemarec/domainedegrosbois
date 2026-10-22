import type { Lang } from '@/lib/i18n';

export const EVENT_TYPES = ['visite-guidee', 'evenement', 'journee-speciale'] as const;
export const EVENT_AUDIENCES = ['tout-public', 'famille', 'groupe'] as const;
export type EventType = (typeof EVENT_TYPES)[number];
export type EventAudience = (typeof EVENT_AUDIENCES)[number];

const typeLabels: Record<EventType, Record<Lang, string>> = {
  'visite-guidee': { fr: 'Visite guidée', en: 'Guided tour' },
  evenement: { fr: 'Événement', en: 'Event' },
  'journee-speciale': { fr: 'Journée spéciale', en: 'Special day' },
};
const audienceLabels: Record<EventAudience, Record<Lang, string>> = {
  'tout-public': { fr: 'Tout public', en: 'All audiences' },
  famille: { fr: 'Famille', en: 'Family' },
  groupe: { fr: 'Groupes', en: 'Groups' },
};

export const eventTypeLabel = (type: EventType, lang: Lang) => typeLabels[type][lang];
export const eventAudienceLabel = (audience: EventAudience, lang: Lang) => audienceLabels[audience][lang];

/** Clé « AAAA-MM » utilisée par le filtre par mois. */
export const monthKey = (iso: string) => iso.slice(0, 7);

export function monthLabel(key: string, lang: Lang): string {
  const [y, m] = key.split('-').map(Number);
  const label = new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { month: 'long', year: 'numeric' }).format(new Date(y, m - 1, 1));
  return label.charAt(0).toUpperCase() + label.slice(1);
}
