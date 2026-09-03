import { HOSPITALS } from './hospitals-data.js';
import { createImageWithFallback, createImageFallback } from './ui.js';

const renderAboutCards = () => {
  const container = document.getElementById('about-hospitals-grid');
  if (!container) return;

  const fragment = document.createDocumentFragment();
  HOSPITALS.forEach((h) => {
    const card = document.createElement('article');
    card.className = 'about-card card-3d';

    const imgWrap = document.createElement('div');
    const img = createImageWithFallback(h.image, h.image_alt, 400, 200);
    const fallback = createImageFallback(h.nom);
    imgWrap.appendChild(img);
    imgWrap.appendChild(fallback);
    card.appendChild(imgWrap);

    const body = document.createElement('div');
    body.className = 'about-card-body';
    const h2 = document.createElement('h2');
    h2.textContent = h.nom;
    const loc = document.createElement('p');
    loc.textContent = h.localisation;
    const badge = document.createElement('p');
    badge.textContent = h.badge;
    const ul = document.createElement('ul');
    ul.className = 'hospital-specialites';
    h.specialites.forEach((s) => {
      const li = document.createElement('li');
      li.textContent = s;
      ul.appendChild(li);
    });
    body.appendChild(h2);
    body.appendChild(loc);
    body.appendChild(badge);
    body.appendChild(ul);
    card.appendChild(body);

    fragment.appendChild(card);
  });
  container.replaceChildren(fragment);
};

if (document.body.dataset.page === 'apropos') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAboutCards);
  } else {
    renderAboutCards();
  }
}
