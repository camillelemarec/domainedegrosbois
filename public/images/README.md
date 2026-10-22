# Dossier images, convention de dépôt

Ce dossier est alimenté par Camille. Le site ne « casse » jamais si une image manque : un
placeholder neutre s'affiche avec le nom du fichier attendu. Dès qu'un fichier est déposé au
bon endroit avec le bon nom, il remplace automatiquement le placeholder (relancer `npm run dev`
ou `npm run build` si besoin).

## 1. Règles de nommage

1. **kebab-case, sans accents, sans espaces, sans majuscules** : `chateau-facade-cour-01.jpg`.
2. **Schéma** : `{rubrique}/{sujet}-{detail}-{nn}.{ext}`
   - `nn` = numéro à deux chiffres (`01`, `02`…) pour les séries ;
   - `ext` = `jpg` (photos), `png` (logos / plans avec transparence), `svg` (logos vectoriels, pictos).
3. **Une seule taille par image** (le build génère les variantes responsives) :
   - hero : côté long **2400 px**, ratio 16:9 (ou 21:9 desktop) ;
   - cartes, galeries : côté long **1600 px**, ratio 4:3 ;
   - vignettes : **800 px** ;
   - portraits équipe : 1:1 ;
   - logos : fond transparent, SVG de préférence.
4. JPG qualité ~85. Pas de texte incrusté dans les images (accessibilité, traduction).

## 2. Crédits et textes alternatifs

Une ligne par fichier dans `credits.csv` (séparateur `;`) :

```
chemin;credit;legende_fr;alt_fr;alt_en
chateau/chateau-facade-cour-01.jpg;© J.-M. Paroissien;Façade sur cour du château;Façade du château de Grosbois vue de la cour;Courtyard facade of Grosbois castle
```

Toute image reprise du cahier des charges porte son crédit (© J.-M. Paroissien, © J.-L. Lamaere…).

## 3. Où déposer quoi

| Dossier | Contenu |
|---|---|
| `logo/` | logo Grosbois 2023 (SVG), déclinaison IdéeParis rose/gris (orangerie), logo SETF |
| `accueil/` | hero château + trotteurs, visuels des 3 entrées Évènements / Visites / Actualités |
| `chateau/` | façades, grilles, intérieurs, collections |
| `centre-entrainement/` | pistes, écuries, entraînement, piste couverte |
| `musee-du-trot/` | salles, collections, archives |
| `espaces/{slug}/` | photos par espace privatisable (hero, configurations, détails) |
| `visites/` | visites guidées, groupes, scolaires |
| `evenements/` | une image par événement de l'agenda (`{slug-evenement}-01.jpg`) |
| `actualites/` | une image par actualité |
| `engagements/` | forêt PEFC, apiculture, plantations, bien-être animal… |
| `equipe/` | portraits 1:1 (sous réserve de consentement écrit) |
| `labels/` | 6 logos de labels (SVG) : voir liste ci-dessous |
| `partenaires/` | logos partenaires (SVG) |
| `acces/` | plan d'accès, photos des entrées véhicules / piétons |
| `pictos/` | pictogrammes sur mesure si besoin (sinon icônes intégrées au code) |

## 4. Fichiers attendus pour la maquette du 25/10 (minimum)

Les chemins ci-dessous sont ceux référencés dans `src/data/images.ts`. Déposer le fichier au bon
nom suffit ; pour utiliser un autre nom, modifier le champ `src` correspondant dans `images.ts`.

| Chemin | Usage |
|---|---|
| `logo/logo-grosbois-2023.svg` | header, footer |
| `logo/logo-grosbois-ideeparis-rose.png` | fiche Orangerie (mariages) |
| `logo/logo-setf.svg` | footer |
| `accueil/hero-chateau-trotteurs-01.jpg` | hero accueil |
| `accueil/entree-evenements-01.jpg` | carte « Évènements » |
| `accueil/entree-visites-01.jpg` | carte « Visites » |
| `accueil/entree-actualites-01.jpg` | carte « Actualités » |
| `chateau/chateau-facade-cour-01.jpg` | accueil (3 facettes), découvrir |
| `chateau/chateau-grilles-01.jpg` | découvrir |
| `centre-entrainement/piste-qualifications-01.jpg` | accueil (3 facettes) |
| `musee-du-trot/musee-salle-01.jpg` | accueil (3 facettes), espace |
| `espaces/orangerie/orangerie-hero-01.jpg` | hero fiche Orangerie |
| `espaces/orangerie/orangerie-config-theatre-01.jpg` | galerie configurations |
| `espaces/orangerie/orangerie-config-cocktail-01.jpg` | galerie configurations |
| `espaces/orangerie/orangerie-config-banquet-01.jpg` | galerie configurations |
| `espaces/orangerie/orangerie-jardin-01.jpg` | galerie |
| `espaces/espace-affaires/espace-affaires-vignette-01.jpg` | mosaïque « Nos espaces » |
| `espaces/musee-du-trot/musee-du-trot-vignette-01.jpg` | mosaïque |
| `espaces/chateau/chateau-vignette-01.jpg` | mosaïque |
| `espaces/orangerie/orangerie-vignette-01.jpg` | mosaïque |
| `espaces/piste-couverte/piste-couverte-vignette-01.jpg` | mosaïque |
| `espaces/espaces-verts/espaces-verts-vignette-01.jpg` | mosaïque |
| `evenements/{slug}-01.jpg` (×4, voir `src/content/evenements/`) | agenda |
| `visites/visite-guidee-groupe-01.jpg` | page réservation |
| `labels/monument-historique.svg` | footer |
| `labels/pefc.svg` | footer |
| `labels/ville-imperiale.svg` | footer |
| `labels/demeure-historique.svg` | footer |
| `labels/guide-michelin.svg` | footer |
| `labels/fondation-du-patrimoine.svg` | footer |
| `partenaires/{slug}.svg` (ideeparis, cd94, gpsea, boissy-saint-leger, marolles-en-brie, fondation-du-patrimoine, explore-paris) | bandeau partenaires |
| `acces/plan-acces-domaine.png` | infos pratiques |

## 5. Vérifier ce qui manque

```bash
npm run check:images
```

Affiche la liste des images présentes / manquantes et écrit `src/data/images-manifest.json`.
