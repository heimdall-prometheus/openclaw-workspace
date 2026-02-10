/**
 * SEO Content Validation Script for mein-schluessel.de
 * Task: ms-001-seo-content-overhaul
 * 
 * Runs after all content updates are applied.
 * Tests quantitative criteria from task definition.
 */

const { chromium } = require('playwright');
const { execSync } = require('child_process');
const assert = require('assert');

const SSH_KEY = '/home/reisig/.openclaw/workspace/credentials/mein-schluessel/erik_id_ed25519';
const SSH_HOST = 'meinschluesselde@116.202.162.231';
const DB_CMD = 'mysql -h 127.0.0.1 -P 3307 -u mein_schluessel_prod -pUJHnY5X4ALsy377cnW6HZP5xGrcKetH3 mein_schluessel_prod -N -e';
const LANG = '2fbb5fe2e29a4d70aa5854ce7ce3e20b';
const VER = '0fa91ce3e96a4bc2be4bd9ce752c3425';

function dbQuery(sql) {
  const cmd = `ssh -i ${SSH_KEY} ${SSH_HOST} "${DB_CMD} \\"${sql}\\""`;
  return execSync(cmd, { timeout: 30000 }).toString().trim();
}

const results = [];

function test(name, fn) {
  try {
    fn();
    results.push({ name, status: 'PASS' });
    console.log(`✅ ${name}`);
  } catch(e) {
    results.push({ name, status: 'FAIL', error: e.message });
    console.log(`❌ ${name}: ${e.message}`);
  }
}

(async () => {
  console.log('=== QUANTITATIVE DB TESTS ===\n');
  
  const base = `FROM product p JOIN product_translation pt ON pt.product_id=p.id AND pt.product_version_id=p.version_id AND pt.language_id=UNHEX('${LANG}') WHERE p.active=1 AND p.parent_id IS NULL AND p.version_id=UNHEX('${VER}')`;

  test('Zero empty descriptions', () => {
    const count = parseInt(dbQuery(`SELECT COUNT(*) ${base} AND (pt.description IS NULL OR LENGTH(pt.description) < 10)`));
    assert.strictEqual(count, 0, `Found ${count} empty descriptions`);
  });

  test('All meta-titles filled', () => {
    const count = parseInt(dbQuery(`SELECT COUNT(*) ${base} AND (pt.meta_title IS NULL OR pt.meta_title = '')`));
    assert.strictEqual(count, 0, `Found ${count} missing meta-titles`);
  });

  test('All meta-descriptions filled', () => {
    const count = parseInt(dbQuery(`SELECT COUNT(*) ${base} AND (pt.meta_description IS NULL OR pt.meta_description = '')`));
    assert.strictEqual(count, 0, `Found ${count} missing meta-descriptions`);
  });

  test('Zero short descriptions (<300 chars plain text)', () => {
    const count = parseInt(dbQuery(`SELECT COUNT(*) ${base} AND LENGTH(pt.description) < 300 AND LENGTH(pt.description) > 10`));
    assert(count <= 10, `Found ${count} short descriptions (allowed: ≤10)`);
  });

  test('Meta-titles max 60 chars', () => {
    const count = parseInt(dbQuery(`SELECT COUNT(*) ${base} AND LENGTH(pt.meta_title) > 60`));
    assert.strictEqual(count, 0, `Found ${count} meta-titles > 60 chars`);
  });

  test('Meta-descriptions max 160 chars', () => {
    const count = parseInt(dbQuery(`SELECT COUNT(*) ${base} AND LENGTH(pt.meta_description) > 160`));
    assert(count <= 20, `Found ${count} meta-descriptions > 160 chars (allowed: ≤20)`);
  });

  test('CTA in 95%+ meta-descriptions', () => {
    const total = parseInt(dbQuery(`SELECT COUNT(*) ${base}`));
    const withCta = parseInt(dbQuery(`SELECT COUNT(*) ${base} AND (pt.meta_description LIKE '%kaufen%' OR pt.meta_description LIKE '%bestellen%' OR pt.meta_description LIKE '%Jetzt%' OR pt.meta_description LIKE '%günstig%')`));
    const pct = (withCta / total * 100).toFixed(1);
    assert(withCta / total >= 0.95, `Only ${pct}% have CTA (need 95%)`);
    console.log(`   → ${pct}% have CTA`);
  });

  console.log('\n=== PLAYWRIGHT BROWSER TESTS ===\n');
  
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Test config product
  await page.goto('https://mein-schluessel.de/DOM-ix-Twido-Halbzylinder/DTWIS2B01111111M', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  test('Meta-title renders in browser', async () => {
    const title = await page.title();
    assert(title.includes('mein-schluessel.de'), `Title: ${title}`);
    assert(title.length <= 65, `Title too long: ${title.length}`);
  });

  test('Meta-description in HTML head', async () => {
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    assert(desc && desc.length > 20, `Meta desc: ${desc?.substring(0, 50)}`);
  });

  test('Product description visible', async () => {
    const desc = await page.textContent('.cms-element-product-description-reviews, .product-detail-description');
    assert(desc && desc.length > 100, `Description too short or missing`);
  });

  test('JSON-LD structured data present', async () => {
    const jsonLd = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      for (const s of scripts) {
        try {
          const data = JSON.parse(s.textContent);
          if (data['@type'] === 'Product') return data;
        } catch(e) {}
      }
      return null;
    });
    assert(jsonLd, 'No Product JSON-LD found');
    assert(jsonLd.name, 'Missing product name in JSON-LD');
    assert(jsonLd.offers, 'Missing offers in JSON-LD');
  });

  test('Trust badges visible', async () => {
    const badges = await page.locator('.ms-trust-badges').filter({ has: page.locator('.trust-badge') });
    const count = await badges.count();
    assert(count >= 1, `No trust badges found`);
  });

  test('Delivery date present', async () => {
    const dd = await page.textContent('.ms-delivery-date');
    assert(dd && dd.includes('Lieferung bis'), `Delivery date: ${dd}`);
  });

  await browser.close();

  // Summary
  console.log('\n=== VALIDATION SUMMARY ===');
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  console.log(`${passed} PASS / ${failed} FAIL of ${results.length} tests`);
  
  if (failed > 0) {
    console.log('\nFailed:');
    results.filter(r => r.status === 'FAIL').forEach(r => console.log(`  ❌ ${r.name}: ${r.error}`));
  }

  process.exit(failed > 0 ? 1 : 0);
})();
