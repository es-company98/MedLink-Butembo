import { getMedlinkData, saveMedlinkData, generateDossierId, buildWhatsAppMessage, clearMedlinkData, isTriageComplete } from './storage.js';

const dossierEl = () => document.getElementById('dossier-id-display');
const whatsappBtn = () => document.getElementById('whatsapp-transmit-btn');
const summaryEl = () => document.getElementById('confirmation-summary');
const transmitTargetEl = () => document.getElementById('confirmation-transmit-target');
const newConsultBtn = () => document.getElementById('new-consultation-btn');

const renderSummary = (data) => {
  const el = summaryEl();
  if (!el) return;
  el.replaceChildren();

  const items = [
    ['Structure', data.hopital_choisi],
    ['Quartier', data.quartier],
    ['Catégorie', data.categorie],
    ['Symptômes', data.symptomes?.length ? data.symptomes.join(', ') : '—'],
    ['Urgence', data.urgence],
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
    targetEl.textContent = `Transmission vers la garde — ${data.hopital_choisi}`;
  }

  renderSummary(data);

  const btn = whatsappBtn();
  if (btn && data.whatsapp_target) {
    const message = buildWhatsAppMessage(data);
    const url = `https://wa.me/${data.whatsapp_target}?text=${encodeURIComponent(message)}`;
    btn.addEventListener('click', () => {
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
