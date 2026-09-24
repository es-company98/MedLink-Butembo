import { APP_NAME, APP_TAGLINE, APP_RDV_HREF } from './app-config.js';
import { INSTITUTION } from './hgr-katwa-data.js';

export const createImageWithFallback = (src, alt, width, height, className) => {
  const img = document.createElement('img');
  img.alt = alt;
  img.width = width;
  img.height = height;
  img.loading = 'lazy';
  if (className) img.className = className;

  if (!src) {
    img.style.display = 'none';
    img.dataset.skipLoad = 'true';
    return img;
  }

  img.src = src;
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const fallback = img.nextElementSibling;
    if (fallback && fallback.classList.contains('img-fallback')) {
      fallback.hidden = false;
    }
  });
  return img;
};

export const createImageFallback = (label) => {
  const div = document.createElement('div');
  div.className = 'img-fallback';
  div.hidden = true;
  div.setAttribute('role', 'img');
  div.setAttribute('aria-label', label);
  const span = document.createElement('span');
  span.textContent = label;
  div.appendChild(span);
  return div;
};

const NAV_MOBILE_BREAKPOINT = 768;

const NAV_PAGES = [
  { href: './index.html', label: 'Accueil', id: 'index' },
  { href: './presentation.html', label: 'L\'hôpital', id: 'presentation' },
  { href: './services.html', label: 'Services cliniques', id: 'services' },
  { href: './equipe.html', label: 'Équipe médicale', id: 'equipe' },
  { href: './infos-pratiques.html', label: 'Infos pratiques', id: 'infos-pratiques' },
  { href: './rendez-vous.html', label: 'Rendez-vous', id: 'rendez-vous' }
];

const setNavMenuOpen = (nav, open) => {
  const toggle = nav.querySelector('.nav-toggle');
  const backdrop = nav.querySelector('.nav-backdrop');
  if (!toggle || !backdrop) return;

  nav.classList.toggle('main-nav--open', open);
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  backdrop.hidden = !open;
  document.body.classList.toggle('nav-menu-open', open);
};

const bindMobileNav = (nav) => {
  const toggle = nav.querySelector('.nav-toggle');
  const backdrop = nav.querySelector('.nav-backdrop');
  const panel = nav.querySelector('.nav-menu-panel');
  if (!toggle || !backdrop || !panel) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('main-nav--open');
    setNavMenuOpen(nav, !isOpen);
  });

  backdrop.addEventListener('click', () => setNavMenuOpen(nav, false));

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setNavMenuOpen(nav, false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('main-nav--open')) {
      setNavMenuOpen(nav, false);
      toggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > NAV_MOBILE_BREAKPOINT && nav.classList.contains('main-nav--open')) {
      setNavMenuOpen(nav, false);
    }
  });
};

export const createMobileCtaBar = () => {
  const bar = document.createElement('div');
  bar.className = 'mobile-cta-bar';
  bar.id = 'mobile-cta-bar';

  const cta = document.createElement('a');
  cta.href = APP_RDV_HREF;
  cta.className = 'btn btn-primary mobile-cta-bar-btn';
  cta.id = 'mobile-cta-primary';
  cta.textContent = 'Prendre rendez-vous';

  bar.appendChild(cta);
  return bar;
};

export const createNav = (activePage) => {
  const nav = document.createElement('nav');
  nav.className = 'main-nav main-nav--institutional';
  nav.setAttribute('aria-label', 'Navigation principale');

  const brand = document.createElement('a');
  brand.href = './index.html';
  brand.className = 'nav-brand';
  brand.title = APP_NAME;

  const brandShort = document.createElement('span');
  brandShort.className = 'nav-brand-short';
  brandShort.textContent = 'HGR Katwa';

  const brandFull = document.createElement('span');
  brandFull.className = 'nav-brand-full';
  brandFull.textContent = 'Hôpital Général de Référence';

  brand.appendChild(brandShort);
  brand.appendChild(brandFull);

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nav-toggle';
  toggle.id = 'nav-toggle-btn';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'nav-menu-panel');
  toggle.setAttribute('aria-label', 'Ouvrir le menu');

  for (let i = 0; i < 3; i += 1) {
    const bar = document.createElement('span');
    bar.className = 'nav-toggle-bar';
    bar.setAttribute('aria-hidden', 'true');
    toggle.appendChild(bar);
  }

  const panel = document.createElement('div');
  panel.className = 'nav-menu-panel';
  panel.id = 'nav-menu-panel';

  const links = document.createElement('ul');
  links.className = 'nav-links';

  NAV_PAGES.forEach(({ href, label, id }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    if (id === activePage) {
      a.setAttribute('aria-current', 'page');
      a.className = 'nav-link--active';
    }
    li.appendChild(a);
    links.appendChild(li);
  });

  const actions = document.createElement('div');
  actions.className = 'nav-actions';
  actions.appendChild(links);

  const cta = document.createElement('a');
  cta.href = APP_RDV_HREF;
  cta.className = 'btn btn-primary nav-cta nav-cta--desktop';
  cta.id = 'nav-cta-primary';
  cta.textContent = 'Prendre rendez-vous / Demande de renseignements';

  actions.appendChild(cta);
  panel.appendChild(actions);

  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  backdrop.id = 'nav-backdrop';
  backdrop.hidden = true;

  nav.appendChild(brand);
  nav.appendChild(toggle);
  nav.appendChild(panel);
  nav.appendChild(backdrop);

  bindMobileNav(nav);
  return nav;
};

