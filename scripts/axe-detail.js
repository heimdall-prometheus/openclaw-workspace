const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  
  // Check homepage for detailed violations
  await page.goto('https://ms-dev.erikreisig.de/', { waitUntil: 'networkidle', timeout: 30000 });
  try {
    await page.click('[data-bs-dismiss="offcanvas"].btn-primary, .js-cookie-accept-all-button', { timeout: 3000 });
    await page.waitForTimeout(500);
  } catch(e) {}

  const axeResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  for (const v of axeResults.violations) {
    if (['aria-allowed-attr', 'aria-required-children', 'aria-required-parent', 'list', 'listitem', 'image-alt', 'target-size'].includes(v.id)) {
      console.log(`\n=== ${v.id} (${v.impact}) ===`);
      console.log(`Description: ${v.description}`);
      console.log(`Help: ${v.help}`);
      for (const node of v.nodes) {
        console.log(`  HTML: ${node.html.substring(0, 200)}`);
        console.log(`  Target: ${JSON.stringify(node.target)}`);
        console.log(`  Fix: ${node.failureSummary}`);
        console.log('  ---');
      }
    }
  }

  await context.close();
  await browser.close();
}

run().catch(console.error);
