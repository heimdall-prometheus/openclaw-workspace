const fs = require('fs');
const data = JSON.parse(fs.readFileSync('results/sw5-leads.json', 'utf8'));

const cleanPhone = (phone) => {
  if (!phone) return null;
  if (phone.includes('@') || phone.includes('.jpg') || phone.includes('.png')) return null;
  if (phone.match(/^0{6,}/)) return null;
  
  let clean = phone.replace(/[^\d+]/g, '');
  if (clean.length < 9 || clean.length > 16) return null;
  if (clean.startsWith('49') && !clean.startsWith('+')) clean = '+' + clean;
  
  // Format nicely
  if (clean.startsWith('+49')) {
    return clean;
  } else if (clean.startsWith('0')) {
    return clean.replace(/^0/, '+49');
  }
  return '+49' + clean;
};

const cleanEmail = (email) => {
  if (!email) return null;
  email = email.toLowerCase().trim();
  if (!email.includes('@')) return null;
  // Filter out image files, banners, etc.
  if (email.match(/\.(jpg|jpeg|png|gif|webp|svg|pdf)$/i)) return null;
  if (email.match(/(banner|logo|slider|image|@2x|@3x|_800x|_1280|_1920)/i)) return null;
  // Must have proper email format
  if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) return null;
  return email;
};

const domainToName = (domain) => {
  return domain
    .replace(/\.(de|com|net|org|eu|shop|store)$/i, '')
    .replace(/-/g, ' ')
    .replace(/24|shop|online|store/gi, '')
    .trim()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
    .trim();
};

const extractDomain = (url) => {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
};

const cleanLeads = [];
for (const lead of data.leads) {
  const domain = extractDomain(lead.url);
  const companyName = domainToName(domain);
  const validEmails = (lead.contact?.emails || []).map(cleanEmail).filter(Boolean);
  const validPhones = (lead.contact?.phones || []).map(cleanPhone).filter(Boolean);
  
  if (validEmails.length > 0 || validPhones.length > 0) {
    cleanLeads.push({
      companyName,
      domain,
      url: lead.url,
      email: validEmails[0] || '',
      phone: validPhones[0] || '',
      payments: (lead.payments || []).join(', ')
    });
  }
}

// Sort: both contacts first, then by company name
cleanLeads.sort((a, b) => {
  const scoreA = (a.email ? 2 : 0) + (a.phone ? 1 : 0);
  const scoreB = (b.email ? 2 : 0) + (b.phone ? 1 : 0);
  if (scoreA !== scoreB) return scoreB - scoreA;
  return a.companyName.localeCompare(b.companyName);
});

// Write CSV for Julian
const csv = ['Firma,Domain,URL,Email,Telefon,Zahlungsarten'];
for (const lead of cleanLeads) {
  csv.push(`"${lead.companyName}","${lead.domain}","${lead.url}","${lead.email}","${lead.phone}","${lead.payments}"`);
}
fs.writeFileSync('results/julian-cold-calls-v2.csv', csv.join('\n'));

// Stats
const withBoth = cleanLeads.filter(l => l.email && l.phone).length;
const withEmail = cleanLeads.filter(l => l.email).length;
const withPhone = cleanLeads.filter(l => l.phone).length;

console.log('╔════════════════════════════════════════╗');
console.log('║   SHOPWARE 5 LEADS FÜR JULIAN          ║');
console.log('╠════════════════════════════════════════╣');
console.log(`║ Total Clean Leads:    ${String(cleanLeads.length).padStart(3)}              ║`);
console.log(`║ Premium (Email+Tel):  ${String(withBoth).padStart(3)}              ║`);
console.log(`║ Mit Email:            ${String(withEmail).padStart(3)}              ║`);
console.log(`║ Mit Telefon:          ${String(withPhone).padStart(3)}              ║`);
console.log('╚════════════════════════════════════════╝');
console.log('\n🏆 TOP 15 PREMIUM LEADS (Email + Telefon):\n');
console.log('Nr | Firma                    | Email                      | Telefon');
console.log('---|--------------------------|----------------------------|----------------');
cleanLeads.filter(l => l.email && l.phone).slice(0, 15).forEach((l, i) => {
  const name = l.companyName.substring(0, 24).padEnd(24);
  const email = l.email.substring(0, 26).padEnd(26);
  console.log(`${String(i+1).padStart(2)} | ${name} | ${email} | ${l.phone}`);
});

console.log('\n📁 Export: results/julian-cold-calls-v2.csv');