export const createFooter = () => {
  const footer = document.createElement('footer');
  footer.className = 'site-footer site-footer--institutional';
  footer.id = 'site-footer';

  const inner = document.createElement('div');
  inner.className = 'footer-inner';

  const col1 = document.createElement('div');
  col1.className = 'footer-col';
  const h3 = document.createElement('h3');
  h3.textContent = APP_NAME;
  const p1 = document.createElement('p');
  p1.textContent = APP_TAGLINE;
  const pLoc = document.createElement('p');
  pLoc.className = 'footer-location';
  pLoc.textContent = INSTITUTION.address;
  col1.appendChild(h3);
  col1.appendChild(p1);
  col1.appendChild(pLoc);

  const col2 = document.createElement('div');
  col2.className = 'footer-col';
  const h4 = document.createElement('h4');
  h4.textContent = 'Accès rapide';
  const ul = document.createElement('ul');
  ul.className = 'footer-links';
  [
    { href: './services.html', label: 'Services cliniques' },
    { href: './equipe.html', label: 'Équipe médicale' },
    { href: './infos-pratiques.html', label: 'Infos pratiques' },
    { href: './rendez-vous.html', label: 'Rendez-vous' }
  ].forEach(({ href, label }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    li.appendChild(a);
    ul.appendChild(li);
  });
  col2.appendChild(h4);
  col2.appendChild(ul);

  const col3 = document.createElement('div');
  col3.className = 'footer-col';
  const h4b = document.createElement('h4');
  h4b.textContent = 'Contact usager';
  const pPhone = document.createElement('p');
  pPhone.textContent = `Ligne d'information : ${INSTITUTION.phone_display}`;
  const copy = document.createElement('p');
  copy.className = 'footer-copy';
  copy.textContent = `© ${new Date().getFullYear()} ${INSTITUTION.short_name} — Butembo, Nord-Kivu`;
  col3.appendChild(h4b);
  col3.appendChild(pPhone);
  col3.appendChild(copy);

  inner.appendChild(col1);
  inner.appendChild(col2);
  inner.appendChild(col3);
  footer.appendChild(inner);

  const b2b = document.createElement('div');
  b2b.className = 'footer-b2b';
  const b2bLink = document.createElement('a');
  b2bLink.href = './partenaires.html';
  b2bLink.className = 'footer-b2b-link';
  b2bLink.textContent = 'Partenaires & approvisionnement international';
  b2b.appendChild(b2bLink);
  footer.appendChild(b2b);

  return footer;
};

const FLOW_STEPS = {
  triage: { current: 1, total: 3, label: 'Orientation à distance (option)' },
  consultation: { current: 2, total: 3, label: 'Dossier patient' },
  confirmation: { current: 3, total: 3, label: 'Transmission' }
};

export const createStepIndicator = (activePage) => {
  const step = FLOW_STEPS[activePage];
  if (!step) return null;

  const bar = document.createElement('div');
  bar.className = 'flow-step-indicator flow-step-indicator--optional';
  bar.id = 'flow-step-indicator';
  bar.setAttribute('aria-label', `Étape ${step.current} sur ${step.total} — ${step.label}`);

  const text = document.createElement('p');
  text.className = 'flow-step-indicator-text';
  text.textContent = `Service optionnel — ${step.label} (${step.current}/${step.total})`;

  const progress = document.createElement('div');
  progress.className = 'flow-step-indicator-bar';
  progress.setAttribute('role', 'progressbar');
  progress.setAttribute('aria-valuenow', String(step.current));
  progress.setAttribute('aria-valuemin', '1');
  progress.setAttribute('aria-valuemax', String(step.total));

  const fill = document.createElement('div');
  fill.className = 'flow-step-indicator-fill';
  fill.style.width = `${(step.current / step.total) * 100}%`;
  progress.appendChild(fill);

  bar.appendChild(text);
  bar.appendChild(progress);
  return bar;
};

export const mountLayout = (activePage) => {
  const navSlot = document.getElementById('nav-slot');
  const footerSlot = document.getElementById('footer-slot');
  const isTeleconsultFlow = ['triage', 'consultation', 'confirmation'].includes(activePage);

  if (navSlot) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createNav(isTeleconsultFlow ? 'services' : activePage));
    if (!isTeleconsultFlow) {
      fragment.appendChild(createMobileCtaBar());
    }
    const stepIndicator = createStepIndicator(activePage);
    if (stepIndicator) fragment.appendChild(stepIndicator);
    navSlot.replaceChildren(fragment);
  }
  if (footerSlot) footerSlot.replaceChildren(createFooter());
};

export const fadeInPage = () => {
  document.body.classList.add('page-loaded');
};
