const projectDetails = {
  competencehub: { title: 'Competence Hub', description: 'A connected platform with dedicated websites for the main hub, business services, and online learning.' },
  personalportfolio: { title: 'Personal portfolio websites', description: 'Professional portfolio websites for individuals who want to present their skills, experience, services, and work clearly online.' }
};

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.querySelector('.project-modal');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const closeModalButton = document.querySelector('.modal-close');
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const currentYear = document.querySelector('#current-year');

currentYear.textContent = new Date().getFullYear();

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

projectCards.forEach((card) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    const detail = projectDetails[card.dataset.project];
    if (!detail) return;
    modalTitle.textContent = detail.title;
    modalDescription.textContent = detail.description;
    modal.hidden = false;
    closeModalButton.focus();
    document.body.style.overflow = 'hidden';
  });
});

const closeModal = () => {
  modal.hidden = true;
  document.body.style.overflow = '';
};

closeModalButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});

menuToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
