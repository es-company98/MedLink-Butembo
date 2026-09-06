import { getMedlinkData, saveMedlinkData, generateDossierId, buildWhatsAppMessage, clearMedlinkData, isTriageComplete, getConsultationModeLabel } from './storage.js';

const dossierEl = () => document.getElementById('dossier-id-display');
const whatsappBtn = () => document.getElementById('whatsapp-transmit-btn');
const summaryEl = () => document.getElementById('confirmation-summary');
const transmitTargetEl = () => document.getElementById('confirmation-transmit-target');
const newConsultBtn = () => document.getElementById('new-consultation-btn');
const modeOptionsEl = () => document.getElementById('confirmation-mode-options');

const CONSULTATION_MODE_CHOICES = [
  {
    id: 'sms',
    label: 'Par SMS',
    description: 'Recevoir la prise en charge et les consignes par message texte.'
  },
  {
    id: 'appel',
    label: 'Par appel téléphonique',
    description: 'Être rappelé directement par la garde ou le médecin référent.'
  }
];

let selectedMode = '';

const renderSummary = (data) => {
  const el = summaryEl();
  if (!el) return;
  el.replaceChildren();

  const items = [
    ['Structure', data.hopital_choisi],
    ['Quartier', data.quartier],
    ['Motif', data.categorie],
    ['Médecin', data.medecin_nom ? `${data.medecin_nom}${data.medecin_specialite ? ` — ${data.medecin_specialite}` : ''}` : '—'],
    ['Symptômes', data.symptomes?.length ? data.symptomes.join(', ') : '—'],
    ['Urgence', data.urgence],
    ['Mode de consultation', getConsultationModeLabel(data.mode_consultation)],
    ['Patient', data.patient_pseudo || 'Anonyme'],
    ['Tranche d\'âge', data.tranche_age || 'Non précisée']
  ];

  items.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'recap-row';
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = value || '—';
    row.appendChild(dt);
    row.appendChild(dd);
    el.appendChild(row);
  });
};

const updateTransmitButtonState = () => {
  const btn = whatsappBtn();
  if (!btn) return;
  btn.disabled = !selectedMode;
};

const renderModeOptions = (data) => {
  const container = modeOptionsEl();
  if (!container) return;

  selectedMode = data.mode_consultation || '';
  container.replaceChildren();

  CONSULTATION_MODE_CHOICES.forEach((choice) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `triage-option confirmation-mode-option${selectedMode === choice.id ? ' triage-option--selected' : ''}`;
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', selectedMode === choice.id ? 'true' : 'false');

    const title = document.createElement('span');
    title.className = 'triage-option-title';
    title.textContent = choice.label;

    const desc = document.createElement('span');
    desc.className = 'triage-option-desc';
    desc.textContent = choice.description;

    btn.appendChild(title);
    btn.appendChild(desc);

    btn.addEventListener('click', () => {
      selectedMode = choice.id;
      const updated = saveMedlinkData({ mode_consultation: choice.id });
      renderModeOptions(updated);
      renderSummary(updated);
      updateTransmitButtonState();
    });

    container.appendChild(btn);
  });

  updateTransmitButtonState();
};

const initConfirmation = () => {
  let data = getMedlinkData();
  if (!data.hospital_id || !isTriageComplete(data)) {
    window.location.href = './triage.html';
    return;
  }

  if (!data.dossier_id) {
    data = saveMedlinkData({
      dossier_id: generateDossierId(),
      date: new Date().toISOString()
    });
  }

  const dossierDisplay = dossierEl();
  if (dossierDisplay) {
    dossierDisplay.textContent = `#${data.dossier_id}`;
  }

  const targetEl = transmitTargetEl();
  if (targetEl) {
    targetEl.textContent = data.medecin_nom
      ? `Transmission WhatsApp vers ${data.medecin_nom} — ${data.hopital_choisi}`
      : `Transmission vers la garde — ${data.hopital_choisi}`;
  }

  renderModeOptions(data);
  renderSummary(data);

  const btn = whatsappBtn();
  if (btn && data.whatsapp_target) {
    btn.addEventListener('click', () => {
      if (!selectedMode) return;
      const latest = getMedlinkData();
      const message = buildWhatsAppMessage(latest);
      const url = `https://wa.me/${latest.whatsapp_target}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      const newBtn = newConsultBtn();
      if (newBtn) newBtn.hidden = false;
    });
  }

  const resetBtn = newConsultBtn();
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      clearMedlinkData();
      window.location.href = './triage.html';
    });
  }
};

if (document.body.dataset.page === 'confirmation') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConfirmation);
  } else {
    initConfirmation();
  }
}
