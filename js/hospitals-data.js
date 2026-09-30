import { HGR_KATWA_IMAGES, HGR_KATWA_IMAGE_ALT } from './hgr-katwa-data.js';

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
    image: HGR_KATWA_IMAGES.campus,
    image_alt: HGR_KATWA_IMAGE_ALT
  }
];

export const getHospitalById = (id) =>
  HOSPITALS.find((h) => h.hospital_id === id) || null;

export const getDefaultHospital = () =>
  getHospitalById(DEFAULT_HOSPITAL_ID) || HOSPITALS[0];
