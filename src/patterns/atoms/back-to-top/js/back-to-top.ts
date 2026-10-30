// Shows the button once the threshold element (e.g. the works grid's first row)
// has scrolled out above the viewport, or after one and a half screens.

// Eases in and out softly with a steady middle, like a hand scrolling the page.
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

// Browsers' own smooth scrolling differs a lot (near-instant in Safari, stuttering
// in Chrome on this animated page), so the button glides with its own easing.
// While it runs, the page's CSS smooth scrolling is switched off so the steps
// are not animated twice, and the scenes' animations pause to keep frames free.
const glideToTop = (done: () => void) => {
  const root = document.documentElement;
  const start = window.scrollY;
  // About 2.4 px per millisecond, between 1.2 and 2.8 seconds.
  const duration = Math.min(2800, Math.max(1200, start / 2.4));
  const begin = performance.now();
  root.style.scrollBehavior = 'auto';
  root.classList.add('state-a-back-to-top--gliding');
  const step = (now: number) => {
    const progress = Math.min(1, (now - begin) / duration);
    window.scrollTo(0, Math.round(start * (1 - easeInOutSine(progress))));
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
