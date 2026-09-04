import { HOSPITALS } from './hospitals-data.js';
import { createImageWithFallback, createImageFallback } from './ui.js';

const renderHospitalPreviews = () => {
  const container = document.getElementById('hospitals-preview-grid');
  if (!container) return;

  const fragment = document.createDocumentFragment();
  HOSPITALS.forEach((h) => {
    const card = document.createElement('article');
    card.className = 'hospital-preview-card card-3d';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'hospital-preview-image';
    const img = createImageWithFallback(h.image, h.image_alt, 400, 180);
    const fallback = createImageFallback(h.nom);
    imgWrap.appendChild(img);
    imgWrap.appendChild(fallback);
    if (!h.image) fallback.hidden = false;
    card.appendChild(imgWrap);

    const body = document.createElement('div');
    body.className = 'hospital-preview-body';
    const h3 = document.createElement('h3');
    h3.textContent = h.nom;
    const p = document.createElement('p');
    p.textContent = h.badge;
    body.appendChild(h3);
    body.appendChild(p);
    card.appendChild(body);

    fragment.appendChild(card);
  });
  container.replaceChildren(fragment);
};

if (document.body.dataset.page === 'index') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHospitalPreviews);
  } else {
    renderHospitalPreviews();
  }
}
