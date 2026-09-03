import { initTheme } from './theme.js';
import { mountLayout, fadeInPage, initNavMenu } from './ui.js';

const initApp = () => {
  const page = document.body.dataset.page || 'index';
  initTheme();
  mountLayout(page);
  initNavMenu();
  fadeInPage();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
