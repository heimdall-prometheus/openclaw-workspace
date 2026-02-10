#!/usr/bin/env node
/**
 * Test Stealth Browser against bot detection sites
 */

const { launchStealthBrowser, createStealthPage } = require('./stealth-browser.js');
const fs = require('fs');
const path = require('path');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const TEST_SITES = [
  {
    name: 'SannySoft Bot Test',
    url: 'https://bot.sannysoft.com',
    check: async (page) => {
      await delay(3000);
      const results = await page.evaluate(() => {
        const rows = document.querySelectorAll('tr');
        const failed = [];
        rows.forEach(row => {
          const cells = row.querySelectorAll('td');
          if (cells.length >= 2) {
            const status = cells[1]?.style?.backgroundColor;
            if (status === 'red' || cells[1]?.textContent?.includes('FAIL')) {
              failed.push(cells[0]?.textContent);
            }
          }
        });
        return failed;
      });
      return {
        passed: results.length === 0,
        failed: results
      };
    }
  },
  {
    name: 'Headless Detection',
    url: 'https://arh.antoinevastel.com/bots/areyouheadless',
    check: async (page) => {
      await delay(2000);
      const text = await page.evaluate(() => document.body.innerText);
      const isHeadless = text.toLowerCase().includes('you are chrome headless') || 
                         text.toLowerCase().includes('headless');
      return {
        passed: !isHeadless || text.toLowerCase().includes('not headless'),
        message: text.substring(0, 200)
      };
    }
  },
  {
    name: 'Infosimples Headless Test',
    url: 'https://infosimples.github.io/detect-headless',
    check: async (page) => {
      await delay(3000);
      const results = await page.evaluate(() => {
        const items = document.querySelectorAll('.result-item');
        const failed = [];
        items.forEach(item => {
          if (item.classList.contains('failed')) {
            failed.push(item.textContent?.trim());
          }
        });
        return failed;
      });
      return {
        passed: results.length === 0,
        failed: results
      };
    }
  }
];

async function runTests() {
  console.log('🧪 Starting Stealth Browser Tests\n');
  console.log('='.repeat(50));
  
  const browser = await launchStealthBrowser();
  const screenshotDir = '/tmp/stealth-tests';
  
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  
  const results = [];
  
  for (const test of TEST_SITES) {
    console.log(`\n🔍 Testing: ${test.name}`);
    console.log(`   URL: ${test.url}`);
    
    try {
      const page = await createStealthPage(browser);
      await page.goto(test.url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      const result = await test.check(page);
      
      const screenshotFile = path.join(screenshotDir, `${test.name.replace(/\s+/g, '-')}.png`);
      await page.screenshot({ path: screenshotFile, fullPage: true });
      
      if (result.passed) {
        console.log(`   ✅ PASSED`);
      } else {
        console.log(`   ❌ FAILED`);
        if (result.failed && result.failed.length > 0) {
          console.log(`   Failed checks: ${result.failed.join(', ')}`);
        }
        if (result.message) {
          console.log(`   Message: ${result.message}`);
        }
      }
      console.log(`   📸 Screenshot: ${screenshotFile}`);
      
      results.push({ name: test.name, ...result, screenshot: screenshotFile });
      await page.close();
      
    } catch (err) {
      console.log(`   ⚠️ ERROR: ${err.message}`);
      results.push({ name: test.name, passed: false, error: err.message });
    }
  }
  
  await browser.close();
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY\n');
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  
  console.log(`Passed: ${passed}/${total}`);
  
  if (passed === total) {
    console.log('\n🎉 All tests passed! Stealth mode is working.');
  } else {
    console.log('\n⚠️ Some tests failed. May need additional evasions.');
  }
  
  return results;
}

if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };
