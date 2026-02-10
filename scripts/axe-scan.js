const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;

const URLS = [
  'https://ms-dev.erikreisig.de/',
  'https://ms-dev.erikreisig.de/sicherheitstechnik/schliesszylinder/',
  'https://ms-dev.erikreisig.de/search?search=dom',
  'https://ms-dev.erikreisig.de/checkout/cart',
  'https://ms-dev.erikreisig.de/schliessanlagen-designer',
  'https://ms-dev.erikreisig.de/account/login',
  'https://ms-dev.erikreisig.de/shop-service/impressum/',
];

// WCAG rules we care about
const FOCUS_RULES = [
  'aria-allowed-attr',
  'aria-required-children', 
  'aria-required-parent',
  'aria-roles',
  'aria-valid-attr-value',
  'aria-valid-attr',
  'button-name',
  'image-alt',
  'input-image-alt',
  'role-img-alt',
  'svg-img-alt',
  'target-size',
  'list',
  'listitem',
  'aria-command-name',
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = {};
  let totalViolations = 0;
  let ariaViolations = 0;
  let touchViolations = 0;
  let altViolations = 0;

  for (const url of URLS) {
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      // Accept cookies if present
      try {
        await page.click('[data-bs-dismiss="offcanvas"].btn-primary, .js-cookie-accept-all-button', { timeout: 3000 });
        await page.waitForTimeout(500);
      } catch(e) {}
      
      const axeResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      
      const violations = axeResults.violations;
      const pageResult = {
        url,
        total: violations.reduce((sum, v) => sum + v.nodes.length, 0),
        violations: violations.map(v => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.length,
          wcagTags: v.tags.filter(t => t.startsWith('wcag')),
        }))
      };
      
      // Count by category
      for (const v of violations) {
        const n = v.nodes.length;
        if (['aria-allowed-attr', 'aria-required-children', 'aria-required-parent', 'aria-roles', 'aria-valid-attr-value', 'aria-valid-attr', 'list', 'listitem', 'aria-command-name'].includes(v.id)) {
          ariaViolations += n;
        }
        if (v.id === 'target-size') {
          touchViolations += n;
        }
        if (['image-alt', 'input-image-alt', 'role-img-alt', 'svg-img-alt'].includes(v.id)) {
          altViolations += n;
        }
        totalViolations += n;
      }

      results[url] = pageResult;
      console.log(`✓ ${url}: ${pageResult.total} violations`);
    } catch (err) {
      console.error(`✗ ${url}: ${err.message}`);
      results[url] = { url, error: err.message };
    }
    await context.close();
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Total violations: ${totalViolations}`);
  console.log(`ARIA violations (4.1.2 + 1.3.1): ${ariaViolations}`);
  console.log(`Touch target violations (2.5.8): ${touchViolations}`);
  console.log(`Alt text violations (1.1.1): ${altViolations}`);
  console.log('\n=== PER PAGE ===');
  for (const [url, r] of Object.entries(results)) {
    if (r.error) {
      console.log(`${url}: ERROR - ${r.error}`);
    } else {
      console.log(`${url}: ${r.total} violations`);
      for (const v of r.violations) {
        console.log(`  - ${v.id} (${v.impact}): ${v.nodes} nodes`);
      }
    }
  }

  await browser.close();
  
  // Write JSON results
  const fs = require('fs');
  fs.writeFileSync('/tmp/axe-results.json', JSON.stringify({ results, summary: { totalViolations, ariaViolations, touchViolations, altViolations }}, null, 2));
  console.log('\nResults written to /tmp/axe-results.json');
}

run().catch(console.error);
