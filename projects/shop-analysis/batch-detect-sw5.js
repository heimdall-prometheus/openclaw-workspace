#!/usr/bin/env node
/**
 * Batch SW5 Detection - Findet Shopware 5 Shops in unserer URL-Liste
 * Läuft mit Throttling um Server nicht zu überlasten
 */

const fs = require('fs');
const path = require('path');
const { analyzeShop } = require('./analyze-shop');

const CONCURRENCY = 5;        // Parallele Requests
const DELAY_MS = 500;         // Pause zwischen Batches
const PROGRESS_INTERVAL = 50; // Log alle X Shops

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadAllUrls() {
  const urlDir = path.join(__dirname, 'urls');
  const files = fs.readdirSync(urlDir).filter(f => f.endsWith('.json'));
  
  const allUrls = new Set();
  
  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(urlDir, file), 'utf8'));
      const urls = data.urls || data;
      if (Array.isArray(urls)) {
        urls.forEach(u => allUrls.add(u.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '')));
      }
    } catch (e) {
      console.error(`Error loading ${file}:`, e.message);
    }
  }
  
  return [...allUrls];
}

async function processBatch(urls, startIdx) {
  const results = await Promise.all(
    urls.map(async (url, i) => {
      try {
        return await analyzeShop(url);
      } catch (e) {
        return { url, status: 'error', error: e.message, tech: [] };
      }
    })
  );
  return results;
}

async function main() {
  console.log('🔍 Shopware 5 Detection gestartet...\n');
  
  // Load URLs
  const urls = await loadAllUrls();
  console.log(`📊 ${urls.length} URLs geladen\n`);
  
  // Results storage
  const resultsFile = path.join(__dirname, 'results', 'sw5-detection.json');
  const sw5File = path.join(__dirname, 'results', 'sw5-leads.json');
  
  // Load existing progress
  let results = [];
  let processed = new Set();
  
  if (fs.existsSync(resultsFile)) {
    try {
      const existing = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
      results = existing.results || [];
      results.forEach(r => processed.add(r.url.replace(/^https?:\/\//, '').replace(/\/$/, '')));
      console.log(`📂 ${results.length} bereits analysiert, fahre fort...\n`);
    } catch (e) {}
  }
  
  // Filter remaining
  const remaining = urls.filter(u => !processed.has(u));
  console.log(`⏳ ${remaining.length} noch zu analysieren\n`);
  
  // Stats
  let sw5Count = results.filter(r => r.tech && r.tech.includes('shopware5')).length;
  let sw6Count = results.filter(r => r.tech && r.tech.includes('shopware6')).length;
  let errorCount = results.filter(r => r.status === 'error').length;
  
  // Process in batches
  for (let i = 0; i < remaining.length; i += CONCURRENCY) {
    const batch = remaining.slice(i, i + CONCURRENCY);
    const batchResults = await processBatch(batch, i);
    
    results.push(...batchResults);
    
    // Update stats
    for (const r of batchResults) {
      if (r.tech && r.tech.includes('shopware5')) sw5Count++;
      if (r.tech && r.tech.includes('shopware6')) sw6Count++;
      if (r.status === 'error') errorCount++;
    }
    
    // Progress log
    const total = results.length;
    if (total % PROGRESS_INTERVAL === 0 || i + CONCURRENCY >= remaining.length) {
      console.log(`[${total}/${urls.length}] SW5: ${sw5Count} | SW6: ${sw6Count} | Errors: ${errorCount}`);
    }
    
    // Save progress periodically
    if (total % 100 === 0) {
      saveResults(resultsFile, sw5File, results, sw5Count, sw6Count);
    }
    
    await sleep(DELAY_MS);
  }
  
  // Final save
  saveResults(resultsFile, sw5File, results, sw5Count, sw6Count);
  
  console.log('\n✅ Fertig!');
  console.log(`\n📊 ERGEBNIS:`);
  console.log(`   Shopware 5: ${sw5Count} 🎯`);
  console.log(`   Shopware 6: ${sw6Count}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`\n💾 SW5 Leads gespeichert: ${sw5File}`);
}

function saveResults(resultsFile, sw5File, results, sw5Count, sw6Count) {
  // All results
  fs.writeFileSync(resultsFile, JSON.stringify({
    analyzed_at: new Date().toISOString(),
    total: results.length,
    sw5_count: sw5Count,
    sw6_count: sw6Count,
    results: results
  }, null, 2));
  
  // SW5 leads only
  const sw5Leads = results
    .filter(r => r.tech && r.tech.includes('shopware5'))
    .map(r => ({
      url: r.url,
      contact: r.contact,
      branche: r.branche,
      payments: r.payments,
      social: r.social,
      approach_angles: r.approach_angles
    }));
  
  fs.writeFileSync(sw5File, JSON.stringify({
    extracted_at: new Date().toISOString(),
    count: sw5Leads.length,
    leads: sw5Leads
  }, null, 2));
}

main().catch(console.error);
