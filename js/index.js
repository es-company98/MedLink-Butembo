import { TRIAGE_CATEGORIES } from './triage-questions.js';
import { saveMedlinkData, clearMedlinkData } from './storage.js';

const startQuickTriage = (category) => {
  clearMedlinkData();
  saveMedlinkData({
    categorie: category.label,
    date: new Date().toISOString(),
    symptomes: [],
    urgence: ''
  });
  window.location.assign('./triage.html');
};

const renderQuickTriage = () => {
  const container = document.getElementById('quick-triage-grid');
  if (!container) return;

  const fragment = document.createDocumentFragment();
  TRIAGE_CATEGORIES.forEach((cat) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'quick-triage-card card-3d';
    card.id = `quick-triage-${cat.id}`;

    const title = document.createElement('span');
    title.className = 'quick-triage-title';
    title.textContent = cat.label;

    const desc = document.createElement('span');
    desc.className = 'quick-triage-desc';
    desc.textContent = cat.description;

    card.appendChild(title);
    card.appendChild(desc);
    card.addEventListener('click', () => startQuickTriage(cat));
    fragment.appendChild(card);
  });

  container.replaceChildren(fragment);
};

const MOBILE_HOSPITAL_BREAKPOINT = 680;

const isMobileHospitalPreview = () =>
  window.matchMedia(`(max-width: ${MOBILE_HOSPITAL_BREAKPOINT}px)`).matches;

const setHospitalPreviewExpanded = (card, expanded) => {
  const toggle = card.querySelector('.hospital-preview-toggle');
  const toggleText = toggle?.querySelector('.hospital-preview-toggle-text');
  card.classList.toggle('is-expanded', expanded);
  if (toggle) toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  if (toggleText) {
    toggleText.textContent = expanded ? 'Masquer les détails' : 'Voir les détails';
  }
};

const closeAllHospitalPreviews = (exceptCard = null) => {
  document.querySelectorAll('.hospital-preview-card').forEach((card) => {
    if (card === exceptCard) return;
    setHospitalPreviewExpanded(card, false);
  });
};

const initHospitalPreviewAccordion = () => {
  const cards = document.querySelectorAll('#hospitals-preview-grid .hospital-preview-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    const toggle = card.querySelector('.hospital-preview-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      if (!isMobileHospitalPreview()) return;

      const isOpen = card.classList.contains('is-expanded');
      if (isOpen) {
        setHospitalPreviewExpanded(card, false);
        return;
      }

      closeAllHospitalPreviews(card);
      setHospitalPreviewExpanded(card, true);
    });
  });

  const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_HOSPITAL_BREAKPOINT}px)`);
  mobileQuery.addEventListener('change', () => {
    closeAllHospitalPreviews();
  });
};

const initIndex = () => {
  renderQuickTriage();
  initHospitalPreviewAccordion();
};

if (document.body.dataset.page === 'index') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIndex);
  } else {
    initIndex();
  }
}
