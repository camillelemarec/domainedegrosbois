import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Texte bilingue : l'anglais est optionnel, repli sur le français à l'affichage. */
const i18nText = z.object({ fr: z.string(), en: z.string().optional() });

const imageRef = z.object({
  src: z.string(),
  alt: z.object({ fr: z.string(), en: z.string() }),
  credit: z.string().optional(),
  ratio: z.enum(['16/9', '21/9', '4/3', '3/2', '1/1', 'auto']).optional(),
});

/**
 * Espaces privatisables (p.9, modèle de fiche p.17).
 * Un fichier JSON par espace dans `src/content/espaces/`.
 */
const espaces = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/espaces' }),
  schema: z.object({
    ordre: z.number(),
    nom: i18nText,
    accroche: i18nText,
    description: z.array(i18nText),
    surface: z.string().optional(),
    capacites: z.object({
      theatre: z.number().nullable(),
      u: z.number().nullable(),
      classe: z.number().nullable(),
      cabaret: z.number().nullable(),
      cocktail: z.number().nullable(),
      banquet: z.number().nullable(),
    }),
    histoire: z.array(i18nText).default([]),
    ficheTechnique: z.array(z.object({ label: i18nText, valeur: i18nText })).default([]),
    prestations: z.array(i18nText).default([]),
    acces: i18nText.optional(),
    exploitant: z.object({ nom: z.string(), url: z.string().optional(), logo: z.string().optional() }).optional(),
    temoignages: z.array(z.object({ citation: i18nText, auteur: z.string() })).default([]),
    images: z.object({
      hero: imageRef,
      vignette: imageRef,
      galerie: z.array(imageRef).default([]),
    }),
    provisoire: z.boolean().default(true),
  }),
});

/**
 * Événements de l'agenda, liés à la billetterie (p.11).
 * Un fichier JSON par événement dans `src/content/evenements/`.
 */
const evenements = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/evenements' }),
  schema: z.object({
    titre: i18nText,
    type: z.enum(['visite-guidee', 'evenement', 'journee-speciale']),
    public: z.enum(['tout-public', 'famille', 'groupe']),
    dateDebut: z.string(),
    dateFin: z.string().optional(),
    heureDebut: z.string().optional(),
    heureFin: z.string().optional(),
    lieu: i18nText,
    prix: z.number().nullable(),
    prixDetail: i18nText.optional(),
    image: imageRef,
    urlBilletterie: z.string(),
    description: i18nText,
    complet: z.boolean().default(false),
    provisoire: z.boolean().default(true),
  }),
});

/** Actualités (fil « Nous suivre »). */
const actualites = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/actualites' }),
  schema: z.object({
    titre: i18nText,
    date: z.string(),
    extrait: i18nText,
    image: imageRef,
    provisoire: z.boolean().default(true),
  }),
});

export const collections = { espaces, evenements, actualites };
