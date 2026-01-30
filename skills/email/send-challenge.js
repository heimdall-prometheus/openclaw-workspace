#!/usr/bin/env node
// Send security challenge via Email + Telegram

const { exec } = require('child_process');
const path = require('path');

// Email data from stdin or args
const email = JSON.parse(process.argv[2]);

const challengeMessage = `🔐 SECURITY CHALLENGE

Hallo Erik,

ich habe deine Email erhalten:
Betreff: ${email.subject}
Datum: ${new Date(email.date).toLocaleString('de-DE')}

Diese Anfrage betrifft sensitive Daten (Credentials/Passwörter/API-Keys).

Bitte antworte mit dem Codewort "augustiner" um zu bestätigen, dass du das wirklich bist und diese Aktion ausführen möchtest.

-- 
Heimdall
Autonomous Email Monitor`;

// 1. Send Email reply
const emailCmd = `node ${path.join(__dirname, 'send-email.js')} ` +
  `--to "${email.from.match(/<(.+)>/)?.[1] || email.from}" ` +
  `--subject "Re: ${email.subject}" ` +
  `--body "${challengeMessage.replace(/"/g, '\\"')}"`;

console.log('📧 Sending challenge via EMAIL...');
exec(emailCmd, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Email send failed:', error.message);
  } else {
    console.log('✅ Challenge email sent');
  }
});

// 2. Send Telegram notification (as backup)
const telegramMessage = `🔐 SECURITY CHALLENGE SENT

Email von: ${email.from}
Betreff: ${email.subject}

Ich habe per Email nach dem Codewort "augustiner" gefragt.

⚠️ Diese Anfrage betrifft sensitive Daten und wird erst nach Bestätigung ausgeführt.`;

console.log('📱 Sending Telegram notification...');
console.log('[TELEGRAM]', telegramMessage);
console.log('[TARGET] channel=telegram, to=1424138659');

// Note: Actual Telegram send would happen via message tool in main session
// This script is called BY the session, so we just output the intent
