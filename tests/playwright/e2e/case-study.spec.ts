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

const caseStudies = [
  ['proapp', 'Hansgrohe ProApp'],
  ['migros', 'Migros iMpuls'],
  ['bucherer', 'Bucherer'],
  ['mume', 'MuMe'],
  ['cgiar', 'CGIAR'],
  ['hanze3', 'Hanze3'],
  ['photostory', 'PhotoStory'],
  ['bezbrige', 'BezBrige!'],
  ['sliike', 'Sliike'],
  ['koch', 'KOCH Scan App'],
  ['pmi', 'PMI Market(i)'],
  ['swipe-xyz', 'Swipe XYZ'],
  ['goaleadors', 'Goaleadors'],
  ['bikini', 'Bikini'],
  ['cocukflix', 'ÇocukFlix'],
  ['design-tokens', 'Design Token Pipeline'],
  ['anubis', 'Anubis'],
  ['yamvip', 'YAMVIP'],
  ['kmp-template', 'KMP Template'],
  ['masse', 'Masse'],
  ['appledetect', 'AppleDetect'],
  ['cryptocent', 'Cryptocent'],
  ['feniks', 'Feniks'],
  ['digitalpass', 'DigitalPass'],
  ['connectclub', 'ConnectClub'],
  ['yaaxa', 'Yaaxa'],
  ['myph', 'MyPH'],
  ['houseleek', 'Houseleek Renhold'],
  ['perfectmatrimony', 'PerfectMatrimony'],
];

test('every project except the open-source repos has a case study, linked from the grid and chained to the next one', async ({ page }) => {
  await page.goto('/');
  for (const [slug] of caseStudies) {
    await expect(page.locator(`.o-project-grid a[href="/work-${slug}"]`)).toHaveCount(1);
  }
  for (const [index, [slug, title]] of caseStudies.entries()) {
    await page.goto(`/work-${slug}`);
    await expect(page.getByRole('heading', { level: 1, name: title, exact: true })).toBeVisible();
    // Every hero shows its project's scene, not an empty box.
    await expect(page.locator('.o-case-study__hero-scene > *').first()).toBeAttached();
    const [nextSlug] = caseStudies[(index + 1) % caseStudies.length];
    await expect(page.locator('.o-case-study__next')).toHaveAttribute('href', `/work-${nextSlug}`);
  }
});

test('works tiles add their scene only when they near the screen', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const lastTile = page.locator('.o-project-grid__item').last();
  await expect(lastTile.locator('.js-project-grid-media > template')).toHaveCount(1);
  await lastTile.scrollIntoViewIfNeeded();
  await expect(lastTile.locator('.js-project-grid-media > template')).toHaveCount(0);
  await expect(lastTile.locator('.js-project-grid-media > *').first()).toBeAttached();
});
