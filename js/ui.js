export const createImageWithFallback = (src, alt, width, height, className) => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.width = width;
  img.height = height;
  img.loading = 'lazy';
  if (className) img.className = className;
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

export const createHoverTooltip = (triggerEl, text) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'hover-tooltip-wrap';
  const tooltip = document.createElement('div');
  tooltip.className = 'hover-tooltip';
  tooltip.setAttribute('role', 'tooltip');
  tooltip.textContent = text;
  wrapper.appendChild(triggerEl.cloneNode(true));
  wrapper.appendChild(tooltip);
  return wrapper;
};

const NAV_MOBILE_BREAKPOINT = 768;

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

export const createNav = (activePage) => {
  const nav = document.createElement('nav');
  nav.className = 'main-nav';
  nav.setAttribute('aria-label', 'Navigation principale');

  const brand = document.createElement('a');
  brand.href = './index.html';
  brand.className = 'nav-brand';
  brand.textContent = 'MedLink Butembo';

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

  const pages = [
    { href: './index.html', label: 'Accueil', id: 'index' },
    { href: './triage.html', label: 'Questionnaire', id: 'triage' },
    { href: './hospitals.html', label: 'Hôpitaux', id: 'hospitals' },
    { href: './apropos.html', label: 'À propos', id: 'apropos' }
  ];

  pages.forEach(({ href, label, id }) => {
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
  cta.href = './triage.html';
  cta.className = 'btn btn-primary nav-cta';
  cta.id = 'nav-cta-primary';
  cta.textContent = 'Initier ma consultation discrète';

  if (activePage !== 'triage') {
    actions.appendChild(cta);
  }

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
  footer.className = 'site-footer';
  footer.id = 'site-footer';

  const inner = document.createElement('div');
  inner.className = 'footer-inner';

  const col1 = document.createElement('div');
  col1.className = 'footer-col';
  const h3 = document.createElement('h3');
  h3.textContent = 'MedLink Butembo';
  const p1 = document.createElement('p');
  p1.textContent = 'Réseau hospitalier agréé — Orientation sécurisée et discrète vers les structures partenaires de Butembo.';
  col1.appendChild(h3);
  col1.appendChild(p1);

  const col2 = document.createElement('div');
  col2.className = 'footer-col';
  const h4 = document.createElement('h4');
  h4.textContent = 'Structures partenaires';
  const ul = document.createElement('ul');
  ['CH La Colombe — Bulengera', 'HGR Katwa — Mususa', 'Hôpital Matanda — Matanda'].forEach((name) => {
    const li = document.createElement('li');
    li.textContent = name;
    ul.appendChild(li);
  });
  col2.appendChild(h4);
  col2.appendChild(ul);

  const col3 = document.createElement('div');
  col3.className = 'footer-col';
  const badge = document.createElement('p');
  badge.className = 'footer-badge';
  badge.textContent = 'Phase Pilote — Accès 100% Gratuit';
  const copy = document.createElement('p');
  copy.className = 'footer-copy';
  copy.textContent = '© 2026 MedLink Butembo. Service entièrement gratuit et libre d\'accès.';
  col3.appendChild(badge);
  col3.appendChild(copy);

  inner.appendChild(col1);
  inner.appendChild(col2);
  inner.appendChild(col3);
  footer.appendChild(inner);
  return footer;
};

export const mountLayout = (activePage) => {
  const navSlot = document.getElementById('nav-slot');
  const footerSlot = document.getElementById('footer-slot');
  if (navSlot) navSlot.replaceChildren(createNav(activePage));
  if (footerSlot) footerSlot.replaceChildren(createFooter());
};

export const fadeInPage = () => {
  document.body.classList.add('page-loaded');
};
