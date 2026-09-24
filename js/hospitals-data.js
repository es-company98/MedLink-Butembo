export const DEFAULT_HOSPITAL_ID = 'hgr-katwa';

export const HOSPITALS = [
  {
    hospital_id: DEFAULT_HOSPITAL_ID,
    nom: 'Hôpital Général de Référence de Katwa',
    localisation: 'Quartier Bwinongo, Commune Mususa, Butembo, Nord-Kivu',
    quartier: 'Mususa — Bwinongo',
    description:
      'Établissement public hospitalier de référence à Butembo. Maternité de référence, urgences 24h/24, banque de sang et plateau diagnostic.',
    specialites: [
      'Urgences 24h/24',
      'Maternité de référence',
      'Chirurgie générale',
      'Laboratoire & transfusion'
    ],
    whatsapp_target: '243840344307',
    badge: 'Institution publique historique — Maternité & Urgences 24/7',
    temps_attente: 'Variable selon service',
    accent: '#1e4a6e',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1080&h=600&fit=crop',
    image_alt: 'Hôpital Général de Référence de Katwa — Butembo, Nord-Kivu'
  }
];

export const getHospitalById = (id) =>
  HOSPITALS.find((h) => h.hospital_id === id) || null;

export const getDefaultHospital = () =>
  getHospitalById(DEFAULT_HOSPITAL_ID) || HOSPITALS[0];
