import { expect, test } from '@playwright/test';

test('homepage displays uploaded project images and supports manual navigation', async ({ page }) => {
  await page.goto('/');
  const player = page.locator('.js-project-player');
  const slides = player.locator('[data-project-slide]');
  await expect(slides).toHaveCount(27);
  await expect(slides.nth(0)).toBeVisible();
  const firstImage = slides.nth(0).locator('img.m-device-scene__background');
  await expect(firstImage).toHaveAttribute('src', /hansgrohe-background-04/);

  await expect.poll(async () => firstImage.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);

  // The controls stay invisible until a keyboard user reaches them.
  const controls = player.locator('.o-project-player__controls');
  await expect(controls).toHaveCSS('opacity', '0');
  await page.getByRole('button', { name: 'Previous project' }).focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Next project' })).toBeFocused();
  await expect(controls).toHaveCSS('opacity', '1');
  await page.keyboard.press('Enter');
  await expect(slides.nth(1)).toBeVisible();
  await expect(slides.nth(0)).toBeHidden();
  await expect(page.getByRole('button', { name: 'Resume automatic project changes' })).toBeVisible();
});

test('reduced motion disables autoplay by default', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const pauseToggle = page.locator('[data-project-toggle]');
  await expect(pauseToggle).toHaveAttribute('aria-pressed', 'true');
  await expect(pauseToggle).toHaveText('Play');
});

test('a swipe changes the project on touch screens, also with reduced motion', async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  const player = page.locator('.js-project-player');
  const slides = player.locator('[data-project-slide]');
  await expect(player.locator('.o-project-player__controls')).toBeHidden();

  const swipe = (fromX: number, toX: number) => player.evaluate((element, [a, b]) => {
    const touch = (x: number) => new Touch({ identifier: 1, target: element, clientX: x, clientY: 400 });
    element.dispatchEvent(new TouchEvent('touchstart', { changedTouches: [touch(a)], bubbles: true }));
    element.dispatchEvent(new TouchEvent('touchend', { changedTouches: [touch(b)], bubbles: true }));
  }, [fromX, toX]);

  await swipe(320, 80);
  await expect(slides.nth(1)).toBeVisible();
  await swipe(80, 320);
  await expect(slides.nth(0)).toBeVisible();
  await context.close();
});

test('the side arrows change the project for mouse users', async ({ page }) => {
  await page.goto('/');
  const slides = page.locator('.js-project-player [data-project-slide]');
  await page.locator('.o-project-player__arrow--next').click();
  await expect(slides.nth(1)).toBeVisible();
  await page.locator('.o-project-player__arrow--prev').click();
  await expect(slides.nth(0)).toBeVisible();
});
