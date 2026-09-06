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
    return validateData(JSON.parse(raw));
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
  return `MLB-${y}${m}${d}-${rand}`;
};

export const buildWhatsAppMessage = (data) => {
  const lines = [
    '📋 *DOSSIER MEDLINK BUTEMBO*',
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
    '— Transmis via Centre Hospitalier La Colombe (Phase Pilote)'
  ];
  return lines.join('\n');
};
