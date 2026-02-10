const fs = require('fs');
const data = JSON.parse(fs.readFileSync('results/sw5-leads.json', 'utf8'));

// Helper functions
const extractDomain = (url) => url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');

const cleanPhone = (phone) => {
  if (!phone) return null;
  let clean = phone.replace(/[^\d+]/g, '');
  if (clean.length < 9 || clean.length > 16) return null;
  return clean;
};

const cleanEmail = (email) => {
  if (!email) return null;
  email = email.toLowerCase().trim();
  if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) return null;
  if (email.match(/\.(jpg|jpeg|png|gif|webp)/)) return null;
  return email;
};

// Industry detection from domain
const detectIndustry = (domain) => {
  const d = domain.toLowerCase();
  if (d.match(/akku|batterie|elektro|solar|strom/)) return 'Elektronik/Energie';
  if (d.match(/fashion|mode|kleid|schuh|textil|dessous|tracht/)) return 'Mode/Textil';
  if (d.match(/garten|flora|pflanz|agrar|outdoor/)) return 'Garten/Agrar';
  if (d.match(/auto|kfz|motor|reifen|fahrzeug/)) return 'Automotive';
  if (d.match(/bau|werkzeug|alu|profil|metall|stahl/)) return 'Bau/Industrie';
  if (d.match(/tier|pet|hund|katze|pferd/)) return 'Tierbedarf';
  if (d.match(/büro|office|druck|papier/)) return 'Büro/Office';
  if (d.match(/sport|fitness|bike|rad/)) return 'Sport/Freizeit';
  if (d.match(/food|genuss|wein|kaffee|tee|bio/)) return 'Food/Genuss';
  if (d.match(/beauty|kosmetik|parfum|wellness/)) return 'Beauty/Wellness';
  if (d.match(/kinder|baby|spiel/)) return 'Kinder/Spielzeug';
  if (d.match(/schmuck|gold|silber|uhr/)) return 'Schmuck/Uhren';
  if (d.match(/möbel|wohn|heim|deko/)) return 'Möbel/Wohnen';
  if (d.match(/medizin|apotheke|gesund|pflege/)) return 'Gesundheit/Medizin';
  if (d.match(/musik|instrument|audio|video|beamer/)) return 'Medien/Technik';
  return 'Sonstiges';
};

// Size estimation from payment methods
const estimateSize = (payments) => {
  if (!payments || payments.length === 0) return { size: 'Klein', score: 1 };
  const hasKlarna = payments.includes('klarna');
  const hasAmazon = payments.includes('amazon_pay');
  const hasStripe = payments.includes('stripe');
  const count = payments.length;
  
  if (count >= 4 || (hasKlarna && hasAmazon)) return { size: 'Groß', score: 3 };
  if (count >= 2 || hasKlarna || hasAmazon) return { size: 'Mittel', score: 2 };
  return { size: 'Klein', score: 1 };
};

// Strategic approach
const determineStrategy = (lead, industry, sizeInfo) => {
  const strategies = [];
  const painPoints = [];
  
  // Security is universal
  painPoints.push('Sicherheitslücken ohne Updates');
  
  // Size-based approach
  if (sizeInfo.size === 'Groß') {
    strategies.push('Persönliches Meeting anbieten');
    strategies.push('Referenzen aus gleicher Branche nennen');
    painPoints.push('Reputationsrisiko bei Datenpanne');
    painPoints.push('Compliance/DSGVO-Haftung');
  } else if (sizeInfo.size === 'Mittel') {
    strategies.push('Kostenlose Analyse anbieten');
    painPoints.push('Umsatzverlust bei Shop-Ausfall');
  } else {
    strategies.push('Paketpreis für Migration nennen');
    strategies.push('Schnelle Umsetzung betonen');
    painPoints.push('Einfache Lösung für komplexes Problem');
  }
  
  // Industry-specific
  if (industry.includes('Mode') || industry.includes('Beauty')) {
    painPoints.push('Moderne UX wichtig für Zielgruppe');
    strategies.push('SW6 Design-Vorteile zeigen');
  }
  if (industry.includes('B2B') || industry.includes('Industrie') || industry.includes('Automotive')) {
    painPoints.push('Schnittstellen zu ERP/Warenwirtschaft');
    strategies.push('Technische Expertise betonen');
  }
  if (industry.includes('Food') || industry.includes('Gesundheit')) {
    painPoints.push('Strenge Compliance-Anforderungen');
  }
  
  return {
    painPoints: painPoints.slice(0, 3),
    strategies: strategies.slice(0, 2),
    priority: sizeInfo.score >= 2 ? 'Hoch' : 'Normal'
  };
};

