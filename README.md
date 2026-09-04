# MedLink Butembo

Plateforme de questionnaire médical confidentiel connectant les patients au réseau hospitalier agréé de Butembo (RDC).

## Phase pilote

- Accès 100 % gratuit
- 3 structures partenaires : CH La Colombe, HGR Katwa, Hôpital de Matanda
- Transmission du dossier vers la garde hospitalière via WhatsApp

## Parcours utilisateur

1. **Accueil** — découverte du réseau
2. **Questionnaire** — triage guidé (catégorie, symptômes, urgence)
3. **Hôpitaux** — choix de la structure (recommandation selon le profil)
4. **Qualification** — pseudonyme et tranche d'âge (facultatifs)
5. **Confirmation** — bulletin `#MLB-YYYYMMDD-XXXX` + envoi WhatsApp

## Stack

- HTML / CSS / JavaScript (ES Modules)
- Aucun backend — persistance `localStorage`
- Hébergement statique (GitHub Pages)

## Déploiement GitHub Pages

1. Repo : [github.com/es-company98/MedLink-Butembo](https://github.com/es-company98/MedLink-Butembo)
2. **Settings → Pages → Source** : Deploy from branch `main`, folder `/ (root)`
3. URL live : `https://es-company98.github.io/MedLink-Butembo/`

## Développement local

Ouvrir `index.html` via un serveur local (ex. extension Live Server) — les modules ES nécessitent HTTP.

```bash
npx serve .
```

## Structure

```
├── index.html          # Landing
├── triage.html         # Questionnaire
├── hospitals.html      # Choix structure
├── consultation.html   # Qualification dossier
├── confirmation.html   # Bulletin + WhatsApp
├── css/style.css
└── js/
    ├── app.js          # Init globale
    ├── ui.js           # Nav, footer, étapes
    ├── storage.js      # localStorage + message WhatsApp
    ├── hospitals-data.js
    └── ...
```

## Numéros WhatsApp (phase pilote)

| Structure | Numéro |
|-----------|--------|
| CH La Colombe | +243 979 692 582 |
| HGR Katwa | +243 840 344 307 |
| Hôpital Matanda | +243 843 858 955 |

*À valider officiellement avec chaque établissement avant mise en production.*
