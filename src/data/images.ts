/**
 * Mapping central des images du site.
 *
 * - `src` : chemin relatif à `public/images/` (voir `public/images/README.md` pour la convention).
 * - `alt` : texte alternatif FR / EN (obligatoire, accessibilité).
 * - `credit` : crédit photo affiché en légende (© …). `[À COMPLÉTER]` tant que non fourni.
 * - `ratio` : ratio d'affichage par défaut.
 *
 * Tant que le fichier n'existe pas dans `public/images/`, le composant `<Img>` affiche un
 * placeholder neutre portant le nom attendu. Pour brancher une vraie image : déposer le fichier
 * au bon chemin, ou modifier `src` ci-dessous.
 */

export type ImageRatio = '16/9' | '21/9' | '4/3' | '3/2' | '3/4' | '1/1' | 'auto';

export interface ImageEntry {
  src: string;
  alt: { fr: string; en: string };
  credit?: string;
  ratio?: ImageRatio;
}

const CREDIT_TODO = '[À COMPLÉTER]';

export const images = {
  // --- Logos -----------------------------------------------------------------
  'logo.grosbois': {
    src: 'logo/logo-grosbois-2023.svg',
    alt: { fr: 'Domaine de Grosbois, retour à l’accueil', en: 'Domaine de Grosbois, back to home' },
    ratio: 'auto',
  },
  'logo.ideeparis': {
    src: 'logo/logo-grosbois-ideeparis-rose.png',
    alt: { fr: 'Grosbois par IdéeParis, mariages et réceptions', en: 'Grosbois by IdéeParis, weddings and receptions' },
    ratio: 'auto',
  },
  'logo.setf': {
    src: 'logo/logo-setf.svg',
    alt: { fr: 'Société du Trotteur Français', en: 'Société du Trotteur Français' },
    ratio: 'auto',
  },

  // --- Accueil ---------------------------------------------------------------
  'accueil.hero': {
    src: 'accueil/ChateaudeGrosboisetsulky.jpg',
    alt: {
      fr: 'Château de Grosbois et sulky attelé traversant la cour',
      en: 'Grosbois castle and a harnessed sulky crossing the courtyard',
    },
    credit: CREDIT_TODO,
    ratio: '21/9',
  },
  'accueil.entree-evenements': {
    src: 'accueil/entree-evenements-01.jpg',
    alt: { fr: 'Public lors d’un événement au Domaine', en: 'Visitors during an event at the estate' },
    credit: CREDIT_TODO,
    ratio: '4/3',
  },
  'accueil.entree-visites': {
    src: 'accueil/entree-visites-01.jpg',
    alt: { fr: 'Groupe en visite guidée dans le château', en: 'Guided tour group inside the castle' },
    credit: CREDIT_TODO,
    ratio: '4/3',
  },
  'accueil.entree-actualites': {
    src: 'accueil/entree-actualites-01.jpg',
    alt: { fr: 'Trotteurs à l’entraînement au petit matin', en: 'Trotters training at dawn' },
    credit: CREDIT_TODO,
    ratio: '4/3',
  },

  // --- Découvrir -------------------------------------------------------------
  'chateau.facade-cour': {
    src: 'chateau/Chateau-de-Grosbois-JLL-LeTROT.jpg',
    alt: { fr: 'Façade du château de Grosbois, allée centrale et statues équestres', en: 'Facade of Grosbois castle, central drive and equestrian statues' },
    credit: 'JLL / LeTROT',
    ratio: '16/9',
  },
  'chateau.grilles': {
    src: 'chateau/chateau-grilles-01.jpg',
    alt: { fr: 'Grilles bleues du château de Grosbois', en: 'Blue wrought-iron gates of Grosbois castle' },
    credit: CREDIT_TODO,
    ratio: '4/3',
  },
  'centre.piste': {
    src: 'centre-entrainement/triodetrotteurssurlapistedesqualifications.jpg',
    alt: { fr: 'Trois trotteurs attelés lancés sur la piste des qualifications', en: 'Three harnessed trotters racing on the qualification track' },
    credit: CREDIT_TODO,
    ratio: '3/2',
  },
  'musee.salle': {
    src: 'musee-du-trot/Galerie-des-batailles-chateau-de-grosbois-JLL-LeTROT.jpg',
    alt: { fr: 'Galerie des batailles du château de Grosbois, tableaux et lustres', en: 'Gallery of Battles at Grosbois castle, paintings and chandeliers' },
    credit: 'JLL / LeTROT',
    ratio: '3/4',
  },

  // --- Espaces (fiche Orangerie détaillée) -----------------------------------
  'espaces.orangerie.hero': {
    src: 'espaces/orangerie/orangerie-hero-01.jpg',
    alt: { fr: 'L’Orangerie du Domaine de Grosbois', en: 'The Orangery of Domaine de Grosbois' },
    credit: CREDIT_TODO,
    ratio: '21/9',
  },
  'espaces.orangerie.config-theatre': {
    src: 'espaces/orangerie/orangerie-config-theatre-01.jpg',
    alt: { fr: 'Orangerie en configuration théâtre', en: 'Orangery in theatre layout' },
    credit: CREDIT_TODO,
    ratio: '4/3',
  },
  'espaces.orangerie.config-cocktail': {
    src: 'espaces/orangerie/orangerie-config-cocktail-01.jpg',
    alt: { fr: 'Orangerie en configuration cocktail', en: 'Orangery in cocktail layout' },
    credit: CREDIT_TODO,
    ratio: '4/3',
  },
  'espaces.orangerie.config-banquet': {
    src: 'espaces/orangerie/orangerie-config-banquet-01.jpg',
    alt: { fr: 'Orangerie dressée pour un banquet', en: 'Orangery set for a banquet' },
    credit: CREDIT_TODO,
    ratio: '4/3',
  },
  'espaces.orangerie.jardin': {
    src: 'espaces/orangerie/orangerie-jardin-01.jpg',
    alt: { fr: 'Jardin devant l’Orangerie', en: 'Garden in front of the Orangery' },
    credit: CREDIT_TODO,
    ratio: '4/3',
  },

  // --- Vignettes des 6 espaces (mosaïque « Nos espaces ») --------------------
  'espaces.espace-affaires.vignette': {
    src: 'espaces/espace-affaires/Cour-des-ferme-JLL-LeTROT.jpg',
    alt: { fr: 'Cour de la ferme du Domaine de Grosbois, horloge et communs', en: 'Farm courtyard of Domaine de Grosbois, clock and outbuildings' },
    credit: 'JLL / LeTROT',
    ratio: '4/3',
  },
  'espaces.musee-du-trot.vignette': {
    src: 'musee-du-trot/Galerie-des-batailles-chateau-de-grosbois-JLL-LeTROT.jpg',
    alt: { fr: 'Galerie des batailles du château de Grosbois', en: 'Gallery of Battles at Grosbois castle' },
    credit: 'JLL / LeTROT',
    ratio: '4/3',
  },
  'espaces.chateau.vignette': {
    src: 'espaces/chateau/cour-d-honneur-du-chteau-JLL-LeTROT.jpg',
    alt: { fr: 'Cour d’honneur du château de Grosbois', en: 'Main courtyard of Grosbois castle' },
    credit: 'JLL / LeTROT',
    ratio: '4/3',
  },
  'espaces.orangerie.vignette': {
    src: 'espaces/orangerie/interieur-du-Jardin-de-l-orangerie.jpg',
    alt: { fr: 'Jardin de l’orangerie du Domaine de Grosbois', en: 'Orangery garden of Domaine de Grosbois' },
    credit: CREDIT_TODO,
    ratio: '4/3',
  },
  'espaces.piste-couverte.vignette': {
    src: 'espaces/piste-couverte/ManegedegrosboisJLL-LETROT.jpg',
    alt: { fr: 'Manège couvert du Domaine de Grosbois, charpente et piste de sable', en: 'Indoor riding hall at Domaine de Grosbois, timber roof and sand track' },
    credit: 'JLL / LeTROT',
    ratio: '4/3',
  },
  'espaces.espaces-verts.vignette': {
    src: 'espaces/espaces-verts/Infrastructure.jpg',
    alt: { fr: 'Vue aérienne des infrastructures du Domaine de Grosbois', en: 'Aerial view of the Domaine de Grosbois facilities' },
    credit: CREDIT_TODO,
    ratio: '4/3',
  },

  // --- Visites ---------------------------------------------------------------
  'visites.guidee-groupe': {
    src: 'visites/visite-guidee-groupe-01.jpg',
    alt: { fr: 'Visite guidée d’un groupe au Domaine', en: 'Guided group tour of the estate' },
    credit: CREDIT_TODO,
    ratio: '4/3',
  },

  // --- Accès -----------------------------------------------------------------
  'acces.plan': {
    src: 'acces/plan-acces-domaine.png',
    alt: { fr: 'Plan d’accès au Domaine de Grosbois (accès véhicules et piétons)', en: 'Access map of Domaine de Grosbois (vehicle and pedestrian entrances)' },
    ratio: '4/3',
  },
} as const satisfies Record<string, ImageEntry>;