// Process all leads
const strategicLeads = [];
for (const lead of data.leads) {
  const domain = extractDomain(lead.url);
  const validEmails = (lead.contact?.emails || []).map(cleanEmail).filter(Boolean);
  const validPhones = (lead.contact?.phones || []).map(cleanPhone).filter(Boolean);
  
  if (validEmails.length === 0 && validPhones.length === 0) continue;
  
  const industry = detectIndustry(domain);
  const sizeInfo = estimateSize(lead.payments);
  const strategy = determineStrategy(lead, industry, sizeInfo);
  
  strategicLeads.push({
    domain,
    url: lead.url,
    email: validEmails[0] || '',
    phone: validPhones[0] || '',
    industry,
    size: sizeInfo.size,
    payments: (lead.payments || []).join(', '),
    priority: strategy.priority,
    painPoints: strategy.painPoints.join(' | '),
    approach: strategy.strategies.join(' | ')
  });
}

// Sort by priority and size
strategicLeads.sort((a, b) => {
  if (a.priority !== b.priority) return a.priority === 'Hoch' ? -1 : 1;
  const sizeOrder = { 'Groß': 0, 'Mittel': 1, 'Klein': 2 };
  return sizeOrder[a.size] - sizeOrder[b.size];
});

// Write strategic CSV
const csv = ['Domain,URL,Email,Telefon,Branche,Größe,Priorität,Pain Points,Approach,Zahlungsarten'];
for (const l of strategicLeads) {
  csv.push(`"${l.domain}","${l.url}","${l.email}","${l.phone}","${l.industry}","${l.size}","${l.priority}","${l.painPoints}","${l.approach}","${l.payments}"`);
}
fs.writeFileSync('results/strategic-leads.csv', csv.join('\n'));

// Stats
const byIndustry = {};
const bySize = { Groß: 0, Mittel: 0, Klein: 0 };
const byPriority = { Hoch: 0, Normal: 0 };

strategicLeads.forEach(l => {
  byIndustry[l.industry] = (byIndustry[l.industry] || 0) + 1;
  bySize[l.size]++;
  byPriority[l.priority]++;
});

console.log('╔═══════════════════════════════════════════════════╗');
console.log('║     STRATEGISCHE LEAD-ANALYSE                     ║');
console.log('╠═══════════════════════════════════════════════════╣');
console.log(`║ Total Leads:        ${String(strategicLeads.length).padStart(3)}                           ║`);
console.log(`║ Hohe Priorität:     ${String(byPriority.Hoch).padStart(3)}                           ║`);
console.log('╠═══════════════════════════════════════════════════╣');
console.log('║ NACH GRÖßE:                                       ║');
console.log(`║   Groß:   ${String(bySize.Groß).padStart(3)} (Premium-Accounts)                ║`);
console.log(`║   Mittel: ${String(bySize.Mittel).padStart(3)}                                   ║`);
console.log(`║   Klein:  ${String(bySize.Klein).padStart(3)}                                   ║`);
console.log('╠═══════════════════════════════════════════════════╣');
console.log('║ TOP BRANCHEN:                                     ║');
Object.entries(byIndustry)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 8)
  .forEach(([ind, count]) => {
    console.log(`║   ${ind.padEnd(20)} ${String(count).padStart(3)}                    ║`);
  });
console.log('╚═══════════════════════════════════════════════════╝');

console.log('\n🎯 TOP 10 HIGH-PRIORITY LEADS:\n');
strategicLeads.filter(l => l.priority === 'Hoch').slice(0, 10).forEach((l, i) => {
  console.log(`${i+1}. ${l.domain} (${l.industry}, ${l.size})`);
  console.log(`   📧 ${l.email || '-'} | 📞 ${l.phone || '-'}`);
  console.log(`   💡 ${l.painPoints}`);
  console.log(`   🎯 ${l.approach}`);
  console.log('');
});

console.log('📁 Export: results/strategic-leads.csv');
