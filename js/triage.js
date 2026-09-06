import { TRIAGE_CATEGORIES, URGENCY_LEVELS, getSymptomsForCategory } from './triage-questions.js';
import { getDefaultHospital } from './hospitals-data.js';
import { getDoctorsForCategory, getDoctorById } from './doctors-data.js';
import { createImageWithFallback, createImageFallback } from './ui.js';
import {
  saveMedlinkData,
  clearMedlinkData,
  getMedlinkData,
  isTriageComplete
} from './storage.js';

const STEPS = ['category', 'symptoms', 'urgency', 'doctor', 'confirm'];

let currentStep = 0;
let minStep = 0;
let hospitalLocked = false;
let selectedCategory = null;
let selectedDoctor = null;
let selectedSymptoms = [];
let selectedUrgency = null;
let triageInitialized = false;

const progressBar = () => document.getElementById('triage-progress');
const progressWrap = () => document.getElementById('triage-progress-wrap');
const questionArea = () => document.getElementById('triage-question-area');
const prevBtn = () => document.getElementById('triage-prev-btn');
const nextBtn = () => document.getElementById('triage-next-btn');

const renderMotifBanner = (motifLabel) => {
  const banner = document.getElementById('triage-motif-banner');
  if (!banner) return;
  banner.replaceChildren();
  if (!motifLabel) {
    banner.hidden = true;
    return;
  }
  banner.hidden = false;
  const p = document.createElement('p');
  p.textContent = `Motif enregistré : ${motifLabel} — triage en cours.`;
  banner.appendChild(p);
};

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
  p.textContent = `Structure déjà choisie : ${data.hopital_choisi}${data.quartier ? ` — ${data.quartier}` : ''}. Complétez le triage ci-dessous.`;
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
  h2.textContent = 'Quel est votre motif de consultation ?';
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
          selectedDoctor = null;
        }
        selectedCategory = cat;
        renderCategoryStep();
        nextBtn().disabled = false;
      })
    );
  });
  area.appendChild(grid);
};

const createDoctorCard = (doctor, isSelected, onSelect) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `doctor-card card-3d${isSelected ? ' doctor-card--selected' : ''}`;
  btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');

  const photoWrap = document.createElement('div');
  photoWrap.className = 'doctor-card-photo';
  const img = createImageWithFallback(doctor.photo, doctor.photo_alt, 120, 120, 'doctor-card-image');
  const fallback = createImageFallback(doctor.nom);
  fallback.classList.add('doctor-card-fallback');
  photoWrap.appendChild(img);
  photoWrap.appendChild(fallback);
  btn.appendChild(photoWrap);

  const body = document.createElement('div');
  body.className = 'doctor-card-body';

  const name = document.createElement('h3');
  name.className = 'doctor-card-name';
  name.textContent = doctor.nom;
  body.appendChild(name);

  const specialty = document.createElement('p');
  specialty.className = 'doctor-card-specialty';
  specialty.textContent = doctor.specialite || doctor.titre;
  body.appendChild(specialty);

  if (doctor.titre && doctor.specialite) {
    const title = document.createElement('p');
    title.className = 'doctor-card-title';
    title.textContent = doctor.titre;
    body.appendChild(title);
  }

  const badge = document.createElement('span');
  badge.className = `doctor-card-badge${doctor.available ? ' doctor-card-badge--available' : ''}`;
  badge.textContent = doctor.disponibilite || (doctor.available ? 'Disponible aujourd\'hui' : 'Indisponible');
  body.appendChild(badge);

  btn.appendChild(body);
  btn.addEventListener('click', onSelect);
  return btn;
};

