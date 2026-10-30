// Shows the button once the threshold element (e.g. the works grid's first row)
// has scrolled out above the viewport, or after one and a half screens.
// Starts at full speed and settles gently at the top.
const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;

// Scrolls to the top with our own easing, so every browser glides the same way,
// then calls done. Longer pages take a little longer, within limits.
const glideToTop = (done: () => void) => {
  const start = window.scrollY;
  const duration = Math.min(1000, Math.max(450, start / 5));
  const begin = performance.now();
  const step = (now: number) => {
    const progress = Math.min(1, (now - begin) / duration);
    // The page sets scroll-behavior: smooth, so each step must be instant or
    // the browser would animate every frame on top of this easing.
    window.scrollTo({ top: start * (1 - easeOutQuart(progress)), behavior: 'instant' as ScrollBehavior });
    if (progress < 1) requestAnimationFrame(step);
    else done();
  };
  requestAnimationFrame(step);
};

document.querySelectorAll<HTMLAnchorElement>('.js-back-to-top').forEach((button) => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const threshold = button.dataset.threshold ? document.querySelector<HTMLElement>(button.dataset.threshold) : null;

  const limit = () => (threshold ? threshold.getBoundingClientRect().bottom + window.scrollY : window.innerHeight * 1.5);
  const update = () => button.classList.toggle('state-a-back-to-top--visible', window.scrollY > limit());

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  // Keyboard users continue from the top of the page, once the scroll has finished
  // (focusing earlier would cut the glide short).
  const focusTop = () => document.querySelector<HTMLElement>('.o-site-header__mark')?.focus({ preventScroll: true });

  button.addEventListener('click', (event) => {
    event.preventDefault();
    if (reducedMotion.matches) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      focusTop();
    } else glideToTop(focusTop);
  });
});
