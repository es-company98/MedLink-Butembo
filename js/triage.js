import { TRIAGE_CATEGORIES, URGENCY_LEVELS, getSymptomsForCategory } from './triage-questions.js';
import { saveMedlinkData, getMedlinkData } from './storage.js';

const STEPS = ['category', 'symptoms', 'urgency', 'confirm'];

let currentStep = 0;
let selectedCategory = null;
let selectedSymptoms = [];
let selectedUrgency = null;

const progressBar = () => document.getElementById('triage-progress');
const questionArea = () => document.getElementById('triage-question-area');
const prevBtn = () => document.getElementById('triage-prev-btn');
const nextBtn = () => document.getElementById('triage-next-btn');

const updateProgress = () => {
  const bar = progressBar();
  if (!bar) return;
  const pct = ((currentStep + 1) / STEPS.length) * 100;
  bar.style.width = `${pct}%`;
  bar.setAttribute('aria-valuenow', String(Math.round(pct)));
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
  area.replaceChildren();

  const h2 = document.createElement('h2');
  h2.textContent = 'Quels symptômes ou motifs décrivent le mieux votre situation ?';
  area.appendChild(h2);

  const hint = document.createElement('p');
  hint.className = 'triage-hint';
  hint.textContent = 'Sélectionnez un ou plusieurs éléments. Discrétion garantie.';
  area.appendChild(hint);

  const symptoms = getSymptomsForCategory(selectedCategory?.id || 'general');
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
  area.replaceChildren();

  const h2 = document.createElement('h2');
  h2.textContent = 'Quel est le degré d\'urgence perçu ?';
  area.appendChild(h2);

  const hint = document.createElement('p');
  hint.className = 'triage-hint';
  hint.textContent = 'Cette évaluation oriente la structure la plus adaptée à votre situation.';
  area.appendChild(hint);

  const grid = document.createElement('div');
  grid.className = 'triage-options-grid';
  URGENCY_LEVELS.forEach((level) => {
    grid.appendChild(
      createOptionButton(level.label, level.description, selectedUrgency?.id === level.id, () => {
        selectedUrgency = level;
        renderUrgencyStep();
        nextBtn().disabled = false;
      })
    );
  });
  area.appendChild(grid);
};

const renderConfirmStep = () => {
  const area = questionArea();
  area.replaceChildren();

  const h2 = document.createElement('h2');
  h2.textContent = 'Récapitulatif de votre évaluation';
  area.appendChild(h2);

  const card = document.createElement('div');
  card.className = 'triage-recap-card card-3d';

  const items = [
    ['Catégorie', selectedCategory?.label || '—'],
    ['Symptômes', selectedSymptoms.join(', ') || '—'],
    ['Urgence', selectedUrgency?.label || '—']
  ];

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
  proof.textContent = '✓ Réseau hospitalier agréé — Orientation vers la structure adaptée';
  area.appendChild(proof);

  nextBtn().textContent = 'Choisir ma structure sanitaire';
  nextBtn().disabled = false;
};

const renderStep = () => {
  const step = STEPS[currentStep];
  prevBtn().hidden = currentStep === 0;
  updateProgress();

  if (step === 'category') renderCategoryStep();
  else if (step === 'symptoms') renderSymptomsStep();
  else if (step === 'urgency') renderUrgencyStep();
  else if (step === 'confirm') renderConfirmStep();

  if (step !== 'confirm') {
    nextBtn().textContent = 'Continuer';
    nextBtn().disabled = step === 'category' ? !selectedCategory : step === 'symptoms' ? selectedSymptoms.length === 0 : !selectedUrgency;
  }
};

const saveTriage = () => {
  saveMedlinkData({
    categorie: selectedCategory?.label || '',
    symptomes: selectedSymptoms,
    urgence: selectedUrgency?.label || '',
    date: new Date().toISOString()
  });
};

const initTriage = () => {
  const existing = getMedlinkData();
  if (existing.categorie) {
    const cat = TRIAGE_CATEGORIES.find((c) => c.label === existing.categorie);
    if (cat) selectedCategory = cat;
    selectedSymptoms = existing.symptomes || [];
    const urg = URGENCY_LEVELS.find((u) => u.label === existing.urgence);
    if (urg) selectedUrgency = urg;
  }

  prevBtn().addEventListener('click', () => {
    if (currentStep > 0) {
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
      window.location.href = './hospitals.html';
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
