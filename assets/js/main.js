const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
  const slides = [...heroSlider.querySelectorAll('.hero-slide')];
  const dots = [...heroSlider.querySelectorAll('.slider-dot')];
  const prevButton = heroSlider.querySelector('[data-slider-prev]');
  const nextButton = heroSlider.querySelector('[data-slider-next]');
  let activeSlide = 0;
  let timerId;

  const showSlide = (index) => {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === activeSlide);
    });
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlide;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  const stopAutoplay = () => window.clearInterval(timerId);
  const startAutoplay = () => {
    stopAutoplay();
    timerId = window.setInterval(() => showSlide(activeSlide + 1), 5000);
  };

  prevButton?.addEventListener('click', () => {
    showSlide(activeSlide - 1);
    startAutoplay();
  });

  nextButton?.addEventListener('click', () => {
    showSlide(activeSlide + 1);
    startAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.slideTo));
      startAutoplay();
    });
  });

  heroSlider.addEventListener('mouseenter', stopAutoplay);
  heroSlider.addEventListener('mouseleave', startAutoplay);
  heroSlider.addEventListener('focusin', stopAutoplay);
  heroSlider.addEventListener('focusout', startAutoplay);
  heroSlider.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showSlide(activeSlide - 1);
    if (event.key === 'ArrowRight') showSlide(activeSlide + 1);
  });

  showSlide(0);
  startAutoplay();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
