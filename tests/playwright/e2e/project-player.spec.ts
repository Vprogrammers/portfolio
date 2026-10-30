import { expect, test } from '@playwright/test';

test('homepage displays uploaded project images and supports manual navigation', async ({ page }) => {
  await page.goto('/');
  const player = page.locator('.js-project-player');
  const slides = player.locator('[data-project-slide]');
  await expect(slides).toHaveCount(24);
  await expect(slides.nth(0)).toBeVisible();
  const firstImage = slides.nth(0).locator('img.m-device-scene__background');
  await expect(firstImage).toHaveAttribute('src', /hansgrohe-background-04/);

  await expect.poll(async () => firstImage.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);

  await page.getByRole('button', { name: 'Next project' }).click();
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
