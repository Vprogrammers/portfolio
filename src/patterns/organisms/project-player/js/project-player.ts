const players = document.querySelectorAll<HTMLElement>('.js-project-player');

// Reports whether the element is on screen and mirrors it in data-in-view.
const watchInView = (element: HTMLElement, onChange: (inView: boolean) => void) => {
  if (!('IntersectionObserver' in window)) return;
  new IntersectionObserver(([entry]) => {
    element.dataset.inView = String(entry.isIntersecting);
    onChange(entry.isIntersecting);
  }).observe(element);
};

// On arrival the first project's details open for a moment, so visitors learn
// that the title reveals more.
const showHint = (player: HTMLElement, reducedMotion: boolean) => {
  if (reducedMotion) return;
  player.dataset.hint = 'true';
  window.setTimeout(() => { player.dataset.hint = 'false'; }, 3400);
};

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
  // No project holds the stage longer than the default interval; longer stories
  // carry on where they stopped the next time their slide comes round.
  const getInterval = () => Math.min(readInterval(slides[active].dataset.duration, defaultInterval), defaultInterval);
  let paused = reducedMotion.matches;
  // Held while a visitor reads a project's details, by pointer or keyboard; the
  // slide waits until neither is left, then carries on.
  let hovered = false;
  let focused = false;
  let started = performance.now();
  let frame = 0;
  let cleanupTimer: number | undefined;

  // A hidden slide's CSS animations are dropped, so remember how far its scene
  // got and seek its new animations there when it is shown again.
  const saveSceneTime = (slide: HTMLElement) => {
    const times = slide.getAnimations({ subtree: true }).map((animation) => Number(animation.currentTime) || 0);
    slide.dataset.sceneTime = String(Math.max(0, ...times));
  };
  const resumeScene = (slide: HTMLElement) => {
    const time = Number(slide.dataset.sceneTime) || 0;
    if (time) slide.getAnimations({ subtree: true }).forEach((animation) => { animation.currentTime = time; });
  };

  // Device scenes with several screenshot sets move on to the next set only
  // once the current one has played through.
  // Keep in sync with $frame-time in device-scene.scss.
  const frameTime = 2000;
  const prepareScene = (slide: HTMLElement) => {
    const scene = slide.querySelector<HTMLElement>('.js-device-scene');
    const sets = scene ? scene.querySelectorAll<HTMLElement>('.m-device-scene__frames[data-set]') : [];
    if (!scene || !sets.length) return;
    const cycle = sets[Number(scene.dataset.activeSet)].children.length * frameTime;
    if (Number(slide.dataset.sceneTime) >= cycle) {
      scene.dataset.activeSet = String((Number(scene.dataset.activeSet) + 1) % sets.length);
      slide.dataset.sceneTime = '0';
    }
  };

  // The static HTML displays the first slide even if JavaScript is unavailable.
  slides[0].classList.add('state-o-project-player__slide--active');
  prepareScene(slides[0]);
  player.dataset.enhanced = 'true';
  player.dataset.paused = String(paused);
  showHint(player, reducedMotion.matches);

  const show = (index: number) => {
    const target = (index + slides.length) % slides.length;
    if (target === active) return;

    const outgoing = slides[active];
    const incoming = slides[target];
    if (cleanupTimer !== undefined) window.clearTimeout(cleanupTimer);
    saveSceneTime(outgoing);

    // Resolve an interrupted transition before beginning another one.
    slides.forEach((slide, i) => {
      slide.classList.remove('state-o-project-player__slide--leaving', 'state-o-project-player__slide--active');
      if (i !== active && i !== target) slide.hidden = true;
    });

    incoming.hidden = false;
    prepareScene(incoming);
    incoming.classList.add('state-o-project-player__slide--entering');
    // Wait for the initial style to render so Safari can animate the incoming slide.
    incoming.getBoundingClientRect();
    resumeScene(incoming);
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

  // The player rests while it is scrolled out of view: no slide changes, no scene animation.
  let inView = true;
  watchInView(player, (value) => { inView = value; });

  const running = () => !paused && !hovered && !focused && inView && !document.hidden;
  const tick = (now: number) => {
    if (running()) {
      const elapsed = now - started;
      if (elapsed >= getInterval()) show(active + 1);
      else if (progress) progress.style.setProperty('--project-progress', `${Math.min(100, elapsed / getInterval() * 100)}%`);
    } else started = now;
    frame = requestAnimationFrame(tick);
  };

  previous.addEventListener('click', () => { show(active - 1); setPaused(true); });
  next.addEventListener('click', () => { show(active + 1); setPaused(true); });
  toggle.addEventListener('click', () => setPaused(!paused));
  slides.forEach((slide) => {
    const content = slide.querySelector<HTMLElement>('.o-project-player__content');
    if (!content) return;
    content.addEventListener('mouseenter', () => { hovered = true; });
    content.addEventListener('mouseleave', () => { hovered = false; });
    content.addEventListener('focusin', () => { focused = true; });
    content.addEventListener('focusout', (event) => { focused = content.contains(event.relatedTarget as Node | null); });
  });
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
