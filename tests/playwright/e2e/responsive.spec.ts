import { expect, test } from '@playwright/test';

const sizes = [
  { name: 'XS', width: 375, height: 812 },
  { name: 'S', width: 640, height: 800 },
  { name: 'M', width: 820, height: 900 },
  { name: 'L', width: 1024, height: 768 },
  { name: 'XL', width: 1280, height: 800 },
  { name: 'XXL', width: 1600, height: 900 },
  { name: 'XXXL', width: 1920, height: 1080 },
  { name: 'small mobile', width: 320, height: 700 },
  { name: 'large desktop', width: 2560, height: 1440 },
];

for (const size of sizes) {
  test(`homepage viewport and overflow: ${size.name} (${size.width}px)`, async ({ page }) => {
    await page.setViewportSize({ width: size.width, height: size.height });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const state = await page.evaluate(() => {
      const viewport = document.querySelector('meta[name="viewport"]');
      const documentWidth = document.documentElement.scrollWidth;
      const windowWidth = document.documentElement.clientWidth;
      return {
        viewportCount: document.querySelectorAll('meta[name="viewport"]').length,
        viewportContent: viewport?.getAttribute('content') ?? '',
        documentWidth,
        windowWidth,
      };
    });

    expect(state.viewportCount, 'exactly one viewport meta tag').toBe(1);
    expect(state.viewportContent).toMatch(/width\s*=\s*device-width/);
    expect(state.viewportContent).toMatch(/initial-scale\s*=\s*1(?:\.0)?/);
    expect(state.documentWidth, 'no horizontal document overflow').toBeLessThanOrEqual(state.windowWidth + 1);
  });
}
