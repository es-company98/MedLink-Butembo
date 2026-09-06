export const DEFAULT_HOSPITAL_ID = 'ch-lacolombe';

export const HOSPITALS = [
  {
    hospital_id: DEFAULT_HOSPITAL_ID,
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
  }
];

export const getHospitalById = (id) =>
  HOSPITALS.find((h) => h.hospital_id === id) || null;

export const getDefaultHospital = () =>
  getHospitalById(DEFAULT_HOSPITAL_ID) || HOSPITALS[0];
