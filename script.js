/* =========================================================
   PORTFOLIO — INTERACTIVITY
   Pure vanilla JS, no dependencies.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- THEME TOGGLE ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const savedTheme = localStorageSafeGet('portfolio-theme');

  function applyTheme(isLight){
    document.body.classList.toggle('light-mode', isLight);
    if (themeToggle) themeToggle.checked = isLight;
    if (themeLabel) themeLabel.textContent = isLight ? 'Dark Mode' : 'Light Mode';
  }

  applyTheme(savedTheme === 'light');

  if (themeToggle){
    themeToggle.addEventListener('change', () => {
      const isLight = themeToggle.checked;
      applyTheme(isLight);
      localStorageSafeSet('portfolio-theme', isLight ? 'light' : 'dark');
    });
  }

  // Safe localStorage wrappers (falls back silently if unavailable)
  function localStorageSafeGet(key){
    try { return window.localStorage.getItem(key); } catch(e){ return null; }
  }
  function localStorageSafeSet(key, val){
    try { window.localStorage.setItem(key, val); } catch(e){ /* ignore */ }
  }

  /* ---------- SCROLL-SPY NAVIGATION (desktop top nav + mobile bottom nav) ---------- */
  const sections = Array.from(document.querySelectorAll('.section'));
  console.log(sections.map(s => s.id));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const bnavLinks = Array.from(document.querySelectorAll('.bnav-link'));
  const navIndicator = document.getElementById('navIndicator');
  const navTrack = document.querySelector('.nav-track');

  function setActiveNav(id){
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
    bnavLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
    moveIndicator();
  }

  function moveIndicator(){
    const active = document.querySelector('.nav-link.active');
    if (!active || !navIndicator || !navTrack) return;
    const trackRect = navTrack.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    navIndicator.style.width = rect.width + 'px';
    navIndicator.style.transform = `translateX(${rect.left - trackRect.left + navTrack.scrollLeft}px)`;
  }

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        setActiveNav(entry.target.id);
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => spyObserver.observe(sec));

  window.addEventListener('resize', moveIndicator);
  window.addEventListener('load', moveIndicator);
  setTimeout(moveIndicator, 300); // fonts settle

  /* ---------- REVEAL ON SCROLL (fade in + slide up) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- ANIMATED STAT COUNTERS ---------- */
  const statNums = document.querySelectorAll('.stat-num');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => countObserver.observe(el));

  function animateCount(el){
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 900;
    const start = performance.now();

    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- PROJECT FILTER TABS ---------- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !match);
      });
    });
 });

  /* ---------- BUTTON RIPPLE EFFECT ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- CONTACT FORM (front-end only demo) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sendBtn = document.getElementById('sendBtn');
      sendBtn.textContent = 'Sending...';
      sendBtn.disabled = true;

      setTimeout(() => {
        formNote.textContent = "Thanks — your message has been noted. I'll get back to you soon.";
        sendBtn.textContent = 'Send Message';
        sendBtn.disabled = false;
        contactForm.reset();
      }, 900);
    });
  }

  /* ---------- SMOOTH SCROLL for in-page nav links (extra safety for older browsers) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});


/* ---------- IMAGE LIGHTBOX (certificate popup) ---------- */
(function(){
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('.gallery-item[data-img]').forEach(item => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.dataset.img;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox(){
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();