export type ImageKey = keyof typeof images;

/** Logos des 6 labels du footer (p.9 du cahier des charges). */
export const labelLogos: Record<string, ImageEntry> = {
  'monument-historique': { src: 'labels/monument-historique.svg', alt: { fr: 'Monument historique', en: 'Historic Monument' }, ratio: 'auto' },
  pefc: { src: 'labels/pefc.svg', alt: { fr: 'Forêt certifiée PEFC', en: 'PEFC certified forest' }, ratio: 'auto' },
  'ville-imperiale': { src: 'labels/ville-imperiale.svg', alt: { fr: 'Ville impériale', en: 'Imperial City' }, ratio: 'auto' },
  'demeure-historique': { src: 'labels/demeure-historique.svg', alt: { fr: 'La Demeure historique', en: 'La Demeure historique' }, ratio: 'auto' },
  'guide-michelin': { src: 'labels/guide-michelin.svg', alt: { fr: 'Guide Michelin', en: 'Michelin Guide' }, ratio: 'auto' },
  'fondation-du-patrimoine': { src: 'labels/fondation-du-patrimoine.svg', alt: { fr: 'Fondation du patrimoine', en: 'Fondation du patrimoine' }, ratio: 'auto' },
};

/** Logos partenaires (bandeau « Nous soutenir », p.9). */
export const partnerLogos: Record<string, ImageEntry> = {
  ideeparis: { src: 'partenaires/ideeparis.svg', alt: { fr: 'IdéeParis', en: 'IdéeParis' }, ratio: 'auto' },
  cd94: { src: 'partenaires/cd94.svg', alt: { fr: 'Conseil départemental du Val-de-Marne', en: 'Val-de-Marne County Council' }, ratio: 'auto' },
  gpsea: { src: 'partenaires/gpsea.svg', alt: { fr: 'Grand Paris Sud Est Avenir', en: 'Grand Paris Sud Est Avenir' }, ratio: 'auto' },
  'boissy-saint-leger': { src: 'partenaires/boissy-saint-leger.svg', alt: { fr: 'Ville de Boissy-Saint-Léger', en: 'Town of Boissy-Saint-Léger' }, ratio: 'auto' },
  'marolles-en-brie': { src: 'partenaires/marolles-en-brie.svg', alt: { fr: 'Ville de Marolles-en-Brie', en: 'Town of Marolles-en-Brie' }, ratio: 'auto' },
  'fondation-du-patrimoine': { src: 'partenaires/fondation-du-patrimoine.svg', alt: { fr: 'Fondation du patrimoine', en: 'Fondation du patrimoine' }, ratio: 'auto' },
  'explore-paris': { src: 'partenaires/explore-paris.svg', alt: { fr: 'ExploreParis', en: 'ExploreParis' }, ratio: 'auto' },
};
