import {
  CLINICAL_SERVICES,
  INSTITUTION,
  HOME_MARQUEE_ITEMS,
  HOME_QUICK_ACCESS,
  HOME_ESSENTIALS,
  HOME_FAQ,
  HOME_PILLARS,
  HOME_COMMITMENTS,
  MEDICAL_TEAM,
  PRACTICAL_INFO
} from './hgr-katwa-data.js';
import { APP_RDV_HREF } from './app-config.js';

const renderMarquee = () => {
  const track = document.getElementById('marquee-track');
  if (!track) return;

  const items = [...HOME_MARQUEE_ITEMS, ...HOME_MARQUEE_ITEMS];
  const fragment = document.createDocumentFragment();
  items.forEach((text, index) => {
    const span = document.createElement('span');
    span.className = 'marquee-item';
    span.id = `marquee-item-${index % HOME_MARQUEE_ITEMS.length}`;
    span.textContent = text;
    fragment.appendChild(span);
  });
  track.replaceChildren(fragment);
};

const renderServicePreview = () => {
  const container = document.getElementById('home-services-preview');
  if (!container) return;

  const preview = CLINICAL_SERVICES.filter((s) => !s.teleconsultation).slice(0, 6);
  const fragment = document.createDocumentFragment();

  preview.forEach((service) => {
    const article = document.createElement('article');
    article.className = 'institution-card';

    const badge = document.createElement('span');
    badge.className = 'institution-badge';
    badge.textContent = service.icon_label;

    const h3 = document.createElement('h3');
    h3.textContent = service.name;

    const p = document.createElement('p');
    p.textContent = service.summary;

    article.appendChild(badge);
    article.appendChild(h3);
    article.appendChild(p);
    fragment.appendChild(article);
  });

  container.replaceChildren(fragment);
};

const renderPatientPath = () => {
  const list = document.getElementById('home-patient-path');
  if (!list) return;

  const steps = [
    'Consultez les services et infos pratiques',
    'Prenez rendez-vous ou demandez des renseignements en ligne',
    'Présentez-vous à l\'accueil du HGR Katwa avec vos documents',
    'Suivez les consignes du service qui vous accueille'
  ];

  const fragment = document.createDocumentFragment();
  steps.forEach((text, index) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = `Étape ${index + 1}. `;
    li.appendChild(strong);
    li.appendChild(document.createTextNode(text));
    fragment.appendChild(li);
  });
  list.replaceChildren(fragment);
};

const renderPillars = () => {
  const container = document.getElementById('home-pillars-grid');
  if (!container) return;

  const fragment = document.createDocumentFragment();
  HOME_PILLARS.forEach((pillar) => {
    const article = document.createElement('article');
    article.className = 'institution-card institution-card--pillar';
    article.id = `home-pillar-${pillar.pillar_id}`;

    const h3 = document.createElement('h3');
    h3.textContent = pillar.title;

    const p = document.createElement('p');
    p.textContent = pillar.text;

    article.appendChild(h3);
    article.appendChild(p);
    fragment.appendChild(article);
  });
  container.replaceChildren(fragment);
};

const renderTeamTeaser = () => {
  const container = document.getElementById('home-team-preview');
  if (!container) return;

  const teaser = MEDICAL_TEAM.slice(0, 3);
  const fragment = document.createDocumentFragment();

  teaser.forEach((member) => {
    const article = document.createElement('article');
    article.className = 'institution-card institution-card--team-teaser';

    const h3 = document.createElement('h3');
    h3.textContent = member.name;

    const role = document.createElement('p');
    role.className = 'team-card-role';
    role.textContent = member.role;

    const dept = document.createElement('p');
    dept.className = 'team-card-dept';
    dept.textContent = member.department;

    article.appendChild(h3);
    article.appendChild(role);
    article.appendChild(dept);
    fragment.appendChild(article);
  });

  container.replaceChildren(fragment);
};

