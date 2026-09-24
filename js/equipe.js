import { MEDICAL_TEAM } from './hgr-katwa-data.js';
import { createImageWithFallback, createImageFallback } from './ui.js';

const grid = () => document.getElementById('equipe-grid');

const TEAM_PHOTOS = [
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop'
];

const createMemberCard = (member, photoIndex) => {
  const article = document.createElement('article');
  article.className = 'institution-card institution-card--team';
  article.id = member.member_id;

  const photoWrap = document.createElement('div');
  photoWrap.className = 'team-card-photo';
  const alt = `${member.name} — ${member.role}, HGR Katwa`;
  const img = createImageWithFallback(TEAM_PHOTOS[photoIndex % TEAM_PHOTOS.length], alt, 120, 120, 'team-card-image');
  const fallback = createImageFallback(member.name);
  fallback.classList.add('team-card-fallback');
  photoWrap.appendChild(img);
  photoWrap.appendChild(fallback);
  article.appendChild(photoWrap);

  const h2 = document.createElement('h2');
  h2.textContent = member.name;

  const role = document.createElement('p');
  role.className = 'team-card-role';
  role.textContent = member.role;

  const dept = document.createElement('p');
  dept.className = 'team-card-dept';
  dept.textContent = member.department;

  const bio = document.createElement('p');
  bio.className = 'team-card-bio';
  bio.textContent = member.bio;

  article.appendChild(h2);
  article.appendChild(role);
  article.appendChild(dept);
  article.appendChild(bio);

  return article;
};

const initEquipe = () => {
  const container = grid();
  if (!container) return;

  const fragment = document.createDocumentFragment();
  MEDICAL_TEAM.forEach((member, index) => {
    fragment.appendChild(createMemberCard(member, index));
  });
  container.replaceChildren(fragment);
};

if (document.body.dataset.page === 'equipe') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEquipe);
  } else {
    initEquipe();
  }
}
