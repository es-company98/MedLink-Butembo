import { TRIAGE_CATEGORIES, URGENCY_LEVELS, getSymptomsForCategory } from './triage-questions.js';
import {
  saveMedlinkData,
  clearMedlinkData,
  getMedlinkData,
  isTriageComplete
} from './storage.js';

const STEPS = ['category', 'symptoms', 'urgency', 'confirm'];

let currentStep = 0;
let minStep = 0;
let hospitalLocked = false;
let selectedCategory = null;
let selectedSymptoms = [];
let selectedUrgency = null;

const progressBar = () => document.getElementById('triage-progress');
const progressWrap = () => document.getElementById('triage-progress-wrap');
const questionArea = () => document.getElementById('triage-question-area');
const prevBtn = () => document.getElementById('triage-prev-btn');
const nextBtn = () => document.getElementById('triage-next-btn');

const renderHospitalBanner = (data) => {
  const banner = document.getElementById('triage-resume-banner');
  if (!banner) return;
  banner.replaceChildren();
  if (!data.hospital_id || !data.hopital_choisi) {
    banner.hidden = true;
    return;
  }
  banner.hidden = false;
  const p = document.createElement('p');
  p.textContent = `Structure déjà choisie : ${data.hopital_choisi}${data.quartier ? ` — ${data.quartier}` : ''}. Complétez le questionnaire ci-dessous.`;
  banner.appendChild(p);
};

const updateProgress = () => {
  const bar = progressBar();
  const wrap = progressWrap();
  if (!bar) return;
  const pct = ((currentStep + 1) / STEPS.length) * 100;
  bar.style.width = `${pct}%`;
  if (wrap) wrap.setAttribute('aria-valuenow', String(Math.round(pct)));
};

const createOptionButton = (label, description, isSelected, onClick) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `triage-option${isSelected ? ' triage-option--selected' : ''}`;
  const title = document.createElement('span');
  title.className = 'triage-option-title';
  title.textContent = label;
  btn.appendChild(title);
  if (description) {
    const desc = document.createElement('span');
    desc.className = 'triage-option-desc';
    desc.textContent = description;
    btn.appendChild(desc);
  }
  btn.addEventListener('click', onClick);
  return btn;
};

const renderCategoryStep = () => {
  const area = questionArea();
  if (!area) return;
  area.replaceChildren();

  const h2 = document.createElement('h2');
  h2.textContent = 'Quelle est la nature de votre consultation ?';
  area.appendChild(h2);

  const hint = document.createElement('p');
  hint.className = 'triage-hint';
  hint.textContent = 'Vos réponses restent confidentielles. Rien n\'est envoyé sans votre accord.';
  area.appendChild(hint);

  const grid = document.createElement('div');
  grid.className = 'triage-options-grid';
  TRIAGE_CATEGORIES.forEach((cat) => {
    grid.appendChild(
      createOptionButton(cat.label, cat.description, selectedCategory?.id === cat.id, () => {
        if (selectedCategory?.id !== cat.id) {
          selectedSymptoms = [];
        }
        selectedCategory = cat;
        renderCategoryStep();
        nextBtn().disabled = false;
      })
    );
  });
  area.appendChild(grid);
};

const renderSymptomsStep = () => {
  const area = questionArea();
  if (!area) return;
  area.replaceChildren();

  if (!selectedCategory) {
    const warn = document.createElement('p');
    warn.className = 'triage-hint';
    warn.textContent = 'Sélectionnez d\'abord votre motif de consultation.';
    area.appendChild(warn);
    nextBtn().disabled = true;
    return;
  }

  const h2 = document.createElement('h2');
  h2.textContent = 'Quels symptômes ou motifs décrivent le mieux votre situation ?';
  area.appendChild(h2);

  const hint = document.createElement('p');
  hint.className = 'triage-hint';
  hint.textContent = 'Sélectionnez un ou plusieurs éléments. Discrétion garantie.';
  area.appendChild(hint);

  const symptoms = getSymptomsForCategory(selectedCategory.id);
  const grid = document.createElement('div');
  grid.className = 'triage-options-grid';
  symptoms.forEach((sym) => {
    const isSelected = selectedSymptoms.includes(sym);
    grid.appendChild(
      createOptionButton(sym, null, isSelected, () => {
        if (isSelected) {
          selectedSymptoms = selectedSymptoms.filter((s) => s !== sym);
        } else {
          selectedSymptoms = [...selectedSymptoms, sym];
        }
        renderSymptomsStep();
        nextBtn().disabled = selectedSymptoms.length === 0;
      })
    );
  });
  area.appendChild(grid);
  nextBtn().disabled = selectedSymptoms.length === 0;
};

