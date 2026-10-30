// Renders docs/cv/cv.html to the downloadable PDF served by the site.
// Usage: node docs/cv/render.cjs
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`file://${path.join(__dirname, 'cv.html')}`, { waitUntil: 'load' });
  await page.pdf({
    path: path.join(__dirname, '../../src/shared/assets/files/Viktor-Nesic-CV.pdf'),
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: '<div style="width:100%;padding:0 15mm;font:7pt Helvetica,Arial,sans-serif;color:#8a93a6;display:flex;justify-content:space-between"><span>Viktor Nešić · Senior Mobile Engineer</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
    margin: { top: '15mm', bottom: '16mm', left: '15mm', right: '15mm' },
  });
  await browser.close();
})();
