# Hôpital Général de Référence de Katwa — Site institutionnel

Site web patient et institutionnel pour le **HGR Katwa** (Butembo, Nord-Kivu, RDC). Front-end statique (HTML, CSS, JavaScript ES Modules), sans base de données.

## Arborescence

| Page | Rôle |
|------|------|
| `index.html` | Accueil institutionnel |
| `presentation.html` | Présentation, mot de la direction, ancrage Katwa |
| `services.html` | Grille des services cliniques |
| `equipe.html` | Équipe médicale et responsables de service |
| `infos-pratiques.html` | Horaires, accès, visites, documents |
| `rendez-vous.html` | Formulaire RDV / renseignements (WhatsApp) |
| `partenaires.html` | Espace B2B (lien discret en pied de page) |
| `triage.html` | Orientation à distance **optionnelle** (lien depuis un service) |

## Données

- `js/hgr-katwa-data.js` — institution, services, équipe, infos pratiques
- `js/app-config.js` — identité et contact

## Lancement local

Servir le dossier en HTTP statique (ex. `npx serve .`).

## Contact usager (WhatsApp)

Ligne information / RDV : **+243 840 344 307** (`243840344307`)
