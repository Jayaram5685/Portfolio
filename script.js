// ===== nav scroll state =====
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, {passive:true});

// ===== mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});
navLinksEl?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

// ===== scroll-spy active link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, {rootMargin: '-40% 0px -50% 0px'});
sections.forEach(s => spyObserver.observe(s));

// ===== reveal on scroll =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.15});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== typing headline effect =====
const typeTarget = document.getElementById('typeTarget');
const phrases = [
  'reliable web systems.',
  'real-time products.',
  'full-stack applications.',
  'clean, scalable APIs.'
];
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    charIndex++;
    typeTarget.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    typeTarget.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 55);
}
if (typeTarget) setTimeout(typeLoop, 1000);

// ===== animated counters in build log =====
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.5});
counters.forEach(c => counterObserver.observe(c));

function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const duration = 1200;
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = decimals ? value.toFixed(decimals) : Math.round(value);
    if (progress < 1) requestAnimationFrame(frame);
    else el.textContent = decimals ? target.toFixed(decimals) : target;
  }
  requestAnimationFrame(frame);
}

// ===== cursor glow (desktop only) =====
const glow = document.getElementById('cursorGlow');
if (glow && matchMedia('(hover: hover)').matches) {
  window.addEventListener('mousemove', (e) => {
    glow.style.opacity = '1';
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, {passive:true});
  window.addEventListener('mouseleave', () => glow.style.opacity = '0');
}

// ===== subtle 3D tilt on project cards & photo =====
function attachTilt(el, strength = 8) {
  if (!el || !matchMedia('(hover: hover)').matches) return;
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
  });
}
document.querySelectorAll('.tilt-card').forEach(card => attachTilt(card, 4));
attachTilt(document.getElementById('tiltPhoto'), 6);