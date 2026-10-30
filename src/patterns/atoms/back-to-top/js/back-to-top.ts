// Shows the button once the threshold element (e.g. the works grid's first row)
// has scrolled out above the viewport, or after one and a half screens.
document.querySelectorAll<HTMLAnchorElement>('.js-back-to-top').forEach((button) => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const threshold = button.dataset.threshold ? document.querySelector<HTMLElement>(button.dataset.threshold) : null;

  const limit = () => (threshold ? threshold.getBoundingClientRect().bottom + window.scrollY : window.innerHeight * 1.5);
  const update = () => button.classList.toggle('state-a-back-to-top--visible', window.scrollY > limit());

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  button.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    // Keyboard users continue from the top of the page.
    document.querySelector<HTMLElement>('.o-site-header__mark')?.focus({ preventScroll: true });
  });
});