const renderPracticalPreview = () => {
  const container = document.getElementById('home-practical-grid');
  if (!container) return;

  const fragment = document.createDocumentFragment();

  const hoursCard = document.createElement('article');
  hoursCard.className = 'institution-card';
  const hoursTitle = document.createElement('h3');
  hoursTitle.textContent = 'Horaires';
  hoursCard.appendChild(hoursTitle);
  const hoursList = document.createElement('ul');
  PRACTICAL_INFO.hours.forEach(({ label, value }) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = `${label} : `;
    li.appendChild(strong);
    li.appendChild(document.createTextNode(value));
    hoursList.appendChild(li);
  });
  hoursCard.appendChild(hoursList);
  fragment.appendChild(hoursCard);

  const accessCard = document.createElement('article');
  accessCard.className = 'institution-card';
  const accessTitle = document.createElement('h3');
  accessTitle.textContent = 'Accès';
  accessCard.appendChild(accessTitle);
  const accessList = document.createElement('ul');
  PRACTICAL_INFO.access.forEach((line) => {
    const li = document.createElement('li');
    li.textContent = line;
    accessList.appendChild(li);
  });
  accessCard.appendChild(accessList);
  fragment.appendChild(accessCard);

  const docsCard = document.createElement('article');
  docsCard.className = 'institution-card';
  const docsTitle = document.createElement('h3');
  docsTitle.textContent = 'Documents recommandés';
  docsCard.appendChild(docsTitle);
  const docsList = document.createElement('ul');
  PRACTICAL_INFO.documents.forEach((line) => {
    const li = document.createElement('li');
    li.textContent = line;
    docsList.appendChild(li);
  });
  docsCard.appendChild(docsList);
  fragment.appendChild(docsCard);

  container.replaceChildren(fragment);
};

const renderCommitments = () => {
  const container = document.getElementById('home-commitments-grid');
  if (!container) return;

  const fragment = document.createDocumentFragment();
  HOME_COMMITMENTS.forEach((item, index) => {
    const article = document.createElement('article');
    article.className = 'institution-card institution-card--commitment';
    article.id = `home-commitment-${index + 1}`;

    const h3 = document.createElement('h3');
    h3.textContent = item.title;

    const p = document.createElement('p');
    p.textContent = item.text;

    article.appendChild(h3);
    article.appendChild(p);
    fragment.appendChild(article);
  });
  container.replaceChildren(fragment);
};

const renderQuickAccess = () => {
  const container = document.getElementById('home-quick-access-grid');
  if (!container) return;

  const fragment = document.createDocumentFragment();
  HOME_QUICK_ACCESS.forEach((item, index) => {
    const a = document.createElement('a');
    a.href = item.href;
    a.className = 'home-quick-access-item';
    a.id = `home-quick-access-${index + 1}`;

    const label = document.createElement('span');
    label.className = 'home-quick-access-label';
    label.textContent = item.label;

    const hint = document.createElement('span');
    hint.className = 'home-quick-access-hint';
    hint.textContent = item.hint;

    a.appendChild(label);
    a.appendChild(hint);
    fragment.appendChild(a);
  });
  container.replaceChildren(fragment);
};

const renderEssentials = () => {
  const list = document.getElementById('home-essentials-list');
  if (!list) return;

  const fragment = document.createDocumentFragment();
  HOME_ESSENTIALS.forEach((text, index) => {
    const li = document.createElement('li');
    li.id = `home-essential-${index + 1}`;
    li.textContent = text;
    fragment.appendChild(li);
  });
  list.replaceChildren(fragment);
};

const renderLocationCard = () => {
  const address = document.getElementById('home-location-address');
  const hint = document.getElementById('home-location-hint');
  const phone = document.getElementById('home-location-phone');
  if (address) address.textContent = INSTITUTION.address;
  if (hint) hint.textContent = INSTITUTION.access_hint;
  if (phone) phone.textContent = INSTITUTION.phone_display;
};

const renderFaq = () => {
  const container = document.getElementById('home-faq-list');
  if (!container) return;

  const fragment = document.createDocumentFragment();
  HOME_FAQ.forEach((item, index) => {
    const details = document.createElement('details');
    details.className = 'home-faq-item';
    details.id = `home-faq-${index + 1}`;

    const summary = document.createElement('summary');
    summary.textContent = item.question;

    const p = document.createElement('p');
    p.textContent = item.answer;

    details.appendChild(summary);
    details.appendChild(p);
    fragment.appendChild(details);
  });
  container.replaceChildren(fragment);
};

const initIndex = () => {
  renderMarquee();
  renderQuickAccess();
  renderServicePreview();
  renderEssentials();
  renderPatientPath();
  renderPillars();
  renderTeamTeaser();
  renderPracticalPreview();
  renderCommitments();
  renderLocationCard();
  renderFaq();

  const emergency = document.getElementById('home-emergency-phone');
  if (emergency) {
    emergency.textContent = INSTITUTION.phone_display;
  }

  const cta = document.getElementById('hero-cta-primary');
  if (cta) cta.href = APP_RDV_HREF;
};

if (document.body.dataset.page === 'index') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIndex);
  } else {
    initIndex();
  }
}
