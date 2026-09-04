export const HOSPITALS = [
  {
    hospital_id: 'ch-lacolombe',
    nom: 'Centre Hospitalier La Colombe',
    localisation: 'Cellule Kaghondo, Quartier Rughenda, Commune de Bulengera, Butembo, Nord-Kivu',
    quartier: 'Bulengera — Kaghondo',
    description: 'Structure sanitaire moderne ouverte à Butembo en juillet 2025. Plus de 60 lits d\'accueil : médecine interne, pédiatrie, chirurgie, gynéco-obstétrique, dentisterie et maternité. Plateau technique complet — électrocardiogramme, dentisterie, moniteurs de surveillance, mobiliseur et laboratoire d\'analyses. Trois médecins généralistes permanents et des spécialistes par département.',
    specialites: [
      'Consultations spécialisées',
      'Examens cardiologiques et dentaires',
      'Diagnostic biologique rapide',
      'Prise en charge discrète'
    ],
    whatsapp_target: '243979692582',
    badge: 'Pôle Diagnostic & Équipements Spécialisés — Kaghondo',
    temps_attente: '15–30 min',
    accent: '#3d7a6a',
    image: 'https://i0.wp.com/rtvh.net/wp-content/uploads/2025/11/CH-LA-COLOMBE.jpg?w=1080&ssl=1',
    image_alt: 'Centre Hospitalier La Colombe — Cellule Kaghondo, Bulengera, Butembo'
  },
  {
    hospital_id: 'hgr-katwa',
    nom: 'Hôpital Général de Référence de Katwa',
    localisation: 'Quartier Bwinongo, Commune Mususa, axe Marché de Katwa, Butembo, Nord-Kivu',
    quartier: 'Mususa — Bwinongo',
    description: 'Institution paraétatique fondée en 1952, à 7 km au sud-est du centre-ville de Butembo (commune Mususa, quartier Bwinongo). Grande maternité de référence réhabilitée et modernisée, avec environ 100 accouchements par mois. Urgences et réanimation 24h/24, 7j/7. Site avancé de prélèvement sanguin pour les urgences transfusionnelles. Hôpital polyvalent de référence pour la zone de santé de Katwa.',
    specialites: [
      'Grande Maternité de Référence',
      'Urgences 24h/24 et 7j/7',
      'Prélèvement sanguin d\'urgence',
      'Centre de traitement spécialisé'
    ],
    whatsapp_target: '243840344307',
    badge: 'Institution Publique Historique — Maternité & Urgences 24/7',
    temps_attente: '20–45 min',
    accent: '#b85c38',
    image: 'https://drc.unfpa.org/sites/default/files/2021/maternite_butembo.jpg',
    image_alt: 'Maternité de l\'Hôpital Général de Référence de Katwa — Butembo, Nord-Kivu'
  },
  {
    hospital_id: 'hopital-matanda',
    nom: 'Hôpital de Référence Secondaire de Matanda',
    localisation: 'Cellule Ndonga, Quartier Matanda, Commune Mususa, axe Butembo-Goma, Zone de Santé de Katwa, Butembo, Nord-Kivu',
    quartier: 'Mususa — Matanda',
    description: 'Hôpital de Référence Secondaire sur la colline de Matanda (commune Mususa, Butembo). Anesthésie-réanimation, soins intensifs et urgences 24h/24. Chirurgies générales, ORL, maxillo-faciales, neurochirurgicales, pédiatriques et gynéco-obstétricales. Site avancé de prélèvement sanguin en coordination avec l\'HGR Katwa.',
    specialites: [
      'Bloc opératoire ultra-moderne',
      'Pôle de neurochirurgie',
      'Réserve sang & prélèvement avancé',
      'Pavillons d\'urgence haute capacité'
    ],
    whatsapp_target: '243843858955',
    badge: 'Bloc Chirurgical de Pointe & Neurochirurgie — Axe Matanda',
    temps_attente: '25–50 min',
    accent: '#4a5a8a',
    image: 'https://digitalcongo.org/plks_vues/fichiers/images/1670936985.jpg',
    image_alt: 'Hôpital de Référence Secondaire de Matanda — Butembo, Nord-Kivu'
  }
];

export const getHospitalById = (id) =>
  HOSPITALS.find((h) => h.hospital_id === id) || null;
