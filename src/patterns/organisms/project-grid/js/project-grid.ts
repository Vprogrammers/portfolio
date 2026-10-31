// Only tiles on screen animate: each scene's animations pause while its tile is
// out of view, so the grid does not run dozens of scenes at once.
const tiles = document.querySelectorAll<HTMLElement>('.o-project-grid__item');

// Each tile's scene ships in a <template>; it is added the first time the tile
// nears the screen, so tiles further down cost nothing until then.
const mountScene = (tile: Element) => {
  const template = tile.querySelector<HTMLTemplateElement>('.js-project-grid-media > template');
  if (template) template.replaceWith(template.content);
};

if (!('IntersectionObserver' in window)) tiles.forEach(mountScene);

if (tiles.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('state-o-project-grid__item--offscreen', !entry.isIntersecting);
      if (entry.isIntersecting) mountScene(entry.target);
    });
  }, { rootMargin: '200px 0px' });

  tiles.forEach((tile) => {
    // Start paused; the observer wakes the visible ones straight away.
    tile.classList.add('state-o-project-grid__item--offscreen');
    observer.observe(tile);
  });
}
