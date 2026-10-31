// Hide the screenshots until the artwork has loaded, so they never float on an empty scene.
export const initDeviceScene = (scene: HTMLElement) => {
  const background = scene.querySelector<HTMLImageElement>('.m-device-scene__background');
  if (!background || scene.dataset.readyBound) return;
  scene.dataset.readyBound = 'true';
  const update = () => { scene.dataset.ready = String(background.complete && background.naturalWidth > 0); };
  background.addEventListener('load', update);
  background.addEventListener('error', update);
  update();
};

// Scenes in the page now; scenes added later (works tiles) call initDeviceScene themselves.
document.querySelectorAll<HTMLElement>('.js-device-scene').forEach(initDeviceScene);
