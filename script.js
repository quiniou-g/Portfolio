/* ===========================
   NAVIGATION ACTIVE STATE
=========================== */
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');

const sectionMap = {
  'hero':           'hero',
  'parcours':       'hero',
  'competences':    'competences',
  'projets':        'projets',
  'experience':     'experience',
  'certifications': 'certifications',
  'contact':        'certifications',
};

function updateNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top <= window.innerHeight / 2) {
      current = section.id;
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    const target = item.getAttribute('data-section');
    if (target && sectionMap[current] === target) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateNav);
updateNav();

/* ===========================
   SMOOTH SCROLL ON NAV CLICK
=========================== */
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const href = item.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===========================
   SCROLL REVEAL
=========================== */
const revealEls = document.querySelectorAll(
  '.timeline-item, .skill-card, .project-card, .cert-card, .contact-info-item, .section-header'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 60 * (Array.from(revealEls).indexOf(entry.target) % 6));
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => observer.observe(el));  
