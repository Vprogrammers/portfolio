const players = document.querySelectorAll<HTMLElement>('.js-project-player');

players.forEach((player) => {
  const slides = Array.from(player.querySelectorAll<HTMLElement>('[data-project-slide]'));
  const previous = player.querySelector<HTMLButtonElement>('[data-project-prev]');
  const next = player.querySelector<HTMLButtonElement>('[data-project-next]');
  const toggle = player.querySelector<HTMLButtonElement>('[data-project-toggle]');
  const progress = player.querySelector<HTMLElement>('[data-project-progress]');
  if (slides.length < 2 || !previous || !next || !toggle) return;

  // Never display a floating screen overlay if its photographic scene fails to load.
  slides.forEach((slide) => {
    const background = slide.querySelector<HTMLImageElement>('.o-project-player__background');
    if (!background || !slide.querySelector('.o-project-player__frames')) return;
    const updateBackgroundState = () => {
      const frames = slide.querySelector<HTMLElement>('.o-project-player__frames');
      if (frames && background.naturalWidth && background.naturalHeight) {
        const bounds = slide.getBoundingClientRect();
        // The perspective matrices use a fixed 2048 × 1152 scene coordinate space.\n        // Scaling by the decoded asset dimensions would move the overlay whenever\n        // the background is exported at a different resolution.\n        const sceneWidth = 2048;\n        const sceneHeight = 1152;\n        const scale = Math.max(bounds.width / sceneWidth, bounds.height / sceneHeight);
        const offsetX = (bounds.width - sceneWidth * scale) / 2;
        const offsetY = (bounds.height - sceneHeight * scale) / 2;
        frames.style.setProperty('--scene-scale', String(scale));
        frames.style.setProperty('--scene-x', `${offsetX}px`);
        frames.style.setProperty('--scene-y', `${offsetY}px`);
      }
      const ready = background.complete && background.naturalWidth > 0;
      slide.dataset.backgroundReady = String(ready);
      if (background.complete && !ready) {
        console.warn('Project background failed to load:', background.currentSrc || background.src);
      }
    };
    background.addEventListener('load', updateBackgroundState);
    const observer = new ResizeObserver(updateBackgroundState);
    observer.observe(slide);
    window.addEventListener('pagehide', () => observer.disconnect(), { once: true });
    background.addEventListener('error', updateBackgroundState);
    updateBackgroundState();
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const defaultInterval = Math.max(3000, Number(player.dataset.interval) || 7000);
  const getInterval = () => Math.max(3000, Number(slides[active].dataset.duration) || defaultInterval);
  const transitionDuration = 1050;
  let active = 0;
  let paused = reducedMotion.matches;
  let started = performance.now();
  let frame = 0;
  let cleanupTimer: number | undefined;

  // The static HTML displays the first slide even if JavaScript is unavailable.
  slides[0].classList.add('is-active');
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
      slide.classList.remove('is-leaving', 'is-active');
      if (i !== active && i !== target) slide.hidden = true;
    });

    incoming.hidden = false;
    incoming.classList.add('is-entering');
    // Wait for the initial style to render so Safari can animate the incoming slide.
    void incoming.offsetWidth;
    outgoing.classList.add('is-leaving');
    incoming.classList.add('is-active');
    incoming.classList.remove('is-entering');
    outgoing.setAttribute('aria-hidden', 'true');
    incoming.removeAttribute('aria-hidden');

    active = target;
    started = performance.now();
    if (progress) progress.style.setProperty('--project-progress', '0%');

    cleanupTimer = window.setTimeout(() => {
      slides.forEach((slide, i) => {
        slide.hidden = i !== active;
        slide.classList.toggle('is-active', i === active);
        slide.classList.remove('is-leaving', 'is-entering');
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
  }, { once: true });
});
