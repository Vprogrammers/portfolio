const players = document.querySelectorAll<HTMLElement>('.js-project-player');

players.forEach((player) => {
  const slides = Array.from(player.querySelectorAll<HTMLElement>('[data-project-slide]'));
  const previous = player.querySelector<HTMLButtonElement>('[data-project-prev]');
  const next = player.querySelector<HTMLButtonElement>('[data-project-next]');
  const toggle = player.querySelector<HTMLButtonElement>('[data-project-toggle]');
  const progress = player.querySelector<HTMLElement>('[data-project-progress]');
  if (slides.length < 2 || !previous || !next || !toggle) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interval = Math.max(3000, Number(player.dataset.interval) || 7000);
  let active = 0;
  let paused = reducedMotion.matches;
  let started = performance.now();
  let frame = 0;

  const show = (index: number) => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== active; });
    started = performance.now();
    if (progress) progress.style.setProperty('--project-progress', '0%');
  };
  const setPaused = (value: boolean) => {
    paused = value;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Resume automatic project changes' : 'Pause automatic project changes');
    toggle.textContent = paused ? 'Play' : 'Pause';
    started = performance.now();
  };
  const tick = (now: number) => {
    if (!paused && !document.hidden) {
      const elapsed = now - started;
      if (elapsed >= interval) show(active + 1);
      else if (progress) progress.style.setProperty('--project-progress', `${Math.min(100, elapsed / interval * 100)}%`);
    } else started = now;
    frame = requestAnimationFrame(tick);
  };

  previous.addEventListener('click', () => { show(active - 1); setPaused(true); });
  next.addEventListener('click', () => { show(active + 1); setPaused(true); });
  toggle.addEventListener('click', () => setPaused(!paused));
  player.addEventListener('focusin', () => setPaused(true));
  reducedMotion.addEventListener('change', () => setPaused(reducedMotion.matches));
  show(0);
  setPaused(paused);
  frame = requestAnimationFrame(tick);
  window.addEventListener('pagehide', () => cancelAnimationFrame(frame), { once: true });
});
