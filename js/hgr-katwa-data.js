/** Données institutionnelles — HGR Katwa (Butembo, Nord-Kivu). */

export const INSTITUTION = {
  official_name: 'Hôpital Général de Référence de Katwa',
  short_name: 'HGR Katwa',
  type: 'Établissement public hospitalier de référence',
  province: 'Nord-Kivu',
  city: 'Butembo',
  country: 'République Démocratique du Congo',
  address: 'Quartier Bwinongo, Commune Mususa, Butembo',
  access_hint: 'Axe Marché de Katwa, sud-est du centre-ville de Butembo',
  badge: 'Institution publique historique — Maternité & Urgences 24h/24',
  whatsapp: '243840344307',
  phone_display: '+243 840 344 307'
};

export const INSTITUTION_IMAGES = {
  hero:
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=420&fit=crop&q=80',
  anchorage:
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=720&h=480&fit=crop&q=80'
};

export const HOME_MARQUEE_ITEMS = [
  'HGR Katwa — Butembo, Nord-Kivu',
  'Urgences 24h/24',
  'Maternité de référence',
  'Banque de sang & transfusion',
  'Commune Mususa — Bwinongo',
  'Établissement public hospitalier',
  'Laboratoire & diagnostic',
  'Accueil des usagers'
];

export const DIRECTOR_MESSAGE = {
  title: 'Mot de la direction',
  intro:
    'L\'Hôpital Général de Référence de Katwa est un pilier de l\'offre de soins à Butembo et dans la région du Nord-Kivu. Notre mission est d\'assurer une prise en charge de qualité, accessible et humaine, en particulier pour la maternité, les urgences et les pathologies nécessitant une structure de référence.',
  body:
    'Fort de notre ancrage à Bwinongo, au cœur de la Commune Mususa, nous renforçons continuellement nos services cliniques, notamment la maternité de référence et la réponse aux urgences vitales. Nous accueillons patients, familles et partenaires avec exigence professionnelle et respect de la dignité de chaque usager.',
  signature: 'Direction médicale — HGR Katwa'
};

export const CLINICAL_SERVICES = [
  {
    service_id: 'urgences',
    name: 'Urgences & soins continus',
    summary: 'Prise en charge 24h/24 et 7j/7, triage, stabilisation et orientation vers les unités spécialisées.',
    icon_label: 'Urgences',
    teleconsultation: false
  },
  {
    service_id: 'maternite',
    name: 'Maternité de référence',
    summary: 'Suivi de grossesse, accouchements, soins néonataux — pôle historique modernisé avec appui partenaires.',
    icon_label: 'Maternité',
    teleconsultation: false
  },
  {
    service_id: 'medecine-generale',
    name: 'Médecine générale & consultations',
    summary: 'Consultations de premier recours, suivi des maladies chroniques et orientation vers les spécialistes.',
    icon_label: 'Consultations',
    teleconsultation: false
  },
  {
    service_id: 'chirurgie',
    name: 'Chirurgie générale',
    summary: 'Interventions programmées et chirurgie d\'urgence en coordination avec le bloc opératoire.',
    icon_label: 'Chirurgie',
    teleconsultation: false
  },
  {
    service_id: 'pediatrie',
    name: 'Pédiatrie',
    summary: 'Soins aux enfants et adolescents, vaccination et suivi de croissance.',
    icon_label: 'Pédiatrie',
    teleconsultation: false
  },
  {
    service_id: 'laboratoire',
    name: 'Laboratoire & diagnostic',
    summary: 'Analyses biologiques, prélèvements et appui au diagnostic clinique.',
    icon_label: 'Laboratoire',
    teleconsultation: false
  },
  {
    service_id: 'transfusion',
    name: 'Banque de sang & prélèvements',
    summary: 'Site de prélèvement et gestion transfusionnelle pour les urgences et les services cliniques.',
    icon_label: 'Transfusion',
    teleconsultation: false
  },
  {
    service_id: 'orientation-distance',
    name: 'Orientation médicale à distance',
    summary: 'Service complémentaire optionnel : pré-orientation confidentielle avant votre venue à l\'hôpital (phase pilote).',
    icon_label: 'Option',
    teleconsultation: true,
    teleconsultation_href: './triage.html'
  }
];

