import tarifs from '@/data/tarifs-visites.json';
import type { Lang } from '@/lib/i18n';

export type Motif = 'renseignement' | 'reservation';
export type TypeDemande = keyof typeof tarifs.visites | 'privatisation';

export interface QuoteInput {
  motif: Motif;
  type: TypeDemande;
  espaceId: string;
  date: string;
  adultes: number;
  enfants: number;
  guide: boolean;
  livret: boolean;
  restauration: boolean;
  nom: string;
  prenom: string;
}

export interface QuoteLine {
  label: string;
  detail: string;
  montantHT: number;
}

export interface Quote {
  numero: string;
  lignes: QuoteLine[];
  totalHT: number;
  tva: number;
  tauxTva: number;
  totalTTC: number;
  validite: string;
  mention: string;
}

const euros = (cents: number) => Math.round(cents) / 100;

function named(entry: { label: string; labelEn?: string }, lang: Lang): string {
  return lang === 'en' && entry.labelEn ? entry.labelEn : entry.label;
}

function line(label: string, detail: string, cents: number): QuoteLine | null {
  if (cents <= 0) return null;
  return { label, detail, montantHT: euros(cents) };
}

function stamp(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

function numero(input: QuoteInput): string {
  const seed = `${input.prenom}|${input.nom}|${input.type}|${input.espaceId}|${input.date}|${input.adultes}|${input.enfants}`;
  let hash = 0;
  for (const char of seed) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  return `DG-${stamp()}-${String(hash % 10000).padStart(4, '0')}`;
}

/** Devis indicatif calculé dans le navigateur. `null` pour un simple renseignement. */
export function computeQuote(input: QuoteInput, lang: Lang = 'fr'): Quote | null {
  if (input.motif !== 'reservation') return null;

  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';
  const money = (amount: number) => `${amount.toLocaleString(locale)} €`;
  const dayPackage = lang === 'en' ? 'Day package, excluding options' : 'Forfait journée, hors options';
  const basePackage = lang === 'en' ? 'Base package' : 'Forfait de base';
  const adults = lang === 'en' ? 'Adults' : 'Adultes';
  const children = lang === 'en' ? 'Children' : 'Enfants';
  const flat = lang === 'en' ? 'Flat rate' : 'Forfait';
  const fallbackHire = lang === 'en' ? 'Private hire, package to be confirmed' : 'Privatisation, forfait à confirmer';

  const lignes: QuoteLine[] = [];
  const personnes = Math.max(0, input.adultes) + Math.max(0, input.enfants);

  if (input.type === 'privatisation') {
    const espace = tarifs.privatisation[input.espaceId as keyof typeof tarifs.privatisation];
    const label = espace ? named(espace, lang) : fallbackHire;
    const forfait = espace?.forfait ?? 0;
    const row = line(label, dayPackage, Math.round(forfait * 100));
    if (row) lignes.push(row);
  } else {
    const visite = tarifs.visites[input.type as keyof typeof tarifs.visites];
    if (!visite) return null;
    if (visite.forfait > 0) {
      const row = line(named(visite, lang), basePackage, Math.round(visite.forfait * 100));
      if (row) lignes.push(row);
    }
    if (input.adultes > 0 && visite.adulte > 0) {
      const row = line(
        adults,
        `${input.adultes} × ${money(visite.adulte)}`,
        Math.round(input.adultes * visite.adulte * 100),
      );
      if (row) lignes.push(row);
    }
    if (input.enfants > 0 && visite.enfant > 0) {
      const row = line(
        children,
        `${input.enfants} × ${money(visite.enfant)}`,
        Math.round(input.enfants * visite.enfant * 100),
      );
      if (row) lignes.push(row);
    }
  }

  if (input.guide) {
    const row = line(named(tarifs.options.guide, lang), flat, Math.round(tarifs.options.guide.forfait * 100));
    if (row) lignes.push(row);
  }
  if (input.livret && personnes > 0) {
    const row = line(
      named(tarifs.options.livret, lang),
      `${personnes} × ${money(tarifs.options.livret.parPersonne)}`,
      Math.round(personnes * tarifs.options.livret.parPersonne * 100),
    );
    if (row) lignes.push(row);
  }
  if (input.restauration && personnes > 0) {
    const row = line(
      named(tarifs.options.restauration, lang),
      `${personnes} × ${money(tarifs.options.restauration.parPersonne)}`,
      Math.round(personnes * tarifs.options.restauration.parPersonne * 100),
    );
    if (row) lignes.push(row);
  }

  const totalCents = lignes.reduce((sum, row) => sum + Math.round(row.montantHT * 100), 0);
  const tvaCents = Math.round(totalCents * tarifs.tva);
  const validite = new Date();
  validite.setDate(validite.getDate() + tarifs.validiteJours);

  return {
    numero: numero(input),
    lignes,
    totalHT: euros(totalCents),
    tva: euros(tvaCents),
    tauxTva: tarifs.tva,
    totalTTC: euros(totalCents + tvaCents),
    validite: validite.toISOString().slice(0, 10),
    mention: lang === 'en' && tarifs.mentionEn ? tarifs.mentionEn : tarifs.mention,
  };
}

export function formatEuros(amount: number, lang: Lang = 'fr'): string {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { style: 'currency', currency: 'EUR' }).format(amount);
}
