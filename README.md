# Domaine de Grosbois, prototype

Prototype navigable du site (Astro + Tailwind), en français. Il sert à montrer l’accueil, l’agenda, une fiche d’espace et le formulaire de devis. Ce n’est pas le site de production.

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir http://localhost:4321/

Vérifier le build : `npm run build`

## Pages

| Adresse | Contenu |
|---|---|
| `/` | Accueil |
| `/agenda/` | Agenda, filtres, calendrier, encart billetterie |
| `/privatiser/espaces/orangerie/` | Fiche espace (les autres JSON de `src/content/espaces/` utilisent le même gabarit) |
| `/privatiser/demande-de-devis/` | Formulaire de devis |
| `/visiter/reserver/` | Le même formulaire, ouvert côté visite |

Les rubriques sans page (découvrir, infos pratiques, mentions légales, etc.) restent dans le menu avec la mention « hors prototype ». Elles ne mènent nulle part.

## Où déposer les images

Dans `public/images/`, en suivant `public/images/README.md` (noms en kebab-case, une taille par photo).

Le mapping central est `src/data/images.ts`. Les événements et les espaces portent aussi leur chemin dans `src/content/`. Tant que le fichier n’est pas là, un cadre neutre affiche le nom attendu. Aucune image n’est générée.

## Ce qui est provisoire

- Textes, dates, jauges, téléphone, e-mail, adresse, témoignages.
- Tarifs du devis : `src/data/tarifs-visites.json`. Le calcul se fait dans le navigateur. Rien n’est envoyé, aucun PDF, aucun paiement.
- Billetterie : encart visible « compte Weezevent SETF, accès à venir ». Pas d’iframe, pas d’appel à Weezevent.
- Bandeau cookies de démonstration (pas tarteaucitron).
- Français seulement. Le sélecteur de langue n’est pas affiché.

## Bascule ultérieure

Non implémentée ici. Le site de production pourra passer sur un front Next.js, avec une couche de contenu remplaçable par WordPress (REST ou GraphQL). L’anglais pourra être produit via l’API DeepL. Ce dépôt ne branche ni Next.js, ni WordPress, ni DeepL.

## Captures

```bash
npm run build
npm run screenshots -- --out "<dossier>"
```

Chrome installé sur la machine est utilisé (pas de téléchargement de navigateur).
# domainedegrosbois
