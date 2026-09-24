/**
 * Équipe médicale — HGR Katwa (Butembo, Nord-Kivu)
 * whatsapp_target : format wa.me (sans +).
 * Ligne HGR Katwa : 243840344307
 */
export const DEFAULT_DOCTOR_WHATSAPP = '243840344307';

export const DOCTORS = [
  {
    doctor_id: 'dr-gracia-nzanzu',
    nom: 'Dr. Gracia Nzanzu',
    titre: 'Médecin Directeur',
    specialite: 'Médecine générale',
    categories: ['general', 'intime', 'urgence'],
    disponibilite: 'Disponible aujourd\'hui',
    available: true,
    whatsapp_target: '243840344307',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    photo_alt: 'Dr. Gracia Nzanzu — Médecin Directeur, HGR Katwa'
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
    photo_alt: 'Dr. Emery Kavunga — Médecin généraliste, HGR Katwa'
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
    photo_alt: 'Médecin spécialiste Pédiatrie — HGR Katwa'
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
    photo_alt: 'Médecin spécialiste Gynéco-obstétrique — HGR Katwa'
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
    photo_alt: 'Médecin spécialiste Chirurgie — HGR Katwa'
  },
  {
    doctor_id: 'dr-specialiste-interne',
    nom: 'Dr. spécialiste — Médecine interne',
    titre: 'Médecin spécialiste',
    specialite: 'Médecine interne',
    categories: ['general', 'urgence'],
    disponibilite: 'Disponible aujourd\'hui',
    available: true,
    whatsapp_target: '243840344307',
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop',
    photo_alt: 'Médecin spécialiste Médecine interne — HGR Katwa'
  }
];

export const getDoctorsForCategory = (categoryId) =>
  DOCTORS.filter((doc) => doc.categories.includes(categoryId));

export const getDoctorById = (doctorId) =>
  DOCTORS.find((doc) => doc.doctor_id === doctorId) || null;
