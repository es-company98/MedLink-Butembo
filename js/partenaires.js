import { B2B_PARTNERS } from './hgr-katwa-data.js';

const initPartenaires = () => {
  const list = document.getElementById('partenaires-topics');
  if (!list) return;

  const fragment = document.createDocumentFragment();
  B2B_PARTNERS.topics.forEach((topic) => {
    const li = document.createElement('li');
    li.textContent = topic;
    fragment.appendChild(li);
  });
  list.replaceChildren(fragment);
};

if (document.body.dataset.page === 'partenaires') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPartenaires);
  } else {
    initPartenaires();
  }
}
