#!/usr/bin/env node
// Smart Email Handler - Check + Log + Act

const { exec } = require('child_process');
const path = require('path');
const { logEmail, getEmailStatus } = require('./log-email.js');

// Check for new emails
exec('node ' + path.join(__dirname, 'check-new-emails.js'), 
  (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }

    if (stdout.trim() === 'NO_NEW_EMAILS') {
      console.log('HEARTBEAT_OK');
      process.exit(0);
    }

    let result;
    try {
      result = JSON.parse(stdout);
    } catch (e) {
      console.error('Parse error:', e.message);
      process.exit(1);
    }

    if (!result.emails || result.emails.length === 0) {
      console.log('HEARTBEAT_OK');
      process.exit(0);
    }

    // Process each NEW email
    result.emails.forEach(email => {
      // Check if we've already handled this
      const status = getEmailStatus(email);
      
      if (status) {
        console.log(`[SKIP] Already handled: ${email.subject} (${status.action})`);
        return;
      }

      // Log as READ
      logEmail(email, 'read');
      
      console.log('---NEW EMAIL---');
      console.log(JSON.stringify({
        from: email.from,
        subject: email.subject,
        date: email.date,
        body: email.body.substring(0, 200),
        seqno: email.seqno
      }, null, 2));

      // Determine action based on sender
      const isFromErik = email.from.includes('reisig@c-led.net');
      const isSecuritySensitive = /credential|password|api.?key|server|access|secret/i.test(
        email.subject + ' ' + email.body
      );

      if (isFromErik) {
        if (isSecuritySensitive) {
          console.log('🔐 SECURITY CHALLENGE REQUIRED: Ask for codewort "augustiner"');
          logEmail(email, 'challenged', 'Requested codewort augustiner');
        } else {
          console.log('✅ FROM ERIK: Safe to execute (non-sensitive)');
          logEmail(email, 'read', 'Non-sensitive command from Erik');
        }
      } else {
        console.log('📬 FROM OTHER: Should notify Erik via Telegram');
        logEmail(email, 'pending_notification', 'Needs Erik approval');
      }
    });
  }
);
