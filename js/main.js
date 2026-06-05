/* ============================================================
   ALEXANDER AGRAMONTE — PORTFOLIO
   main.js — Interacciones y animaciones
   ============================================================ */

/**
 * SCROLL REVEAL
 * Activa la clase .visible en elementos con .reveal
 * cuando entran al viewport, disparando la animación CSS.
 */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Solo se anima una vez
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});


/**
 * NAV ACTIVE LINK
 * Resalta el link de navegación correspondiente a la sección visible.
 */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));


/**
 * SMOOTH SCROLL — previene el salto brusco del nav fijo
 * ya está manejado por CSS (scroll-behavior: smooth),
 * pero aquí ajustamos el offset para compensar la altura del nav.
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navHeight = document.querySelector('nav').offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});
