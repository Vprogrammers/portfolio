// Shows the button once the threshold element (e.g. the works grid's first row)
// has scrolled out above the viewport, or after one and a half screens.

// Starts at once and settles gently at the top.
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

// Browsers' own smooth scrolling differs a lot (near-instant in Safari, stuttering
// in Chrome on this animated page), so the button glides with its own easing.
// While it runs, the page's CSS smooth scrolling is switched off so the steps
// are not animated twice, and the scenes' animations pause to keep frames free.
const glideToTop = (done: () => void) => {
  const root = document.documentElement;
  const start = window.scrollY;
  const duration = Math.min(1100, Math.max(600, start / 5));
  const begin = performance.now();
  root.style.scrollBehavior = 'auto';
  root.classList.add('state-a-back-to-top--gliding');
  const step = (now: number) => {
    const progress = Math.min(1, (now - begin) / duration);
    window.scrollTo(0, Math.round(start * (1 - easeOutCubic(progress))));
    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }
    root.style.scrollBehavior = '';
    root.classList.remove('state-a-back-to-top--gliding');
    done();
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

  // Keyboard users continue from the top of the page, once the glide has finished.
  const focusTop = () => document.querySelector<HTMLElement>('.o-site-header__mark')?.focus({ preventScroll: true });

  button.addEventListener('click', (event) => {
    event.preventDefault();
    if (reducedMotion.matches) {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = '';
      focusTop();
    } else glideToTop(focusTop);
  });
});
