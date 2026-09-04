export const HOSPITALS = [
  {
    hospital_id: 'ch-lacolombe',
    nom: 'Centre Hospitalier La Colombe',
    localisation: 'Cellule Kaghondo, Quartier Rughenda, Commune de Bulengera, Butembo',
    quartier: 'Bulengera — Kaghondo',
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
    image: '',
    image_alt: 'Bureau de consultation cardiologique moderne — CH La Colombe Butembo'
  },
  {
    hospital_id: 'hgr-katwa',
    nom: 'Hôpital Général de Référence de Katwa',
    localisation: 'Quartier Bwinongo, Commune Mususa, axe Marché de Katwa, Butembo',
    quartier: 'Mususa — Bwinongo',
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
    image: '',
    image_alt: 'Maternité modernisée et pôle de soins continus — HGR Katwa Butembo'
  },
  {
    hospital_id: 'hopital-matanda',
    nom: 'Hôpital de Référence Secondaire de Matanda',
    localisation: 'Cellule Ndonga, Quartier Matanda, Commune Mususa, axe Butembo-Goma',
    quartier: 'Mususa — Matanda',
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
    image: '',
    image_alt: 'Bloc opératoire technologique — Hôpital de Matanda Butembo'
  }
];

export const getHospitalById = (id) =>
  HOSPITALS.find((h) => h.hospital_id === id) || null;
