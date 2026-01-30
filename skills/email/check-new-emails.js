#!/usr/bin/env node
// Smart email checker - tracks what we've already seen

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const STATE_FILE = path.join(__dirname, 'last-check.json');

// Load state
let state = { lastSeenSeqno: 0, lastCheckTime: 0 };
try {
  state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
} catch (e) {
  // First run
}

// Check emails
exec('node ' + path.join(__dirname, 'check-email.js') + ' --limit 10', 
  (error, stdout, stderr) => {
    if (error) {
      console.error('Error checking emails:', error.message);
      process.exit(1);
    }

    let result;
    try {
      result = JSON.parse(stdout);
    } catch (e) {
      console.error('Failed to parse email check result');
      process.exit(1);
    }

    // Filter to NEW emails only (seqno > lastSeenSeqno)
    const newEmails = result.emails.filter(e => e.seqno > state.lastSeenSeqno);

    if (newEmails.length === 0) {
      console.log('NO_NEW_EMAILS');
      process.exit(0);
    }

    // Update state
    const maxSeqno = Math.max(...result.emails.map(e => e.seqno));
    state.lastSeenSeqno = maxSeqno;
    state.lastCheckTime = Date.now();
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));

    // Output new emails
    console.log(JSON.stringify({ emails: newEmails }, null, 2));
  }
);
