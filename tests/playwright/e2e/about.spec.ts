import { expect, test } from '@playwright/test';

test('the name in the hero opens the About page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('heading', { level: 1 }).getByRole('link', { name: 'Viktor Nešić', exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mobile apps that ship');
});

test('the About page offers email and LinkedIn contact', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('.m-contact-form a[href="mailto:v.nesic.developer@gmail.com"]')).toBeVisible();
  await expect(page.locator('.o-about__elsewhere a[href="https://www.linkedin.com/in/viktor-nesic"]')).toBeVisible();
  await expect(page.locator('.o-site-header__nav a[href="/#works"]')).toBeVisible();
});

for (const width of [320, 390, 1440]) {
  test(`About page has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/about', { waitUntil: 'domcontentloaded' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test('About links back home, and the back-to-top button appears past the first row of works', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('.o-site-header__nav a[href="/"]')).toHaveText('Home');

  await page.goto('/');
  const button = page.locator('.js-back-to-top');
  await expect(button).toBeHidden();
  const rowBottom = await page.locator('.o-project-grid__item').first().evaluate((el) => el.getBoundingClientRect().bottom + window.scrollY);
  await page.evaluate((y) => window.scrollTo(0, y + 100), rowBottom);
  await expect(button).toBeVisible();
  await button.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test('the progress line between the hero and the works sticks to the top and fills with the scroll', async ({ page }) => {
  await page.goto('/');
  const line = page.locator('.js-scroll-progress');
  const progress = () => line.evaluate((el) => Number(getComputedStyle(el).getPropertyValue('--progress')));
  expect(await progress()).toBe(0);
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' as ScrollBehavior }));
  await expect.poll(progress).toBe(1);
  await expect.poll(() => line.evaluate((el) => Math.round(el.getBoundingClientRect().top))).toBe(0);
});

test('the contact form validates and, without a service key, opens the mail app with the message', async ({ page }) => {
  await page.goto('/about#contact-form');
  const form = page.locator('#contact-form');
  await form.getByRole('button', { name: 'Send message' }).click();
  await expect(form.locator('.m-contact-form__status')).toHaveText('');

  await form.getByLabel('Name').fill('Ana Test');
  await form.getByLabel('Email').fill('ana@example.com');
  await form.getByLabel('What can I help with?').fill('An iOS app for our shop.');
  await form.getByRole('button', { name: 'Send message' }).click();
  await expect(form.locator('.m-contact-form__status')).toContainText('mail app');
});
