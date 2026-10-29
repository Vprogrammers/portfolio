const players = document.querySelectorAll<HTMLElement>('.js-project-player');

players.forEach((player) => {
  const slides = Array.from(player.querySelectorAll<HTMLElement>('[data-project-slide]'));
  const previous = player.querySelector<HTMLButtonElement>('[data-project-prev]');
  const next = player.querySelector<HTMLButtonElement>('[data-project-next]');
  const toggle = player.querySelector<HTMLButtonElement>('[data-project-toggle]');
  const progress = player.querySelector<HTMLElement>('[data-project-progress]');
  if (slides.length < 2 || !previous || !next || !toggle) return;

  // Scene geometry lives in the device-scene molecule's CSS; JS only controls playback.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const readInterval = (value: string | undefined, fallback: number) => Math.max(3000, Number(value) || fallback);
  const defaultInterval = readInterval(player.dataset.interval, 7000);
  const transitionDuration = 1050;
  let active = 0;
  const getInterval = () => readInterval(slides[active].dataset.duration, defaultInterval);
  let paused = reducedMotion.matches;
  let started = performance.now();
  let frame = 0;
  let cleanupTimer: number | undefined;

  // The static HTML displays the first slide even if JavaScript is unavailable.
  slides[0].classList.add('state-o-project-player__slide--active');
  player.dataset.enhanced = 'true';
  player.dataset.paused = String(paused);

  const show = (index: number) => {
    const target = (index + slides.length) % slides.length;
    if (target === active) return;

    const outgoing = slides[active];
    const incoming = slides[target];
    if (cleanupTimer !== undefined) window.clearTimeout(cleanupTimer);

    // Resolve an interrupted transition before beginning another one.
    slides.forEach((slide, i) => {
      slide.classList.remove('state-o-project-player__slide--leaving', 'state-o-project-player__slide--active');
      if (i !== active && i !== target) slide.hidden = true;
    });

    incoming.hidden = false;
    incoming.classList.add('state-o-project-player__slide--entering');
    // Wait for the initial style to render so Safari can animate the incoming slide.
    incoming.getBoundingClientRect();
    outgoing.classList.add('state-o-project-player__slide--leaving');
    incoming.classList.add('state-o-project-player__slide--active');
    incoming.classList.remove('state-o-project-player__slide--entering');
    outgoing.setAttribute('aria-hidden', 'true');
    incoming.removeAttribute('aria-hidden');

    active = target;
    started = performance.now();
    if (progress) progress.style.setProperty('--project-progress', '0%');

    cleanupTimer = window.setTimeout(() => {
      slides.forEach((slide, i) => {
        slide.hidden = i !== active;
        slide.classList.toggle('state-o-project-player__slide--active', i === active);
        slide.classList.remove('state-o-project-player__slide--leaving', 'state-o-project-player__slide--entering');
        if (i !== active) slide.setAttribute('aria-hidden', 'true');
      });
    }, reducedMotion.matches ? 0 : transitionDuration);
  };

  const setPaused = (value: boolean) => {
    paused = value;
    player.dataset.paused = String(paused);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Resume automatic project changes' : 'Pause automatic project changes');
    toggle.textContent = paused ? 'Play' : 'Pause';
    started = performance.now();
  };

  const tick = (now: number) => {
    if (!paused && !document.hidden) {
      const elapsed = now - started;
      if (elapsed >= getInterval()) show(active + 1);
      else if (progress) progress.style.setProperty('--project-progress', `${Math.min(100, elapsed / getInterval() * 100)}%`);
    } else started = now;
    frame = requestAnimationFrame(tick);
  };

  previous.addEventListener('click', () => { show(active - 1); setPaused(true); });
  next.addEventListener('click', () => { show(active + 1); setPaused(true); });
  toggle.addEventListener('click', () => setPaused(!paused));
  player.addEventListener('focusin', () => setPaused(true));
  reducedMotion.addEventListener('change', () => setPaused(reducedMotion.matches));
  setPaused(paused);
  frame = requestAnimationFrame(tick);
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(frame);
    if (cleanupTimer !== undefined) window.clearTimeout(cleanupTimer);
  });
  // A page restored from the back-forward cache keeps this player but not its loop.
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    started = performance.now();
    frame = requestAnimationFrame(tick);
  });
});
