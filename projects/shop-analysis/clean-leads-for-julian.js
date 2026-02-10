const fs = require('fs');
const data = JSON.parse(fs.readFileSync('results/sw5-leads.json', 'utf8'));

const cleanPhone = (phone) => {
  if (!phone) return null;
  // Remove common garbage patterns
  if (phone.includes('@') || phone.includes('.jpg') || phone.includes('.png')) return null;
  if (phone.match(/^0{6,}/)) return null;  // Too many zeros
  if (phone.length < 8) return null;  // Too short
  if (phone.length > 20) return null; // Too long (probably concatenated)
  
  // Normalize format
  let clean = phone.replace(/[^\d+]/g, '');
  if (clean.length < 8) return null;
  if (clean.startsWith('49') && !clean.startsWith('+')) clean = '+' + clean;
  return clean;
};

const cleanEmail = (email) => {
  if (!email) return null;
  if (!email.includes('@')) return null;
  if (email.includes('.jpg') || email.includes('.png') || email.includes('.gif')) return null;
  if (email.includes('banner') || email.includes('logo')) return null;
  return email.toLowerCase();
};

const extractDomain = (url) => {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
};

const cleanLeads = [];
for (const lead of data.leads) {
  const domain = extractDomain(lead.url);
  const validEmails = (lead.contact?.emails || []).map(cleanEmail).filter(Boolean);
  const validPhones = (lead.contact?.phones || []).map(cleanPhone).filter(Boolean);
  
  // Only include if we have at least one contact method
  if (validEmails.length > 0 || validPhones.length > 0) {
    cleanLeads.push({
      domain,
      url: lead.url,
      email: validEmails[0] || '',
      phone: validPhones[0] || '',
      allEmails: validEmails.join('; '),
      allPhones: validPhones.join('; '),
      payments: (lead.payments || []).join(', ')
    });
  }
}

// Sort by quality (has both email and phone first)
cleanLeads.sort((a, b) => {
  const scoreA = (a.email ? 2 : 0) + (a.phone ? 1 : 0);
  const scoreB = (b.email ? 2 : 0) + (b.phone ? 1 : 0);
  return scoreB - scoreA;
});

// Write CSV
const csv = ['Domain,URL,Email,Telefon,Alle Emails,Alle Telefone,Zahlungsarten'];
for (const lead of cleanLeads) {
  csv.push(`"${lead.domain}","${lead.url}","${lead.email}","${lead.phone}","${lead.allEmails}","${lead.allPhones}","${lead.payments}"`);
}
fs.writeFileSync('results/julian-cold-calls.csv', csv.join('\n'));

// Stats
const withBoth = cleanLeads.filter(l => l.email && l.phone).length;
const withEmail = cleanLeads.filter(l => l.email).length;
const withPhone = cleanLeads.filter(l => l.phone).length;

console.log('=== CLEAN LEADS FÜR JULIAN ===');
console.log(`Total clean leads: ${cleanLeads.length}`);
console.log(`Mit Email UND Telefon: ${withBoth} (Premium-Leads)`);
console.log(`Mit Email: ${withEmail}`);
console.log(`Mit Telefon: ${withPhone}`);
console.log('\nTop 10 Premium-Leads:');
cleanLeads.slice(0, 10).forEach((l, i) => {
  console.log(`${i+1}. ${l.domain} | ${l.email} | ${l.phone}`);
});
console.log('\nDatei: results/julian-cold-calls.csv');