const renderUrgencyStep = () => {
  const area = questionArea();
  if (!area) return;
  area.replaceChildren();

  const h2 = document.createElement('h2');
  h2.textContent = 'Quel est le degré d\'urgence perçu ?';
  area.appendChild(h2);

  const hint = document.createElement('p');
  hint.className = 'triage-hint';
  hint.textContent = hospitalLocked
    ? 'Cette évaluation complète votre dossier pour la structure choisie.'
    : 'Cette évaluation oriente la structure la plus adaptée à votre situation.';
  area.appendChild(hint);

  const grid = document.createElement('div');
  grid.className = 'triage-options-grid';
  URGENCY_LEVELS.forEach((level) => {
    grid.appendChild(
      createOptionButton(level.label, level.description, selectedUrgency?.id === level.id, () => {
        selectedUrgency = level;
        renderUrgencyStep();
        nextBtn().disabled = !selectedUrgency;
      })
    );
  });
  area.appendChild(grid);
  nextBtn().disabled = !selectedUrgency;
};

const renderConfirmStep = () => {
  const area = questionArea();
  if (!area) return;
  area.replaceChildren();

  const h2 = document.createElement('h2');
  h2.textContent = 'Récapitulatif de votre évaluation';
  area.appendChild(h2);

  const data = getMedlinkData();
  const card = document.createElement('div');
  card.className = 'triage-recap-card card-3d';

  const items = [
    ['Catégorie', selectedCategory?.label || '—'],
    ['Symptômes', selectedSymptoms.join(', ') || '—'],
    ['Urgence', selectedUrgency?.label || '—']
  ];

  if (data.hospital_id) {
    items.push(['Structure choisie', data.hopital_choisi || '—']);
  }

  items.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'recap-row';
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = value;
    row.appendChild(dt);
    row.appendChild(dd);
    card.appendChild(row);
  });

  area.appendChild(card);

  const proof = document.createElement('p');
  proof.className = 'social-proof';
  proof.textContent = data.hospital_id
    ? '✓ Dossier prêt — Transmission vers la structure choisie'
    : '✓ Réseau hospitalier agréé — Orientation vers la structure adaptée';
  area.appendChild(proof);

  nextBtn().textContent = data.hospital_id
    ? 'Continuer vers ma consultation'
    : 'Choisir ma structure sanitaire';
  nextBtn().disabled = false;
};

const renderStep = () => {
  const step = STEPS[currentStep];
  prevBtn().hidden = currentStep <= minStep;
  updateProgress();

  if (step === 'category') renderCategoryStep();
  else if (step === 'symptoms') renderSymptomsStep();
  else if (step === 'urgency') renderUrgencyStep();
  else if (step === 'confirm') renderConfirmStep();

  if (step !== 'confirm') {
    nextBtn().textContent = 'Continuer';
    if (step === 'category') nextBtn().disabled = !selectedCategory;
    else if (step === 'symptoms') nextBtn().disabled = selectedSymptoms.length === 0;
    else if (step === 'urgency') nextBtn().disabled = !selectedUrgency;
  }
};

const saveTriage = () => {
  saveMedlinkData({
    categorie: selectedCategory?.label || '',
    symptomes: [...selectedSymptoms],
    urgence: selectedUrgency?.label || '',
    date: new Date().toISOString()
  });
};

const redirectAfterTriage = () => {
  const data = getMedlinkData();
  window.location.href = data.hospital_id ? './consultation.html' : './hospitals.html';
};

const initTriage = () => {
  if (new URLSearchParams(window.location.search).get('mode') === 'resume') {
    window.location.replace('./triage.html');
    return;
  }

  const existing = getMedlinkData();
  hospitalLocked = Boolean(existing.hospital_id);

  if (hospitalLocked) {
    renderHospitalBanner(existing);
    selectedCategory = null;
    selectedSymptoms = [];
    selectedUrgency = null;
    currentStep = 0;
    minStep = 0;

    if (isTriageComplete(existing)) {
      window.location.href = './consultation.html';
      return;
    }
  } else {
    renderHospitalBanner({});
    const preselected = TRIAGE_CATEGORIES.find((c) => c.label === existing.categorie);
    clearMedlinkData();
    selectedSymptoms = [];
    selectedUrgency = null;
    minStep = 0;

    if (preselected) {
      selectedCategory = preselected;
      currentStep = 1;
      saveMedlinkData({
        categorie: preselected.label,
        date: new Date().toISOString()
      });
    } else {
      selectedCategory = null;
      currentStep = 0;
    }
  }

  prevBtn().addEventListener('click', () => {
    if (currentStep > minStep) {
      currentStep -= 1;
      renderStep();
    }
  });

  nextBtn().addEventListener('click', () => {
    if (currentStep < STEPS.length - 1) {
      currentStep += 1;
      renderStep();
    } else {
      saveTriage();
      redirectAfterTriage();
    }
  });

  renderStep();
};

if (document.body.dataset.page === 'triage') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTriage);
  } else {
    initTriage();
  }
}
