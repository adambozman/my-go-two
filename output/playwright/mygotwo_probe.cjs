const { chromium } = require('playwright');
(async() => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  const start = Date.now();
  const snap = async (label) => {
    const state = await page.evaluate(() => {
      const loaderEl = Array.from(document.querySelectorAll('*')).find(el => el.textContent?.includes('Opening your vault'));
      const imgs = Array.from(document.images).map(img => ({
        src: img.currentSrc || img.src,
        complete: img.complete,
        nw: img.naturalWidth,
        nh: img.naturalHeight,
        w: img.clientWidth,
        h: img.clientHeight,
      }));
      const strips = Array.from(document.querySelectorAll('[aria-label^="Strip "]')).map(el => ({
        label: el.getAttribute('aria-label'),
        width: Math.round(el.getBoundingClientRect().width),
        opacity: getComputedStyle(el).opacity,
      }));
      return { hasLoader: Boolean(loaderEl), imgs, strips };
    });
    console.log(JSON.stringify({ label, t: Date.now()-start, ...state }, null, 2));
    await page.screenshot({ path: `output/playwright/${label}.png` });
  };
  await page.goto('http://127.0.0.1:5180/', { waitUntil: 'networkidle' });
  const email = page.locator('input[type="email"], input[placeholder*="email" i]').first();
  if (await email.count()) {
    await email.fill('adam.bozman@gmail.com');
    const btn = page.getByRole('button', { name: /sign in/i }).first();
    await btn.click();
    await page.waitForLoadState('networkidle');
  }
  await page.goto('http://127.0.0.1:5180/dashboard/my-go-two', { waitUntil: 'domcontentloaded' });
  await snap('mygotwo-01');
  await page.waitForTimeout(800);
  await snap('mygotwo-02');
  await page.waitForTimeout(1500);
  await snap('mygotwo-03');
  await page.waitForTimeout(2500);
  await snap('mygotwo-04');
  await browser.close();
})();
