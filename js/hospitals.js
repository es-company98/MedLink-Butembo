import { HOSPITALS } from './hospitals-data.js';
import { saveMedlinkData, getMedlinkData } from './storage.js';
import { createImageWithFallback, createImageFallback } from './ui.js';

const grid = () => document.getElementById('hospitals-grid');

const createHospitalCard = (hospital) => {
  const card = document.createElement('article');
  card.className = 'hospital-card card-3d';
  card.style.setProperty('--hospital-accent', hospital.accent);

  const imgWrap = document.createElement('div');
  imgWrap.className = 'hospital-card-image';
  const img = createImageWithFallback(hospital.image, hospital.image_alt, 800, 500, 'hospital-img');
  const fallback = createImageFallback(hospital.nom);
  imgWrap.appendChild(img);
  imgWrap.appendChild(fallback);
  card.appendChild(imgWrap);

  const body = document.createElement('div');
  body.className = 'hospital-card-body';

  const badge = document.createElement('span');
  badge.className = 'hospital-badge';
  badge.textContent = hospital.badge;
  body.appendChild(badge);

  const title = document.createElement('h2');
  title.textContent = hospital.nom;
  body.appendChild(title);

  const loc = document.createElement('p');
  loc.className = 'hospital-location';
  loc.textContent = hospital.quartier;
  body.appendChild(loc);

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

  const tooltipWrap = document.createElement('div');
  tooltipWrap.className = 'hover-tooltip-wrap';
  const selectBtn = document.createElement('button');
  selectBtn.type = 'button';
  selectBtn.className = 'btn btn-primary hospital-select-btn';
  selectBtn.textContent = 'Orienté vers cette structure';
  const tooltip = document.createElement('div');
  tooltip.className = 'hover-tooltip';
  tooltip.setAttribute('role', 'tooltip');
  tooltip.textContent = `Transmission directe vers ${hospital.quartier} — dossier confidentiel`;
  tooltipWrap.appendChild(selectBtn);
  tooltipWrap.appendChild(tooltip);
  body.appendChild(tooltipWrap);

  selectBtn.addEventListener('click', () => {
    saveMedlinkData({
      hospital_id: hospital.hospital_id,
      hopital_choisi: hospital.nom,
      quartier: hospital.quartier,
      whatsapp_target: hospital.whatsapp_target
    });
    document.documentElement.style.setProperty('--partner-accent', hospital.accent);
    window.location.href = './consultation.html';
  });

  card.appendChild(body);
  return card;
};

const initHospitals = () => {
  const data = getMedlinkData();
  if (!data.categorie) {
    window.location.href = './triage.html';
    return;
  }

  const container = grid();
  if (!container) return;
  const fragment = document.createDocumentFragment();
  HOSPITALS.forEach((h) => fragment.appendChild(createHospitalCard(h)));
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
