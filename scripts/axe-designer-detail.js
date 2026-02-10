const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  
  await page.goto('https://ms-dev.erikreisig.de/schliessanlagen-designer', { waitUntil: 'networkidle', timeout: 30000 });
  try {
    await page.click('[data-bs-dismiss="offcanvas"].btn-primary, .js-cookie-accept-all-button', { timeout: 3000 });
    await page.waitForTimeout(500);
  } catch(e) {}

  const axeResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  for (const v of axeResults.violations) {
    if (v.id === 'image-alt') {
      console.log(`\n=== ${v.id} (${v.impact}) — ${v.nodes.length} nodes ===`);
      for (const node of v.nodes) {
        console.log(`  HTML: ${node.html.substring(0, 300)}`);
        console.log(`  Target: ${JSON.stringify(node.target)}`);
        console.log('  ---');
      }
    }
  }
  
  // Also check homepage for remaining alt issues
  await page.goto('https://ms-dev.erikreisig.de/', { waitUntil: 'networkidle', timeout: 30000 });
  const axeHome = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  
  const altViolations = axeHome.violations.filter(v => v.id === 'image-alt');
  console.log(`\nHomepage image-alt violations: ${altViolations.length > 0 ? altViolations[0].nodes.length : 0}`);
  if (altViolations.length > 0) {
    for (const node of altViolations[0].nodes) {
      console.log(`  HTML: ${node.html.substring(0, 300)}`);
      console.log(`  Target: ${JSON.stringify(node.target)}`);
    }
  }

  await context.close();
  await browser.close();
}

run().catch(console.error);
