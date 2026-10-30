// Fills from the moment the line reaches the top of the viewport to the end of the page.
document.querySelectorAll<HTMLElement>('.js-scroll-progress').forEach((line) => {
  let start = 0;
  let frame = 0;

  // Where the line sits in the document while it is not stuck yet.
  const measure = () => {
    const parent = line.parentElement;
    const previous = line.previousElementSibling as HTMLElement | null;
    start = previous ? previous.getBoundingClientRect().bottom + window.scrollY : (parent?.offsetTop ?? 0);
  };

  const paint = () => {
    frame = 0;
    const end = document.documentElement.scrollHeight - window.innerHeight;
    const progress = end > start ? (window.scrollY - start) / (end - start) : 0;
    line.style.setProperty('--progress', String(Math.min(1, Math.max(0, progress))));
    line.classList.toggle('state-a-scroll-progress--stuck', window.scrollY >= start);
  };
  const request = () => { if (!frame) frame = requestAnimationFrame(paint); };

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', () => { measure(); request(); });
  window.addEventListener('load', () => { measure(); request(); });
  measure();
  paint();
});
