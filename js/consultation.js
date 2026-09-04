import { getMedlinkData, saveMedlinkData, isTriageComplete } from './storage.js';

const recapEl = () => document.getElementById('consultation-recap');
const form = () => document.getElementById('consultation-form');

const AGE_RANGES = [
  '18–25 ans',
  '26–35 ans',
  '36–45 ans',
  '46–55 ans',
  '56 ans et plus',
  'Je préfère ne pas préciser'
];

const renderRecap = (data) => {
  const el = recapEl();
  if (!el) return;
  el.replaceChildren();

  const title = document.createElement('h2');
  title.textContent = 'Votre dossier avant transmission';
  el.appendChild(title);

  const card = document.createElement('div');
  card.className = 'consultation-recap-card card-3d';

  const rows = [
    ['Catégorie', data.categorie],
    ['Symptômes', data.symptomes.join(', ') || '—'],
    ['Urgence', data.urgence],
    ['Structure choisie', data.hopital_choisi],
    ['Quartier', data.quartier]
  ];

  rows.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'recap-row';
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = value || '—';
    row.appendChild(dt);
    row.appendChild(dd);
    card.appendChild(row);
  });

  el.appendChild(card);
};

const initConsultation = () => {
  const data = getMedlinkData();
  if (!data.hospital_id) {
    window.location.href = './hospitals.html';
    return;
  }
  if (!isTriageComplete(data)) {
    window.location.href = './triage.html';
    return;
  }

  renderRecap(data);

  const ageSelect = document.getElementById('tranche-age');
  if (ageSelect) {
    AGE_RANGES.forEach((range) => {
      const opt = document.createElement('option');
      opt.value = range;
      opt.textContent = range;
      ageSelect.appendChild(opt);
    });
    if (data.tranche_age) ageSelect.value = data.tranche_age;
  }

  const pseudoInput = document.getElementById('patient-pseudo');
  if (pseudoInput && data.patient_pseudo) {
    pseudoInput.value = data.patient_pseudo;
  }

  form()?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pseudo = document.getElementById('patient-pseudo')?.value || '';
    const age = document.getElementById('tranche-age')?.value || '';
    saveMedlinkData({
      patient_pseudo: pseudo.trim() || 'Anonyme',
      tranche_age: age
    });
    window.location.href = './confirmation.html';
  });
};

if (document.body.dataset.page === 'consultation') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConsultation);
  } else {
    initConsultation();
  }
}
