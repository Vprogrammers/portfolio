import { expect, test } from '@playwright/test';

test('the ProApp case study opens from the works grid and links back', async ({ page }) => {
  await page.goto('/');
  await page.locator('.o-project-grid__item', { has: page.getByRole('heading', { name: 'Hansgrohe ProApp', exact: true }) }).locator('a').click();
  await expect(page).toHaveURL(/\/work-proapp$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Hansgrohe ProApp' })).toBeVisible();
  await expect(page.locator('.o-case-study__screen')).toHaveCount(10);
  await expect(page.locator('.o-case-study__layer')).toHaveCount(5);

  await page.getByRole('link', { name: 'All works' }).first().click();
  await expect(page).toHaveURL(/\/#works$/);
});

test('the case study has no horizontal overflow on phones and desktops', async ({ page }) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/work-proapp');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
});
