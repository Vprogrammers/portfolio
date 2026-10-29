// Hide the screenshots until the artwork has loaded, so they never float on an empty scene.
document.querySelectorAll<HTMLElement>('.js-device-scene').forEach((scene) => {
  const background = scene.querySelector<HTMLImageElement>('.m-device-scene__background');
  if (!background) return;
  const update = () => { scene.dataset.ready = String(background.complete && background.naturalWidth > 0); };
  background.addEventListener('load', update);
  background.addEventListener('error', update);
  update();
});
