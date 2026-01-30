#!/usr/bin/env node
// Email Activity Logger - Track what emails we've seen and what we did

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'email-log.json');

// Load log
function loadLog() {
  try {
    return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

// Save log
function saveLog(log) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
}

// Add entry
function logEmail(email, action, response = null) {
  const log = loadLog();
  
  const entry = {
    id: `${email.from}-${email.date}-${email.seqno}`,
    seqno: email.seqno,
    from: email.from,
    subject: email.subject,
    date: email.date,
    receivedAt: new Date().toISOString(),
    action: action, // 'read', 'executed', 'challenged', 'ignored', 'notified_erik'
    response: response,
    timestamp: Date.now()
  };
  
  // Check if already logged
  const existing = log.find(e => e.id === entry.id);
  if (existing) {
    // Update existing
    Object.assign(existing, entry);
  } else {
    // Add new
    log.push(entry);
  }
  
  // Keep last 100 entries
  if (log.length > 100) {
    log.shift();
  }
  
  saveLog(log);
  return entry;
}

// Get email status
function getEmailStatus(email) {
  const log = loadLog();
  const id = `${email.from}-${email.date}-${email.seqno}`;
  return log.find(e => e.id === id);
}

// List recent activity
function listRecent(limit = 10) {
  const log = loadLog();
  return log.slice(-limit).reverse();
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'list') {
    const limit = parseInt(args[1]) || 10;
    const recent = listRecent(limit);
    console.log(JSON.stringify(recent, null, 2));
  } else if (command === 'log') {
    // Log an email
    const email = JSON.parse(args[1]);
    const action = args[2];
    const response = args[3] || null;
    const entry = logEmail(email, action, response);
    console.log('Logged:', entry.id);
  } else if (command === 'status') {
    const email = JSON.parse(args[1]);
    const status = getEmailStatus(email);
    console.log(JSON.stringify(status || { status: 'new' }, null, 2));
  } else {
    console.log('Usage:');
    console.log('  node log-email.js list [limit]');
    console.log('  node log-email.js log \'{"from":"...","date":"...","seqno":1}\' action [response]');
    console.log('  node log-email.js status \'{"from":"...","date":"...","seqno":1}\'');
  }
}

module.exports = { logEmail, getEmailStatus, listRecent };
