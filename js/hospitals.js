import { HOSPITALS } from './hospitals-data.js';
import { saveMedlinkData, getMedlinkData, isTriageComplete } from './storage.js';
import { createImageWithFallback, createImageFallback } from './ui.js';

const grid = () => document.getElementById('hospitals-grid');

export const getRecommendedHospitalId = (data) => {
  const cat = data.categorie || '';
  const urg = data.urgence || '';
  const symptoms = data.symptomes || [];

  if (cat.includes('Maternité')) return 'hgr-katwa';
  if (cat.includes('Intime') || cat.includes('Spécialisée')) return 'ch-lacolombe';
  if (urg === 'Critique' || urg === 'Élevée') {
    const needsSurgery = symptoms.some(
      (s) => s.includes('Traumatisme') || s.includes('thoracique') || s.includes('Perte de conscience')
    );
    return needsSurgery ? 'hopital-matanda' : 'hgr-katwa';
  }
  if (cat.includes('Urgence')) return 'hgr-katwa';
  return 'ch-lacolombe';
};

const sortHospitalsByRecommendation = (hospitals, recommendedId) => {
  const sorted = [...hospitals];
  sorted.sort((a, b) => {
    if (a.hospital_id === recommendedId) return -1;
    if (b.hospital_id === recommendedId) return 1;
    return 0;
  });
  return sorted;
};

const createHospitalCard = (hospital, isRecommended) => {
  const card = document.createElement('article');
  card.className = `hospital-card card-3d${isRecommended ? ' hospital-card--recommended' : ''}`;
  card.style.setProperty('--hospital-accent', hospital.accent);

  const imgWrap = document.createElement('div');
  imgWrap.className = 'hospital-card-image';
  const img = createImageWithFallback(hospital.image, hospital.image_alt, 800, 500, 'hospital-img');
  const fallback = createImageFallback('Photo indisponible');
  fallback.classList.add('hospital-card-fallback');
  fallback.setAttribute('aria-label', `${hospital.nom} — illustration indisponible`);
  imgWrap.appendChild(img);
  imgWrap.appendChild(fallback);
  if (!hospital.image) fallback.hidden = false;
  card.appendChild(imgWrap);

  const body = document.createElement('div');
  body.className = 'hospital-card-body';

  if (isRecommended) {
    const recBadge = document.createElement('span');
    recBadge.className = 'hospital-recommended-badge';
    recBadge.textContent = 'Recommandé pour votre situation';
    body.appendChild(recBadge);
  }

  const titlebar = document.createElement('div');
  titlebar.className = 'hospital-card-titlebar';
  const title = document.createElement('h2');
  title.textContent = hospital.nom;
  titlebar.appendChild(title);
  body.appendChild(titlebar);

  const tagline = document.createElement('p');
  tagline.className = 'hospital-card-tagline';
  tagline.textContent = hospital.badge;
  body.appendChild(tagline);

  const loc = document.createElement('p');
  loc.className = 'hospital-location';
  loc.textContent = hospital.quartier;
  body.appendChild(loc);

  if (hospital.description) {
    const desc = document.createElement('p');
    desc.className = 'hospital-description';
    desc.textContent = hospital.description;
    body.appendChild(desc);
  }

  const specs = document.createElement('ul');
  specs.className = 'hospital-specialites';
  hospital.specialites.forEach((s) => {
    const li = document.createElement('li');
    li.textContent = s;
    specs.appendChild(li);
  });
  body.appendChild(specs);

  const wait = document.createElement('p');
  wait.className = 'hospital-wait';
  wait.textContent = `Temps d'attente estimé : ${hospital.temps_attente}`;
  body.appendChild(wait);

  const selectBtn = document.createElement('button');
  selectBtn.type = 'button';
  selectBtn.className = 'btn btn-primary hospital-select-btn';
  selectBtn.textContent = 'Choisir cette structure';
  body.appendChild(selectBtn);

  const hint = document.createElement('p');
  hint.className = 'hospital-select-hint';
  hint.textContent = `Transmission directe vers ${hospital.quartier} — dossier confidentiel`;
  body.appendChild(hint);

  selectBtn.addEventListener('click', () => {
    const updated = saveMedlinkData({
      hospital_id: hospital.hospital_id,
      hopital_choisi: hospital.nom,
      quartier: hospital.quartier,
      whatsapp_target: hospital.whatsapp_target,
      categorie: '',
      symptomes: [],
      urgence: ''
    });

    document.documentElement.style.setProperty('--partner-accent', hospital.accent);
    if (isTriageComplete(updated)) {
      window.location.href = './consultation.html';
      return;
    }
    window.location.href = './triage.html';
  });

  card.appendChild(body);
  return card;
};

const initHospitals = () => {
  const data = getMedlinkData();

  const container = grid();
  if (!container) return;

  const recommendedId = getRecommendedHospitalId(data);
  const sorted = sortHospitalsByRecommendation(HOSPITALS, recommendedId);
  const fragment = document.createDocumentFragment();
  sorted.forEach((h) => {
    fragment.appendChild(createHospitalCard(h, h.hospital_id === recommendedId));
  });
  container.replaceChildren(fragment);
};

if (document.body.dataset.page === 'hospitals') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHospitals);
  } else {
    initHospitals();
  }
}

export { createHospitalCard };
