/**
 * Équipe médicale — Centre Hospitalier La Colombe (Butembo, Nord-Kivu)
 * whatsapp_target : format wa.me (sans +).
 * Lignes : garde principale 243979692582 | consultations 243840344307 | maternité/pédiatrie 243843858955
 */
export const DEFAULT_DOCTOR_WHATSAPP = '243979692582';

export const DOCTORS = [
  {
    doctor_id: 'dr-gracia-nzanzu',
    nom: 'Dr. Gracia Nzanzu',
    titre: 'Médecin Directeur',
    specialite: 'Médecine générale',
    categories: ['general', 'intime', 'urgence'],
    disponibilite: 'Disponible aujourd\'hui',
    available: true,
    whatsapp_target: '243979692582',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    photo_alt: 'Dr. Gracia Nzanzu — Médecin Directeur, Centre Hospitalier La Colombe'
  },
  {
    doctor_id: 'dr-emery-kavunga',
    nom: 'Dr. Emery Kavunga',
    titre: 'Médecin généraliste',
    specialite: 'Médecine générale',
    categories: ['general', 'intime', 'urgence'],
    disponibilite: 'Disponible aujourd\'hui',
    available: true,
    whatsapp_target: '243840344307',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
    photo_alt: 'Dr. Emery Kavunga — Médecin généraliste, Centre Hospitalier La Colombe'
  },
  {
    doctor_id: 'dr-specialiste-pediatrie',
    nom: 'Dr. spécialiste — Pédiatrie',
    titre: 'Médecin spécialiste',
    specialite: 'Pédiatre',
    categories: ['general', 'maternite'],
    disponibilite: 'Disponible aujourd\'hui',
    available: true,
    whatsapp_target: '243843858955',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
    photo_alt: 'Médecin spécialiste Pédiatrie — Centre Hospitalier La Colombe'
  },
  {
    doctor_id: 'dr-specialiste-gyneco',
    nom: 'Dr. spécialiste — Gynéco-obstétrique',
    titre: 'Médecin spécialiste',
    specialite: 'Gynécologue-obstétricien',
    categories: ['maternite', 'intime'],
    disponibilite: 'Disponible aujourd\'hui',
    available: true,
    whatsapp_target: '243843858955',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    photo_alt: 'Médecin spécialiste Gynéco-obstétrique — Centre Hospitalier La Colombe'
  },
  {
    doctor_id: 'dr-specialiste-chirurgie',
    nom: 'Dr. spécialiste — Chirurgie',
    titre: 'Médecin spécialiste',
    specialite: 'Chirurgien',
    categories: ['urgence', 'general'],
    disponibilite: 'Disponible aujourd\'hui',
    available: true,
    whatsapp_target: '243840344307',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    photo_alt: 'Médecin spécialiste Chirurgie — Centre Hospitalier La Colombe'
  },
  {
    doctor_id: 'dr-specialiste-interne',
    nom: 'Dr. spécialiste — Médecine interne',
    titre: 'Médecin spécialiste',
    specialite: 'Médecine interne',
    categories: ['general', 'urgence'],
    disponibilite: 'Disponible aujourd\'hui',
    available: true,
    whatsapp_target: '243979692582',
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop',
    photo_alt: 'Médecin spécialiste Médecine interne — Centre Hospitalier La Colombe'
  }
];

export const getDoctorsForCategory = (categoryId) =>
  DOCTORS.filter((doc) => doc.categories.includes(categoryId));

export const getDoctorById = (doctorId) =>
  DOCTORS.find((doc) => doc.doctor_id === doctorId) || null;
