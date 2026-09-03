const THEME_KEY = 'medlink_theme';
const SCROLL_HIDE_DELAY = 5000;

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* stockage indisponible */
  }
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.setAttribute('aria-label', theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre');
    const icon = btn.querySelector('.theme-toggle-icon');
    if (icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
  }
};

const getStoredTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    /* stockage indisponible */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const initThemeToggle = () => {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;

  let hideTimer = null;
  let isScrolling = false;

  const showButton = () => {
    btn.classList.add('theme-toggle--visible');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!isScrolling) btn.classList.remove('theme-toggle--visible');
    }, SCROLL_HIDE_DELAY);
  };

  const onScroll = () => {
    isScrolling = true;
    showButton();
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      isScrolling = false;
      btn.classList.remove('theme-toggle--visible');
    }, SCROLL_HIDE_DELAY);
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
};

export const initTheme = () => {
  applyTheme(getStoredTheme());
  initThemeToggle();
};
