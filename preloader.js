(() => {
  const root = document.documentElement;
  const preloader = document.getElementById('brand-preloader');
  if (!preloader || !root.classList.contains('logo-intro')) return;
  let finished = false;
  const timers = new Set();
  const later = (callback, ms) => { const id = setTimeout(() => { timers.delete(id); callback(); }, ms); timers.add(id); };
  function finish() {
    if (finished) return;
    finished = true;
    timers.forEach(clearTimeout);
    timers.clear();
    clearTimeout(window.__logoIntroFallback);
    preloader.classList.add('is-leaving');
    setTimeout(() => { root.classList.remove('logo-intro'); preloader.remove(); }, 650);
  }
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches) { finish(); return; }
  motion.addEventListener?.('change', event => { if (event.matches) finish(); }, { once: true });
  // All five layers are inline paths: rendering never waits for an image or mask.
  preloader.classList.add('is-running');
  later(finish, 4200);
})();
