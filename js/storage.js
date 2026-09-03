const STORAGE_KEY = 'medlink_triage_data';

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
  tranche_age: ''
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
    tranche_age: sanitizeString(raw.tranche_age, 30)
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
  const merged = validateData({ ...current, ...partial });
  try {
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
    '🔬 *Évaluation médicale*',
    `Catégorie : ${data.categorie}`,
    `Urgence : ${data.urgence}`,
    `Symptômes : ${data.symptomes.join(', ') || 'Non précisé'}`,
    '',
    '👤 *Patient*',
    `Identifiant : ${data.patient_pseudo || 'Anonyme'}`,
    `Tranche d'âge : ${data.tranche_age || 'Non précisée'}`,
    '',
    '— Transmis via MedLink Butembo (Phase Pilote)'
  ];
  return lines.join('\n');
};