export const MEDICAL_TEAM = [
  {
    member_id: 'direction-medicale',
    name: 'Direction médicale',
    role: 'Médecin directeur',
    department: 'Direction & gouvernance clinique',
    bio: 'Coordination des services, qualité des soins et liaison avec les autorités sanitaires provinciales.'
  },
  {
    member_id: 'chef-urgences',
    name: 'Chef de service — Urgences',
    role: 'Médecin urgentiste',
    department: 'Urgences & soins continus',
    bio: 'Organisation du triage, des prises en charge vitales et de la réponse 24h/24.'
  },
  {
    member_id: 'chef-maternite',
    name: 'Chef de service — Maternité',
    role: 'Gynécologue-obstétricien',
    department: 'Maternité de référence',
    bio: 'Suivi des grossesses à risque, accouchements et coordination néonatale.'
  },
  {
    member_id: 'chef-chirurgie',
    name: 'Chef de service — Chirurgie',
    role: 'Chirurgien',
    department: 'Chirurgie générale',
    bio: 'Programmation opératoire et chirurgie d\'urgence.'
  },
  {
    member_id: 'chef-pediatrie',
    name: 'Chef de service — Pédiatrie',
    role: 'Pédiatre',
    department: 'Pédiatrie',
    bio: 'Prise en charge des enfants hospitalisés et consultations pédiatriques.'
  },
  {
    member_id: 'chef-labo',
    name: 'Responsable — Laboratoire',
    role: 'Biologiste médical',
    department: 'Laboratoire & diagnostic',
    bio: 'Validation des analyses et sécurité des prélèvements.'
  }
];

export const PRACTICAL_INFO = {
  hours: [
    { label: 'Urgences', value: 'Ouvert 24h/24, 7j/7' },
    { label: 'Consultations externes', value: 'Lundi – vendredi, 8h – 16h (selon service)' },
    { label: 'Accueil administratif', value: 'Lundi – vendredi, 8h – 15h' }
  ],
  access: [
    'Commune Mususa, quartier Bwinongo — axe Marché de Katwa',
    'Butembo, Nord-Kivu — accès possible en moto-taxi et véhicule depuis le centre-ville',
    'Repères : institution publique historique, pôle maternité & urgences'
  ],
  visits: [
    'Visites encadrées selon l\'état du patient et les consignes du service',
    'Respect des horaires affichés dans les unités de soins',
    'Hygiène des mains obligatoire à l\'entrée des pavillons'
  ],
  documents: [
    'Carte d\'identité ou document équivalent',
    'Carnet de santé / antécédents si disponibles',
    'Ordonnances en cours pour les consultations de suivi'
  ]
};

export const B2B_PARTNERS = {
  title: 'Partenaires & approvisionnement',
  intro:
    'Espace réservé aux institutions, fournisseurs médicaux et partenaires internationaux souhaitant collaborer avec l\'HGR Katwa.',
  topics: [
    'Approvisionnement en médicaments et consommables',
    'Équipements hospitaliers et maintenance',
    'Appui technique et formation des personnels',
    'Projets de santé publique en Nord-Kivu'
  ],
  contact_note: 'Pour toute demande institutionnelle, utilisez le formulaire en précisant « Partenariat B2B » dans l\'objet, ou contactez la direction par les canaux officiels de l\'établissement.'
};

export const getServiceById = (id) =>
  CLINICAL_SERVICES.find((s) => s.service_id === id) || null;

export const HOME_PILLARS = [
  {
    pillar_id: 'maternite-ref',
    title: 'Maternité de référence',
    text:
      'Pôle historique du HGR Katwa, renforcé pour accueillir les grossesses simples et compliquées, avec suivi néonatal et coordination avec les urgences.'
  },
  {
    pillar_id: 'urgences-24',
    title: 'Urgences & soins continus',
    text:
      'Réponse 24h/24 et 7j/7 : triage, stabilisation et orientation vers la chirurgie, la maternité ou le laboratoire selon la gravité.'
  },
  {
    pillar_id: 'banque-sang',
    title: 'Banque de sang & transfusion',
    text:
      'Site de prélèvement et gestion transfusionnelle pour les urgences vitales et les interventions chirurgicales — maillon essentiel du réseau de référence à Butembo.'
  }
];

export const HOME_COMMITMENTS = [
  {
    title: 'Établissement public de référence',
    text: 'Le HGR Katwa assume des missions de soins pour la population de Butembo et du Nord-Kivu, dans le cadre du système de santé congolais.'
  },
  {
    title: 'Accueil des usagers',
    text: 'Information claire, orientation vers le bon service et respect de la dignité des patients et des accompagnants.'
  },
  {
    title: 'Continuité des soins',
    text: 'Coordination entre urgences, maternité, bloc opératoire et laboratoire pour une prise en charge cohérente sur site.'
  },
  {
    title: 'Ancrage local',
    text: 'Quartier Bwinongo, Commune Mususa — axe Marché de Katwa, accessible depuis le centre-ville de Butembo.'
  }
];
