import { CLINICAL_SERVICES } from './hgr-katwa-data.js';

const grid = () => document.getElementById('services-grid');

const createServiceCard = (service) => {
  const article = document.createElement('article');
  article.className = `institution-card institution-card--service${service.teleconsultation ? ' institution-card--optional' : ''}`;
  article.id = `service-${service.service_id}`;

  const badge = document.createElement('span');
  badge.className = 'institution-badge';
  badge.textContent = service.icon_label;

  const h2 = document.createElement('h2');
  h2.textContent = service.name;

  const p = document.createElement('p');
  p.textContent = service.summary;

  article.appendChild(badge);
  article.appendChild(h2);
  article.appendChild(p);

  if (service.teleconsultation && service.teleconsultation_href) {
    const note = document.createElement('p');
    note.className = 'service-optional-note';
    note.textContent = 'Service complémentaire — ne remplace pas une consultation en présentiel.';

    const link = document.createElement('a');
    link.href = service.teleconsultation_href;
    link.className = 'service-optional-link';
    link.textContent = 'Accéder à l\'orientation à distance (optionnel)';

    article.appendChild(note);
    article.appendChild(link);
  } else {
    const link = document.createElement('a');
    link.href = './rendez-vous.html';
    link.className = 'btn btn-secondary btn-sm';
    link.textContent = 'Demander un rendez-vous';
    article.appendChild(link);
  }

  return article;
};

const initServices = () => {
  const container = grid();
  if (!container) return;

  const fragment = document.createDocumentFragment();
  CLINICAL_SERVICES.forEach((service) => {
    fragment.appendChild(createServiceCard(service));
  });
  container.replaceChildren(fragment);
};

if (document.body.dataset.page === 'services') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServices);
  } else {
    initServices();
  }
}
