export const TRIAGE_CATEGORIES = [
  {
    id: 'intime',
    label: 'Santé Intime / Spécialisée',
    description: 'Consultations discrètes pour problèmes intimes ou sensibles'
  },
  {
    id: 'urgence',
    label: 'Urgence Médicale',
    description: 'Situation nécessitant une prise en charge rapide'
  },
  {
    id: 'general',
    label: 'Consultation Générale',
    description: 'Symptômes courants ou suivi médical standard'
  },
  {
    id: 'maternite',
    label: 'Maternité & Périnatalité',
    description: 'Grossesse, accouchement ou suivi périnatal'
  }
];

export const URGENCY_LEVELS = [
  { id: 'faible', label: 'Faible', description: 'Peut attendre quelques jours' },
  { id: 'moderee', label: 'Modérée', description: 'Consultation recommandée sous 24–48h' },
  { id: 'elevee', label: 'Élevée', description: 'Consultation urgente dans la journée' },
  { id: 'critique', label: 'Critique', description: 'Situation potentiellement vitale — urgence immédiate' }
];

const SYMPTOM_POOL = {
  intime: [
    'Infection suspectée',
    'Gêne depuis 48h',
    'Douleur localisée',
    'Irritation persistante',
    'Consultation préventive discrète'
  ],
  urgence: [
    'Douleur thoracique',
    'Saignement important',
    'Perte de conscience',
    'Fièvre élevée persistante',
    'Traumatisme récent'
  ],
  general: [
    'Fatigue prolongée',
    'Toux persistante',
    'Maux de tête récurrents',
    'Douleurs articulaires',
    'Problème digestif'
  ],
  maternite: [
    'Suivi de grossesse',
    'Contractions ou douleurs',
    'Mouvements fœtaux diminués',
    'Saignements en grossesse',
    'Post-partum — suivi'
  ]
};

export const getSymptomsForCategory = (categoryId) =>
  SYMPTOM_POOL[categoryId] || SYMPTOM_POOL.general;
