import { CLINICAL_SERVICES, INSTITUTION } from './hgr-katwa-data.js';

const form = () => document.getElementById('rdv-form');
const feedback = () => document.getElementById('rdv-feedback');

const sanitizeField = (value, max = 200) => {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
};

const populateServiceSelect = () => {
  const select = document.getElementById('rdv-service');
  if (!select) return;

  CLINICAL_SERVICES.filter((s) => !s.teleconsultation).forEach((service) => {
    const opt = document.createElement('option');
    opt.value = service.name;
    opt.textContent = service.name;
    select.appendChild(opt);
  });

  const other = document.createElement('option');
  other.value = 'Autre / renseignement général';
  other.textContent = 'Autre / renseignement général';
  select.appendChild(other);

  const b2b = document.createElement('option');
  b2b.value = 'Partenariat B2B';
  b2b.textContent = 'Partenariat B2B (institutionnel)';
  select.appendChild(b2b);
};

const buildRdvMessage = (payload) => {
  const lines = [
    '📋 *DEMANDE HGR KATWA*',
    `Nom : ${payload.nom}`,
    `Téléphone : ${payload.telephone}`,
    payload.email ? `E-mail : ${payload.email}` : null,
    `Service : ${payload.service}`,
    payload.date ? `Date souhaitée : ${payload.date}` : null,
    '',
    'Motif / message :',
    payload.message || '—',
    '',
    `— Envoyé depuis le site ${INSTITUTION.short_name}, Butembo`
  ].filter(Boolean);
  return lines.join('\n');
};

const showFeedback = (message, isError) => {
  const el = feedback();
  if (!el) return;
  el.textContent = message;
  el.className = `rdv-feedback${isError ? ' rdv-feedback--error' : ' rdv-feedback--success'}`;
  el.hidden = false;
};

const initRdvForm = () => {
  populateServiceSelect();

  form()?.addEventListener('submit', (event) => {
    event.preventDefault();

    const nom = sanitizeField(document.getElementById('rdv-nom')?.value, 80);
    const telephone = sanitizeField(document.getElementById('rdv-telephone')?.value, 30);
    const email = sanitizeField(document.getElementById('rdv-email')?.value, 80);
    const service = sanitizeField(document.getElementById('rdv-service')?.value, 100);
    const date = sanitizeField(document.getElementById('rdv-date')?.value, 30);
    const message = sanitizeField(document.getElementById('rdv-message')?.value, 800);

    if (!nom || !telephone || !service || !message) {
      showFeedback('Veuillez remplir les champs obligatoires : nom, téléphone, service et message.', true);
      return;
    }

    if (!/^[\d\s+()-]{8,20}$/.test(telephone)) {
      showFeedback('Numéro de téléphone invalide.', true);
      return;
    }

    const payload = { nom, telephone, email, service, date, message };
    const url = `https://wa.me/${INSTITUTION.whatsapp}?text=${encodeURIComponent(buildRdvMessage(payload))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showFeedback('Votre demande est prête à être envoyée via WhatsApp. Vérifiez le message avant envoi.', false);
  });
};

if (document.body.dataset.page === 'rendez-vous') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRdvForm);
  } else {
    initRdvForm();
  }
}
