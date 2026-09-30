import { CLINICAL_SERVICES } from './hgr-katwa-data.js';
import { createServiceCard } from './service-card.js';

const grid = () => document.getElementById('services-grid');

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
