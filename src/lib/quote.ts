import tarifs from '@/data/tarifs-visites.json';

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
export function computeQuote(input: QuoteInput): Quote | null {
  if (input.motif !== 'reservation') return null;

  const lignes: QuoteLine[] = [];
  const personnes = Math.max(0, input.adultes) + Math.max(0, input.enfants);

  if (input.type === 'privatisation') {
    const espace = tarifs.privatisation[input.espaceId as keyof typeof tarifs.privatisation];
    const label = espace?.label ?? 'Privatisation — forfait à confirmer';
    const forfait = espace?.forfait ?? 0;
    const row = line(label, 'Forfait journée, hors options', Math.round(forfait * 100));
    if (row) lignes.push(row);
  } else {
    const visite = tarifs.visites[input.type as keyof typeof tarifs.visites];
    if (!visite) return null;
    if (visite.forfait > 0) {
      const row = line(visite.label, 'Forfait de base', Math.round(visite.forfait * 100));
      if (row) lignes.push(row);
    }
    if (input.adultes > 0 && visite.adulte > 0) {
      const row = line(
        'Adultes',
        `${input.adultes} × ${visite.adulte.toLocaleString('fr-FR')} €`,
        Math.round(input.adultes * visite.adulte * 100),
      );
      if (row) lignes.push(row);
    }
    if (input.enfants > 0 && visite.enfant > 0) {
      const row = line(
        'Enfants',
        `${input.enfants} × ${visite.enfant.toLocaleString('fr-FR')} €`,
        Math.round(input.enfants * visite.enfant * 100),
      );
      if (row) lignes.push(row);
    }
  }

  if (input.guide) {
    const row = line(tarifs.options.guide.label, 'Forfait', Math.round(tarifs.options.guide.forfait * 100));
    if (row) lignes.push(row);
  }
  if (input.livret && personnes > 0) {
    const row = line(
      tarifs.options.livret.label,
      `${personnes} × ${tarifs.options.livret.parPersonne.toLocaleString('fr-FR')} €`,
      Math.round(personnes * tarifs.options.livret.parPersonne * 100),
    );
    if (row) lignes.push(row);
  }
  if (input.restauration && personnes > 0) {
    const row = line(
      tarifs.options.restauration.label,
      `${personnes} × ${tarifs.options.restauration.parPersonne.toLocaleString('fr-FR')} €`,
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
    mention: tarifs.mention,
  };
}

export function formatEuros(amount: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
}
