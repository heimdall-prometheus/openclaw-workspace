#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { analyzeShop } = require('./analyze-shop');

const CONCURRENCY = 3;
const DELAY_MS = 800;
const PROGRESS_INTERVAL = 50;

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  console.log('🔍 SW5 Detection v2 gestartet...\n');
  
  // Load master URL list
  const master = JSON.parse(fs.readFileSync('./urls/master-deduplicated.json', 'utf8'));
  const urls = master.urls;
  console.log(`📊 ${urls.length} URLs geladen\n`);
  
  // Load existing results
  const resultsFile = './results/sw5-detection.json';
  const sw5File = './results/sw5-leads.json';
  
  let results = [];
  let processed = new Set();
  
  if (fs.existsSync(resultsFile)) {
    try {
      const existing = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
      results = existing.results || [];
      results.forEach(r => {
        const norm = r.url.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
        processed.add(norm);
      });
      console.log(`📂 ${processed.size} bereits analysiert\n`);
    } catch(e) {}
  }
  
  // Filter remaining
  const remaining = urls.filter(u => {
    const norm = u.toLowerCase().replace(/^www\./, '');
    return !processed.has(norm);
  });
  console.log(`⏳ ${remaining.length} noch zu analysieren\n`);
  
  if (remaining.length === 0) {
    console.log('✅ Alle URLs bereits analysiert!');
    return;
  }
  
  // Stats
  let sw5 = results.filter(r => r.tech?.includes('shopware5')).length;
  let sw6 = results.filter(r => r.tech?.includes('shopware6')).length;
  let errors = results.filter(r => r.status === 'error').length;
  
  // Process
  for (let i = 0; i < remaining.length; i += CONCURRENCY) {
    const batch = remaining.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(async url => {
      try { return await analyzeShop(url); }
      catch (e) { return { url, status: 'error', error: e.message, tech: [] }; }
    }));
    
    results.push(...batchResults);
    for (const r of batchResults) {
      if (r.tech?.includes('shopware5')) sw5++;
      if (r.tech?.includes('shopware6')) sw6++;
      if (r.status === 'error') errors++;
    }
    
    const total = processed.size + i + batch.length;
    if (total % PROGRESS_INTERVAL < CONCURRENCY || i + CONCURRENCY >= remaining.length) {
      console.log(`[${total}/${urls.length}] SW5: ${sw5} | SW6: ${sw6} | Err: ${errors}`);
      
      // Save progress
      fs.writeFileSync(resultsFile, JSON.stringify({
        extracted_at: new Date().toISOString(),
        count: results.length,
        results
      }, null, 2));
      
      const sw5Leads = results.filter(r => r.tech?.includes('shopware5'));
      fs.writeFileSync(sw5File, JSON.stringify({
        extracted_at: new Date().toISOString(),
        count: sw5Leads.length,
        leads: sw5Leads
      }, null, 2));
    }
    
    await sleep(DELAY_MS);
  }
  
  console.log(`\n✅ DONE! SW5: ${sw5} | SW6: ${sw6}`);
}

main().catch(e => console.error(e));
