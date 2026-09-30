import { DEFAULT_HOSPITAL_ID, getDefaultHospital } from './hospitals-data.js';

const STORAGE_KEY = 'medlink_triage_data';

const CONSULTATION_MODES = new Set(['sms', 'appel']);

const DEFAULT_DATA = {
  dossier_id: '',
  date: '',
  categorie: '',
  symptomes: [],
  urgence: '',
  hopital_choisi: '',
  hospital_id: '',
  quartier: '',
  whatsapp_target: '',
  patient_pseudo: '',
  tranche_age: '',
  mode_consultation: '',
  medecin_id: '',
  medecin_nom: '',
  medecin_specialite: ''
};

const sanitizeString = (value, maxLength = 200) => {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
};

const sanitizeStringArray = (arr, maxItems = 20) => {
  if (!Array.isArray(arr)) return [];
  return arr
    .filter((item) => typeof item === 'string')
    .map((item) => sanitizeString(item, 100))
    .slice(0, maxItems);
};


const sanitizeConsultationMode = (value) =>
  CONSULTATION_MODES.has(value) ? value : '';

const LEGACY_WHATSAPP_TARGETS = new Set(['243000000002', '243000000003']);

const isLegacyHospitalContext = (data) => {
  const id = sanitizeString(data?.hospital_id, 50);
  const blob = `${sanitizeString(data?.hopital_choisi, 150)} ${sanitizeString(data?.quartier, 100)}`.toLowerCase();
  if (/colombe|matanda|bulengera|kaghondo|rughenda|medlink/.test(blob)) return true;
  if (id && id !== DEFAULT_HOSPITAL_ID) return true;
  return false;
};

/** Réaligne les dossiers en cache (ancien réseau MedLink / La Colombe) sur le HGR Katwa. */
export const ensureSiteHospitalContext = (data) => {
  if (!data || typeof data !== 'object') return { ...DEFAULT_DATA };
  if (!isLegacyHospitalContext(data)) return data;

  const hospital = getDefaultHospital();
  const next = {
    ...data,
    hospital_id: hospital.hospital_id,
    hopital_choisi: hospital.nom,
    quartier: hospital.quartier
  };

  if (
    !next.medecin_id
    && (LEGACY_WHATSAPP_TARGETS.has(next.whatsapp_target) || isLegacyHospitalContext(data))
  ) {
    next.whatsapp_target = hospital.whatsapp_target;
  }

  return next;
};

const validateData = (raw) => {
  if (!raw || typeof raw !== 'object') return { ...DEFAULT_DATA };
  return {
    dossier_id: sanitizeString(raw.dossier_id, 30),
    date: sanitizeString(raw.date, 30),
    categorie: sanitizeString(raw.categorie, 100),
    symptomes: sanitizeStringArray(raw.symptomes),
    urgence: sanitizeString(raw.urgence, 50),
    hopital_choisi: sanitizeString(raw.hopital_choisi, 150),
    hospital_id: sanitizeString(raw.hospital_id, 50),
    quartier: sanitizeString(raw.quartier, 100),
    whatsapp_target: sanitizeString(raw.whatsapp_target, 20),
    patient_pseudo: sanitizeString(raw.patient_pseudo, 50),
    tranche_age: sanitizeString(raw.tranche_age, 30),
    mode_consultation: sanitizeConsultationMode(raw.mode_consultation),
    medecin_id: sanitizeString(raw.medecin_id, 50),
    medecin_nom: sanitizeString(raw.medecin_nom, 100),
    medecin_specialite: sanitizeString(raw.medecin_specialite, 100)
  };
};

export const getMedlinkData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_DATA };
    const validated = validateData(JSON.parse(raw));
    const normalized = ensureSiteHospitalContext(validated);
    if (
      normalized.hospital_id !== validated.hospital_id
      || normalized.hopital_choisi !== validated.hopital_choisi
      || normalized.quartier !== validated.quartier
      || normalized.whatsapp_target !== validated.whatsapp_target
    ) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    return { ...DEFAULT_DATA };
  }
};

export const saveMedlinkData = (partial) => {
  const current = getMedlinkData();
  try {
    const merged = validateData({ ...current, ...partial });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return current;
  }
};

export const clearMedlinkData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* stockage indisponible */
  }
};

export const isTriageComplete = (data) =>
  Boolean(
    data?.categorie
    && data?.medecin_id
    && data?.symptomes?.length > 0
    && data?.urgence
  );

export const getMissingTriageSteps = (data) => {
  const missing = [];
  if (!data?.categorie) missing.push('category');
  if (!data?.symptomes?.length) missing.push('symptoms');
  if (!data?.urgence) missing.push('urgency');
  if (!data?.medecin_id) missing.push('doctor');
  return missing;
};

export const getConsultationModeLabel = (mode) => {
  if (mode === 'sms') return 'Par SMS';
  if (mode === 'appel') return 'Par appel téléphonique';
  return 'Non précisé';
};

export const generateDossierId = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return `HGR-${y}${m}${d}-${rand}`;
};

export const buildWhatsAppMessage = (data) => {
  const lines = [
    '📋 *DOSSIER HGR KATWA*',
    `🔖 Référence : #${data.dossier_id}`,
    `📅 Date : ${new Date(data.date || Date.now()).toLocaleString('fr-FR')}`,
    '',
    '🏥 *Orientation*',
    `Structure : ${data.hopital_choisi}`,
    `Quartier : ${data.quartier}`,
    '',
    '🔬 *Triage médical*',
    `Motif : ${data.categorie || 'Non renseigné'}`,
    `Médecin : ${data.medecin_nom || 'Non renseigné'}${data.medecin_specialite ? ` (${data.medecin_specialite})` : ''}`,
    `Urgence : ${data.urgence || 'Non évaluée'}`,
    `Symptômes : ${data.symptomes?.length ? data.symptomes.join(', ') : 'Non renseignés'}`,
    '',
    '👤 *Patient*',
    `Identifiant : ${data.patient_pseudo || 'Anonyme'}`,
    `Tranche d'âge : ${data.tranche_age || 'Non précisée'}`,
    `Mode de consultation : ${getConsultationModeLabel(data.mode_consultation)}`,
    '',
    '— Transmis via Hôpital Général de Référence de Katwa (orientation à distance — option)'
  ];
  return lines.join('\n');
};
