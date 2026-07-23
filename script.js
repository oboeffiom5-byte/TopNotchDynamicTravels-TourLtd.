const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const yearElement = document.getElementById('year');
const testimonialSlides = Array.from(document.querySelectorAll('.testimonial-slide'));
const prevTestimonial = document.getElementById('prevTestimonial');
const nextTestimonial = document.getElementById('nextTestimonial');
let currentSlide = 0;

const revealConfigs = [
  { selector: '.hero-title', revealClass: 'reveal-top', delay: 0 },
  { selector: '.hero-text', revealClass: 'reveal-bottom', delay: 100 },
  { selector: '.hero-btn .hero-cta', revealClass: 'reveal-right', delay: 180 },
  { selector: '.about-us h2, .about-us h1', revealClass: 'reveal-top', delay: 60 },
  { selector: '.about-us p, .about-us .about-btn', revealClass: 'reveal-bottom', delay: 140 },
  { selector: '.about-icon .icon', revealClass: 'reveal-icon', delay: 80 },
  { selector: '.section-content .container', revealClass: 'reveal-zoom', delay: 80 },
  { selector: '.sectx h1, .info span', revealClass: 'reveal-top', delay: 80 },
  { selector: '.photo', revealClass: 'reveal-left', delay: 90 },
  { selector: '.photo1', revealClass: 'reveal-right', delay: 90 },
  { selector: '.client-say h1, .testimonial-slide p, .testimonial-slide .stars', revealClass: 'reveal-bottom', delay: 110 },
  { selector: '.rate', revealClass: 'reveal-zoom', delay: 50 },
  { selector: '.blog .message, .blog .btn', revealClass: 'reveal-bottom', delay: 120 },
  { selector: '.contact .content, .contact .cont, .inputForm', revealClass: 'reveal-bottom', delay: 90 },
];

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    siteNav.classList.toggle('active');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('active');
    });
  });
}

function showSlide(index) {
  testimonialSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function attachRevealEffects() {
  revealConfigs.forEach((config, configIndex) => {
    const elements = document.querySelectorAll(config.selector);

    elements.forEach((element, elementIndex) => {
      element.classList.add('reveal', config.revealClass);
      element.style.transitionDelay = `${config.delay + (elementIndex * 90) + (configIndex * 20)}ms`;
    });
  });

  document.querySelectorAll('.section-content .container').forEach((card, index) => {
    const direction = index % 2 === 0 ? 'reveal-left' : 'reveal-right';
    card.classList.remove('reveal-left', 'reveal-right', 'reveal-zoom');
    card.classList.add(direction);
    card.style.transitionDelay = `${index * 110}ms`;
  });

  document.querySelectorAll('.info span').forEach((item, index) => {
    const direction = index % 2 === 0 ? 'reveal-left' : 'reveal-right';
    item.classList.remove('reveal-top', 'reveal-left', 'reveal-right');
    item.classList.add(direction);
  });
}

function startCountAnimation(element) {
  if (element.dataset.counting === 'true') return;

  element.dataset.counting = 'true';
  const target = Number(element.dataset.target || 0);
  const suffix = element.dataset.suffix || '';
  const startValue = 0;
  const duration = 1400;
  const startTime = performance.now();

  const updateValue = (time) => {
    const progress = Math.min((time - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(startValue + (target - startValue) * eased);
    element.textContent = `${currentValue}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateValue);
    } else {
      element.textContent = `${target}${suffix}`;
    }
  };

  requestAnimationFrame(updateValue);
}

if (testimonialSlides.length > 0) {
  showSlide(currentSlide);

  prevTestimonial?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(currentSlide);
  });

  nextTestimonial?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  });

  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  }, 5000);
}

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (!backToTop) return;
  backToTop.classList.toggle('visible', window.scrollY > 250);
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

attachRevealEffects();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('rate')) {
          const statNumber = entry.target.querySelector('.stat-number');
          if (statNumber) {
            startCountAnimation(statNumber);
          }
        }
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach((element) => revealObserver.observe(element));

const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach((stat) => {
  stat.dataset.target = stat.dataset.target || stat.textContent.replace(/[^\d]/g, '');
  stat.dataset.suffix = stat.dataset.suffix || stat.textContent.replace(/\d/g, '').trim();
});

const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  heroTitle.addEventListener('mouseenter', () => {
    heroTitle.style.transform = 'translateY(-8px)';
    heroTitle.style.transition = 'transform 0.4s ease';
  });

  heroTitle.addEventListener('mouseleave', () => {
    heroTitle.style.transform = 'translateY(0)';
  });
}
