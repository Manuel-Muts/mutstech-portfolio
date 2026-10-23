const projectDetails = {
  competencehub: { title: 'Competence Hub', description: 'A connected platform with dedicated websites for school management, business services, and online learning.' }
};

const projectCards = document.querySelectorAll('.project-card');
const modal = document.querySelector('.project-modal');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const closeModalButton = document.querySelector('.modal-close');
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const currentYear = document.querySelector('#current-year');

currentYear.textContent = new Date().getFullYear();

const heroCarousel = document.querySelector('.hero-carousel');
if (heroCarousel) {
  const slides = heroCarousel.querySelectorAll('[data-carousel-slide]');
  const dots = heroCarousel.querySelectorAll('.carousel-dot');
  const slideCount = heroCarousel.querySelector('[data-carousel-count]');
  const counter = heroCarousel.querySelector('.carousel-count');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeSlide = 0;
  let autoplayTimer;

  const showSlide = (index) => {
    activeSlide = index;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeSlide;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
      dots[slideIndex].classList.toggle('is-active', isActive);
      dots[slideIndex].setAttribute('aria-pressed', String(isActive));
    });
    slideCount.textContent = String(activeSlide + 1).padStart(2, '0');
    counter.setAttribute('aria-label', `Slide ${activeSlide + 1} of ${slides.length}`);
  };

  const stopAutoplay = () => {
    window.clearInterval(autoplayTimer);
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (reducedMotion.matches || document.hidden || slides.length < 2) return;
    autoplayTimer = window.setInterval(() => {
      showSlide((activeSlide + 1) % slides.length);
    }, 6000);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAutoplay();
    });
  });

  heroCarousel.addEventListener('mouseenter', stopAutoplay);
  heroCarousel.addEventListener('mouseleave', startAutoplay);
  heroCarousel.addEventListener('focusin', stopAutoplay);
  heroCarousel.addEventListener('focusout', (event) => {
    if (!heroCarousel.contains(event.relatedTarget)) startAutoplay();
  });
  document.addEventListener('visibilitychange', startAutoplay);
  reducedMotion.addEventListener('change', startAutoplay);
  startAutoplay();
}

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
