#!/usr/bin/env node
/**
 * Parallel Scraping Helper
 * Usage: node parallel-scrape.js url1 url2 url3 ...
 * Returns JSON array of results
 */

const { chromium } = require('/usr/lib/node_modules/openclaw/node_modules/playwright');

async function scrapeParallel(urls, options = {}) {
  const { maxContexts = 5, timeout = 30000 } = options;
  
  const browser = await chromium.launch({ headless: true });
  const results = [];
  
  // Process in batches
  for (let i = 0; i < urls.length; i += maxContexts) {
    const batch = urls.slice(i, i + maxContexts);
    const contexts = await Promise.all(batch.map(() => browser.newContext()));
    const pages = await Promise.all(contexts.map(ctx => ctx.newPage()));
    
    const batchResults = await Promise.all(
      pages.map(async (page, idx) => {
        try {
          await page.goto(batch[idx], { timeout });
          const title = await page.title();
          const content = await page.content();
          return { url: batch[idx], title, success: true, length: content.length };
        } catch (err) {
          return { url: batch[idx], success: false, error: err.message };
        }
      })
    );
    
    results.push(...batchResults);
    await Promise.all(contexts.map(ctx => ctx.close()));
  }
  
  await browser.close();
  return results;
}

// CLI mode
if (require.main === module) {
  const urls = process.argv.slice(2);
  if (urls.length === 0) {
    console.log('Usage: node parallel-scrape.js url1 url2 ...');
    process.exit(1);
  }
  
  scrapeParallel(urls).then(results => {
    console.log(JSON.stringify(results, null, 2));
  });
}

module.exports = { scrapeParallel };
