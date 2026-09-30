import { getRdvHrefForService } from './hgr-katwa-data.js';

/** Carte service clinique — rendu DOM partagé (services + accueil). */

export const createServiceCard = (service, options = {}) => {
  const { showRdvLink = true, headingLevel = 2 } = options;
  const isTeleconsult = Boolean(service.teleconsultation);

  const article = document.createElement('article');
  const themeClass = isTeleconsult ? '' : ' institution-card--service-themed';
  article.className = `institution-card institution-card--service institution-card--${service.service_id}${themeClass}${isTeleconsult ? ' institution-card--teleconsultation' : ''}`;
  article.id = `service-${service.service_id}`;

  const badge = document.createElement('span');
  badge.className = isTeleconsult
    ? 'institution-badge institution-badge--teleconsultation'
    : 'institution-badge institution-badge--service';
  badge.textContent = service.icon_label;

  const title = document.createElement(`h${headingLevel}`);
  title.textContent = service.name;

  const summary = document.createElement('p');
  summary.className = 'service-card-summary';
  summary.textContent = service.summary;

  article.appendChild(badge);
  article.appendChild(title);
  article.appendChild(summary);

  if (isTeleconsult && service.teleconsultation_href) {
    const note = document.createElement('p');
    note.className = 'service-teleconsult-note';
    note.textContent = 'Service complémentaire — ne remplace pas une consultation en présentiel.';

    const actions = document.createElement('div');
    actions.className = 'service-teleconsult-actions';

    const link = document.createElement('a');
    link.href = service.teleconsultation_href;
    link.className = 'btn service-teleconsult-cta';
    link.textContent = 'Accéder à l\'orientation à distance';

    actions.appendChild(link);
    article.appendChild(note);
    article.appendChild(actions);
  } else if (showRdvLink) {
    const actions = document.createElement('div');
    actions.className = 'service-card-actions';

    const link = document.createElement('a');
    link.href = getRdvHrefForService(service.service_id);
    link.className = 'btn service-card-cta';
    link.textContent = 'Demander un rendez-vous';

    actions.appendChild(link);
    article.appendChild(actions);
  }

  return article;
};
