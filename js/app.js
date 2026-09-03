import { initTheme } from './theme.js';
import { mountLayout, fadeInPage } from './ui.js';

const initApp = () => {
  const page = document.body.dataset.page || 'index';
  initTheme();
  mountLayout(page);
  fadeInPage();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