const renderDoctorStep = () => {
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
  h2.textContent = 'Choisissez votre médecin';
  area.appendChild(h2);

  const hint = document.createElement('p');
  hint.className = 'triage-hint';
  hint.textContent = 'Dernière étape : votre dossier sera transmis au médecin choisi via WhatsApp.';
  area.appendChild(hint);

  const doctors = getDoctorsForCategory(selectedCategory.id);
  const list = document.createElement('div');
  list.className = 'doctor-cards-list';

  if (doctors.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'triage-hint';
    empty.textContent = 'Aucun médecin disponible pour ce motif. Choisissez un autre motif ou continuez avec l\'équipe de garde.';
    area.appendChild(empty);
    nextBtn().disabled = true;
    return;
  }

  const fragment = document.createDocumentFragment();
  doctors.forEach((doctor) => {
    fragment.appendChild(
      createDoctorCard(doctor, selectedDoctor?.doctor_id === doctor.doctor_id, () => {
        selectedDoctor = doctor;
        renderDoctorStep();
        nextBtn().disabled = false;
      })
    );
  });
  list.appendChild(fragment);
  area.appendChild(list);
  nextBtn().disabled = !selectedDoctor;
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
  h2.textContent = 'Quels symptômes décrivent le mieux votre situation ?';
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
  hint.textContent = 'Ce triage complète votre dossier pour le Centre Hospitalier La Colombe.';
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
  h2.textContent = 'Récapitulatif de votre triage';
  area.appendChild(h2);

  const data = getMedlinkData();
  const hospital = getDefaultHospital();
  const card = document.createElement('div');
  card.className = 'triage-recap-card card-3d';

  const items = [
    ['Structure', data.hopital_choisi || hospital.nom],
    ['Motif', selectedCategory?.label || '—'],
    ['Symptômes', selectedSymptoms.join(', ') || '—'],
    ['Urgence', selectedUrgency?.label || '—'],
    ['Médecin', selectedDoctor ? `${selectedDoctor.nom} — ${selectedDoctor.specialite}` : '—']
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
  proof.textContent = '✓ Dossier prêt — Centre Hospitalier La Colombe';
  area.appendChild(proof);

  nextBtn().textContent = 'Continuer vers ma consultation';
  nextBtn().disabled = false;
};

const renderStep = () => {
  const step = STEPS[currentStep];
  prevBtn().hidden = currentStep <= minStep;
  updateProgress();

  if (step === 'category') renderCategoryStep();
  else if (step === 'doctor') renderDoctorStep();
  else if (step === 'symptoms') renderSymptomsStep();
  else if (step === 'urgency') renderUrgencyStep();
  else if (step === 'confirm') renderConfirmStep();

  if (step !== 'confirm') {
    nextBtn().textContent = 'Continuer';
    if (step === 'category') nextBtn().disabled = !selectedCategory;
    else if (step === 'symptoms') nextBtn().disabled = selectedSymptoms.length === 0;
    else if (step === 'urgency') nextBtn().disabled = !selectedUrgency;
    else if (step === 'doctor') nextBtn().disabled = !selectedDoctor;
  }
};

const saveTriage = () => {
  const hospital = getDefaultHospital();
  saveMedlinkData({
    categorie: selectedCategory?.label || '',
    symptomes: [...selectedSymptoms],
    urgence: selectedUrgency?.label || '',
    medecin_id: selectedDoctor?.doctor_id || '',
    medecin_nom: selectedDoctor?.nom || '',
    medecin_specialite: selectedDoctor?.specialite || '',
    whatsapp_target: selectedDoctor?.whatsapp_target || hospital.whatsapp_target,
    date: new Date().toISOString()
  });
};

const ensureDefaultHospital = () => {
  const hospital = getDefaultHospital();
  const current = getMedlinkData();
  document.documentElement.style.setProperty('--partner-accent', hospital.accent);
  return saveMedlinkData({
    hospital_id: hospital.hospital_id,
    hopital_choisi: hospital.nom,
    quartier: hospital.quartier,
    whatsapp_target: current.whatsapp_target || hospital.whatsapp_target
  });
};

const redirectAfterTriage = () => {
  ensureDefaultHospital();
  window.location.href = './consultation.html';
};

const getFirstIncompleteStep = () => {
  if (selectedSymptoms.length === 0) return 1;
  if (!selectedUrgency) return 2;
  if (!selectedDoctor) return 3;
  return 4;
};

const initTriage = () => {
  if (triageInitialized) return;
  triageInitialized = true;

  if (new URLSearchParams(window.location.search).get('mode') === 'resume') {
    window.location.replace('./triage.html');
    return;
  }

  const existing = getMedlinkData();
  hospitalLocked = Boolean(existing.hospital_id);

  if (hospitalLocked) {
    renderHospitalBanner(existing);
    selectedCategory = TRIAGE_CATEGORIES.find((c) => c.label === existing.categorie) || null;
    selectedDoctor = getDoctorById(existing.medecin_id);
    selectedSymptoms = existing.symptomes?.length ? [...existing.symptomes] : [];
    selectedUrgency = URGENCY_LEVELS.find((u) => u.label === existing.urgence) || null;

    if (isTriageComplete(existing)) {
      window.location.href = './consultation.html';
      return;
    }

    if (selectedCategory) {
      renderMotifBanner(selectedCategory.label);
      minStep = 1;
      currentStep = getFirstIncompleteStep();
    } else {
      renderMotifBanner(null);
      currentStep = 0;
      minStep = 0;
    }
  } else {
    renderHospitalBanner({});
    const preselected = TRIAGE_CATEGORIES.find((c) => c.label === existing.categorie);
    clearMedlinkData();
    selectedSymptoms = [];
    selectedUrgency = null;
    selectedDoctor = null;

    if (preselected) {
      selectedCategory = preselected;
      minStep = 1;
      currentStep = 1;
      renderMotifBanner(preselected.label);
      saveMedlinkData({
        categorie: preselected.label,
        date: new Date().toISOString()
      });
    } else {
      selectedCategory = null;
      currentStep = 0;
      minStep = 0;
      renderMotifBanner(null);
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
